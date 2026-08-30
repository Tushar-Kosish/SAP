"""
Backend API Server Launcher for SmartEVAC AI.
Launches the full Flask production application.
"""
from app import app

if __name__ == "__main__":
    print("SmartEvac AI Flask Server launching on http://0.0.0.0:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)
