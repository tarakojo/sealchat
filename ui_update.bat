@echo off
cd /d "%~dp0"
cd ui 
call npm run build 
call python src\assets\bundle.py
cd ..\
copy .\ui\dist\index.json .\core\assets\ui\index.json 
copy .\ui\dist\assets.json .\core\assets\ui\assets.json 
