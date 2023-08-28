@echo off
cd /d "%~dp0"
cd ui 
call npm run build 
cd ..\
copy .\ui\dist\bundle.js .\core\assets\ui\bundle.js 
