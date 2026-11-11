@echo off
cd /d "%~dp0dist"
echo Opening Crazy K's preview at http://127.0.0.1:4174/
echo Leave this window open while viewing the site. Close it to stop the preview.
start "" http://127.0.0.1:4174/
python -m http.server 4174 --bind 127.0.0.1
if errorlevel 1 echo The preview may already be running, or Python may not be available.
pause
