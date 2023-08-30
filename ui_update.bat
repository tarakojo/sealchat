@echo off
cd /d "%~dp0"
cd ui 
call npm run build 
call python bundle.py
cd ..\
copy .\ui\dist\bundle.json .\core\assets\ui\bundle.json 
copy .\ui\dist\assets.json .\core\assets\ui\assets.json 
