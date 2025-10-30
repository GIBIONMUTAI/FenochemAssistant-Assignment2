@echo off
echo Activating virtual environment...
call .venv\Scripts\activate

echo.
echo Running Jac...

echo.
echo Starting FastAPI server...
uvicorn api:app --reload --port 4000

pause
