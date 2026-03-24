@echo off
echo ===================================================
echo   Extracting Global Skills...
echo ===================================================
echo.

:: Run the node script to parse the SKILL.md files into skills-data.js
node update.cjs

echo.
echo ===================================================
echo   Launching Dashboard in Default Browser...
echo ===================================================

:: Open the index.html file in the default browser
start "" index.html

exit
