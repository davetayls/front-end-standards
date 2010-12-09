@echo off
call ../requirejs/build/build.bat app.build.js
bash --login -i /cygdrive/c/projects/front-end-standards/build/build.sh
pause
