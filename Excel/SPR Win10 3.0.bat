@echo off
mode con: cols=70 lines=10
color F0
chcp 65001
cls
ECHO %x%
echo Имя файла не должно содержать спец. символы.
set /p x=Для снятия защиты перетащите файл сюда : 
cls
ECHO %choose%
set /p choose=1)Создать копию файла 2) Снять защиту прямо в такущем файле : 
cls

for %%a in (%x%) do set format=%%~xa

for %%v in (%x%) do set name=%%~nv

for %%h in (%x%) do set homedir=%%~pdh

set msg1=mshta vbscript:Execute("msgbox ""Новый файл готов. Он в той же папке. С пометкой (Unprotect Version)."":close")
set msg2=mshta vbscript:Execute("msgbox ""Вся защита снята"":close")
set msg3=mshta vbscript:Execute("msgbox ""Если что-то пошло не так - переименуйте файл и попробуй ешё раз."":close")
set arch=.zip
set nn=SPR

if %choose% == 1 copy %x% %homedir%\%nn%%arch%
if %choose% == 2 move %x% %homedir%\%nn%%arch%
cls
powershell -Command "(Expand-Archive -LiteralPath '%homedir%\%nn%%arch%' -force -DestinationPath '%homedir%\%nn%\')"
erase "%homedir%/%nn%%arch%"
echo Выполнение...

Set Cnt=0
For %%I In (%homedir%\%nn%\xl\worksheets\*) Do Set /A Cnt += 1
FOR /L %%i IN (1,1,%cnt%) DO powershell -Command "(gc '%homedir%\%nn%\xl\worksheets\Sheet%%i.xml') -replace '<sheetProtection', '' | Out-File -encoding default '%homedir%\%nn%\xl\worksheets\sheet%%i.xml'"

powershell -Command "(gc '%homedir%\%nn%\xl\workbook.xml') -replace '<workbookProtection ', '' | Out-File -encoding default '%homedir%\%nn%\xl\workbook.xml'"

powershell -Command "(Compress-Archive -Path '%homedir%\%nn%\*' -Up -DestinationPath '%homedir%\%nn%%arch%')"

if %choose% == 1 move %homedir%%nn%%arch% "%homedir%%name% (Unprotect Version)%format%" 
if %choose% == 2 move %homedir%%nn%%arch% %x%
rd /s /q "%homedir%\%nn%\"
cls
if %choose% == 1 %msg1%
if %choose% == 2 %msg2%
%msg3%
exit