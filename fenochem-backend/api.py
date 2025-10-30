from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import subprocess

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

app = FastAPI()

# Allow frontend requests (React at port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def jac_offline_reply(user_message: str) -> str:
    """Fallback using Jac if LLM fails."""
    try:
        result = subprocess.run(
            ["jac", "run", "server.jac", "--func", "fenochem_chat.respond_to", "--args", user_message],
            capture_output=True,
            text=True
        )
        if result.stdout:
            return result.stdout.strip()
    except Exception as e:
        print("Jac error:", e)
    return "I'm here to help! 😊 (Offline Jac mode)"

llm_model = None

@app.on_event("startup")
def load_model():
    """Load the byLLM model once during startup to prevent reload lag."""
    global llm_model
    try:
        from byllm.lib import Model
        llm_model = Model(model_name="gpt-4o")
        print("✅ byLLM model loaded successfully.")
    except Exception as e:
        print("⚠️ Failed to load byLLM model:", e)

@app.post("/api/chat")
async def chat_endpoint(req: Request):
    """Main chat endpoint."""
    data = await req.json()
    message = data.get("message", "")
    session_id = data.get("session_id", "default")

    if not message.strip():
        return {"reply": "Please enter a valid message."}

    reply = ""
    try:
        if llm_model:
            reply = llm_model(message)
        else:
            reply = jac_offline_reply(message)
    except Exception as e:
        print("LLM error:", e)
        reply = jac_offline_reply(message)

    return {"reply": reply}
