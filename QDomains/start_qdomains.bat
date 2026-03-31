@echo off
TITLE QDomains Launch System
echo [1/3] Checking Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

echo [2/3] Verifying dependencies...
if not exist "node_modules\" (
    echo [INFO] node_modules not found. Running npm install...
    call npm install
)

echo [3/3] Starting QDomains Platform...
echo [INFO] Access the portal at http://localhost:5173/ once the server is ready.
echo [HINT] To stop the server, press Ctrl+C in this window.

start http://localhost:5173/
call npm run dev
pause
