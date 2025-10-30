# FenochemAssistant-Assignment2
# Fenochem Assistant

AI-powered chat assistant for Fenochem using:

- **Frontend:** React + React-Bootstrap + Axios
- **Backend:** Python FastAPI + Jac + byLLM

## Features

- Interactive AI chat
- Real-time responses
- Offline fallback with Jac
- Auto-scrolling chat interface
- User-friendly icons and loading indicator
## git clone
git clone https://github.com/GIBIONMUTAI/FenochemAssistant-Assignment2.git

### cd frontend_fenochem-app

# Install dependencies
npm install

# Start React development server
npm start
## cd fenochem-backend
# Create virtual environment
python -m venv .venv

# Activate virtual environment
source .venv/Scripts/activate

# Install Python dependencies
pip install -r requirements.txt
fastapi
uvicorn
python-dotenv
byllm

# Start Jac offline (if needed)
.venv/Scripts/jac.exe main.jac

# Start FastAPI backend
.venv/Scripts/uvicorn.exe api:app --reload --port 4000

##
./run.bat
