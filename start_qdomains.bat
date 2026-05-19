@echo off
TITLE QDomains Launch System
echo [1/4] Checking Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed. Please install it from https://nodejs.org/
    pause
    exit /b
)

echo [2/4] Verifying frontend dependencies...
if not exist "node_modules\" (
    echo [INFO] Frontend node_modules not found. Running npm install...
    call npm install
)

echo [3/4] Verifying backend dependencies...
cd server
if not exist "node_modules\" (
    echo [INFO] Backend node_modules not found. Running npm install...
    call npm install
)
cd ..

echo [4/4] Starting QDomains Platform...
echo [INFO] Access the portal at http://localhost:5173/ once the server is ready.
echo [HINT] Close the terminal windows to stop the servers.

start cmd /k "TITLE QDomains Backend Server && cd server && node server.js"
start cmd /k "TITLE QDomains Frontend Server && npm run dev"

timeout /t 3 >nul
start http://localhost:5173/
