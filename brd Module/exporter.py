"""
exporter.py
Compiles the latest version of all BRD sections into a single Markdown document,
including a section for Validation Flags.
"""
from storage import get_latest_brd_sections, get_connection
from datetime import datetime, timezone

def export_brd(session_id: str, title: str = "Business Requirements Document") -> str:
    """
    Fetches the latest BRD sections and any active validation flags,
    and returns a formatted Markdown string.
    """
    sections = get_latest_brd_sections(session_id)
    
    # Order of presentation
    section_order = [
        ("executive_summary", "1. Executive Summary"),
        ("functional_requirements", "2. Functional Requirements"),
        ("stakeholder_analysis", "3. Stakeholder Analysis"),
        ("timeline", "4. Project Timeline"),
        ("decisions", "5. Key Decisions"),
        ("assumptions", "6. Assertions & Assumptions"),
        ("success_metrics", "7. Success Metrics")
    ]
    
    doc = []
    doc.append(f"# {title}")
    doc.append(f"**Generated:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}")
    doc.append(f"**Session ID:** `{session_id}`")
    doc.append("---\n")
    
    # 1. Fetch Validation Flags
    conn = get_connection()
    flags = []
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT section_name, flag_type, severity, description 
                FROM brd_validation_flags 
                WHERE session_id = %s
                ORDER BY severity DESC
            """, (session_id,))
            flags = cur.fetchall()
    except Exception as e:
        doc.append(f"> **Warning:** Could not fetch validation flags: {e}\n")
    finally:
        conn.close()
        
    if flags:
        doc.append("## 🚨 Validation Flags Required Review")
        doc.append("> The AI has detected potential issues that require human review before finalization.\n")
        
        for flag in flags:
            section, f_type, severity, desc = flag
            # High severity usually gets an alert in some MD parsers
            icon = "🔴" if severity == "high" else ("🟡" if severity == "medium" else "🔵")
            doc.append(f"{icon} **[{severity.upper()}] {section.replace('_', ' ').title()} ({f_type})**: {desc}")
        doc.append("\n---\n")
    
    # 2. Compile Sections
    for db_key, display_title in section_order:
        content = sections.get(db_key, "*(Section not generated)*")
        doc.append(f"## {display_title}\n")
        doc.append(content)
        doc.append("\n---\n")
        
    return "\n".join(doc)
