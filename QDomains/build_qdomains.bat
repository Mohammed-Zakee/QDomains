@echo off
TITLE QDomains - Production Build
echo [1/3] Verifying Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is NOT installed.
    pause
    exit /b
)

echo [2/3] Cleaning previous builds...
if exist "dist\" (
    echo [INFO] Removing existing dist folder...
    rmdir /s /q dist
)

echo [3/3] Compiling production-ready assets...
call npm run build

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Build completed! Your files are ready in the 'dist' folder.
    echo [HINT] You can now upload 'dist' to any hosting provider (Vercel, Netlify, etc.)
) else (
    echo [ERROR] Build failed. Please check the logs above.
)

pause
