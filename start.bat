@echo off
echo =================================================================
echo             STARTING PORTFOLIO LOCAL DEVELOPMENT SERVER
echo =================================================================
echo.
echo Opening browser at http://localhost:8000 ...
start "" "http://localhost:8000"
echo.
echo Launching Python web server. Press Ctrl+C in this window to stop.
echo.
python -m http.server 8000
pause
