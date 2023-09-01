@echo off
cd /d "%~dp0"
cd webview\sealview
call npm run build 
cd ..\..\
xcopy .\webview\sealview\dist\* .\assets\sealview\ /E 
