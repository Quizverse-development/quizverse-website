@echo off
git add .
git commit -m "Auto update - %date% %time%"
git push origin main
pause