@echo off
mode con: cols=70 lines=10
color F0
chcp 65001
cls
ECHO %x%
echo Имя файла не должно содержать спец. символы.
set /p x=PDF : 
cls

for %%a in (%x%) do set format=%%~xa

for %%v in (%x%) do set name=%%~nv

for %%h in (%x%) do set homedir=%%~pdh

%gs% -o "%homedir%\noImage.pdf" -sDEVICE=pdfwrite -dFILTERIMAGE %x%
%gs% -o "%homedir%\%name%_txt_only.pdf" -sDEVICE=pdfwrite -dFILTERVECTOR "%homedir%\noImage.pdf"
del "%homedir%\noImage.pdf"
set msg1=mshta vbscript:Execute("msgbox ""Файл готов. Он в той же папке. С пометкой _txt_only."":close")
exit