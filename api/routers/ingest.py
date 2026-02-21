import os
import sys
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import List

# Ensure we can import from the other modules
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(PROJECT_ROOT)
sys.path.append(os.path.join(PROJECT_ROOT, "Noise filter module"))

from brd_module.storage import store_chunks
# We do import inside the route to avoid circular or weird path issues at startup if possible,
# or we can import it here since sys.path is appended.
from classifier import classify_chunks

router = APIRouter(
    prefix="/sessions/{session_id}/ingest",
    tags=["Ingestion"]
)

class RawDataChunk(BaseModel):
    source_type: str
    source_ref: str
    speaker: str = "Unknown"
    text: str

class IngestRequest(BaseModel):
    chunks: List[RawDataChunk]

@router.post("/data")
def ingest_data(session_id: str, request: IngestRequest, background_tasks: BackgroundTasks):
    """
    Receives raw data chunks from external connectors (like the team's Slack script).
    Routes data through the noise classification pipeline in the background.
    """
    def process_and_store(sess_id: str, raw_chunks: List[RawDataChunk]):
        # Convert to dictionary format expected by the classifier
        chunk_dicts = [
            {
                "cleaned_text": rc.text,
                "source_ref": rc.source_ref,
                "speaker": rc.speaker,
                "source_type": rc.source_type
            } for rc in raw_chunks
        ]
        
        # Pull API key from environment
        from dotenv import load_dotenv
        load_dotenv(os.path.join(PROJECT_ROOT, "Noise filter module", ".env"))
        api_key = os.environ.get("GROQ_CLOUD_API")
        
        # Classify
        classified = classify_chunks(chunk_dicts, api_key=api_key)
        
        # Assign session ID and store
        for c in classified:
            c.session_id = sess_id
            
        store_chunks(classified)

    background_tasks.add_task(process_and_store, session_id, request.chunks)
    
    return {"message": f"Processing {len(request.chunks)} chunks in the background for session {session_id}."}
