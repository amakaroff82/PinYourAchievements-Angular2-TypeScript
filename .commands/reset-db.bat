cd ../
set CURRENT_DIR=%cd%
cd orientdb-community\databases\
rmdir /s /q demo
..\bin\console.bat %CURRENT_DIR%\db.sql
