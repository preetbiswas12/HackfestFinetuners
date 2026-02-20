import sys
import os
from brd_pipeline import run_brd_generation
from validator import validate_brd
from exporter import export_brd

def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <session_id>")
        sys.exit(1)
        
    session_id = sys.argv[1]
    
    print(f"\n--- Starting BRD Generation Pipeline for Session: {session_id} ---")

    # Generate BRD Sections
    snapshot_id = run_brd_generation(session_id)
    print(f"Completed Generation. Snapshot ID: {snapshot_id}")
    
    # Run Semantic Validation
    print("Running BRD Validation...")
    validate_brd(session_id)
    
    # Export Final Document
    print("Exporting final Markdown...")
    markdown_output = export_brd(session_id)
    
    output_file = f"brd_output_{session_id}.md"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(markdown_output)
    print(f"\nFinal BRD Pipeline Complete! Output written to: {output_file}")

if __name__ == "__main__":
    main()
