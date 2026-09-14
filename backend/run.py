import sys
import os

# Set UTF-8 encoding for Windows standard output
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Ensure backend root is on PYTHONPATH
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import uvicorn

if __name__ == "__main__":
    print("================================================================")
    print(">> SALMAN KHAN PORTFOLIO AI ORCHESTRATOR - FUNCTIONGEMMA 270M")
    print("   Model Path: E:\\model")
    print("   FastAPI Port: http://127.0.0.1:8000")
    print("================================================================")
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
