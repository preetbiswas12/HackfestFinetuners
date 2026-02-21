import os
import sys
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(PROJECT_ROOT)

from brd_module.brd_pipeline import run_brd_generation
from brd_module.validator import validate_brd
from brd_module.exporter import export_brd
from brd_module.storage import get_latest_brd_sections, store_brd_section, get_connection

router = APIRouter(
    prefix="/sessions/{session_id}/brd",
    tags=["BRD"]
)

class EditSectionRequest(BaseModel):
    content: str
    snapshot_id: str

@router.post("/generate")
def generate_brd(session_id: str):
    """
    Trigger the multi-agent BRD generation pipeline (creates a snapshot and runs agents).
    """
    try:
        snapshot_id = run_brd_generation(session_id)
        validate_brd(session_id)
        return {"message": "BRD generation completed.", "snapshot_id": snapshot_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def get_brd(session_id: str):
    """
    Retrieve the latest generated BRD sections and validation flags.
    """
    sections = get_latest_brd_sections(session_id)
    
    # Fetch validation flags
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
            for r in cur.fetchall():
                flags.append({
                    "section_name": r[0],
                    "flag_type": r[1],
                    "severity": r[2],
                    "description": r[3]
                })
    except Exception as e:
        pass
    finally:
        conn.close()
        
    return {"session_id": session_id, "sections": sections, "flags": flags}

@router.put("/sections/{section_name}")
def edit_brd_section(session_id: str, section_name: str, body: EditSectionRequest):
    """
    Allow a human to manually edit a section (locks the section so AI won't overwrite it).
    """
    store_brd_section(
        session_id=session_id,
        snapshot_id=body.snapshot_id,
        section_name=section_name,
        content=body.content,
        source_chunk_ids=[],
        human_edited=True
    )
    return {"message": f"Section {section_name} updated successfully by human."}

@router.get("/export")
def export_brd_document(session_id: str):
    """
    Retrieve the compiled Markdown document.
    """
    markdown = export_brd(session_id)
    return {"markdown": markdown}
