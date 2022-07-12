Attribute VB_Name = "Functions"
Private Function EvalFind(What, Where As Range) As Range
  Dim i&, q$
  If VarType(What) = vbString Then q = """"
  On Error Resume Next
  SearchFunc = "MATCH(" & q & What & q & "," & Where.Address(External:=True) & ",0)"
  i = Evaluate(SearchFunc)
  If i > 0 Then Set EvalFind = Where(i)
End Function
Function GetTargetSheet(SheetName As Variant) As Worksheet
    Dim TargetSheet As Worksheet
    If SheetName <> Empty Then Set TargetSheet = Sheets(SheetName) Else Set TargetSheet = ActiveSheet
    Set GetTargetSheet = TargetSheet
End Function
Function GetColNumber(ColName As String, Optional RowNumber As Integer = 1, Optional SheetName As String = "", Optional Eval As Boolean = False) As Integer
   'Eval находит в скрытых строках, но не учитывает регистр, а также ищет текст, формат €чейки должен быть также текстовый
   Dim TargetSheet As Worksheet
   Set TargetSheet = Functions.GetTargetSheet(SheetName)
   If TargetSheet Is Nothing Then Exit Function
   
   If Eval = False Then
    Set fres = TargetSheet.Rows(RowNumber).Find(ColName, LookAt:=1, MatchCase:=1, LookIn:=xlValues)
    If Not fres Is Nothing Then GetColNumber = fres.Column Else GetColNumber = 0
    Exit Function
   End If
   
   Set Res = EvalFind(ColName, TargetSheet.Range(RowNumber & ":" & RowNumber))
   
   If Not Res Is Nothing Then
       GetColNumber = Res.Column
   Else
       GetColNumber = 0
   End If

End Function
Function GetRowNumber(RowName As String, Optional ColumnNumber As Integer = 1, Optional SheetName As String = "", Optional Eval As Boolean = False) As Integer
    'Eval находит в скрытых колонках, но не учитывает регистр, а также ищет текст, формат €чейки должен быть также текстовый
   Dim TargetSheet As Worksheet
   Set TargetSheet = Functions.GetTargetSheet(SheetName)
   If TargetSheet Is Nothing Then Exit Function
   
   If Eval = False Then
    Set fres = TargetSheet.Columns(ColumnNumber).Find(RowName, LookAt:=1, MatchCase:=1, LookIn:=xlValues)
    If Not fres Is Nothing Then GetRowNumber = fres.Row Else GetRowNumber = 0
    Exit Function
   End If
   
   Letter = Application.ConvertFormula("r1c" & ColumnNumber, xlR1C1, xlA1)
   Letter = Replace(Replace(Mid(Letter, 2), "$", ""), "1", "")
   
   Set Res = EvalFind(RowName, TargetSheet.Range(Letter & ":" & Letter))
   
   If Not Res Is Nothing Then
       GetRowNumber = Res.Row
   Else
       GetRowNumber = 0
   End If

End Function
Function getLastRow(Optional ColumnNumber As Integer = 1, Optional SheetName As String = "", Optional Eval As Boolean = False) As Integer
    'Eval видит скрытые строки, но натыкаетс€ на первую пустую строку
   Dim TargetSheet As Worksheet
   Set TargetSheet = Functions.GetTargetSheet(SheetName)
   If TargetSheet Is Nothing Then Exit Function
   
   If Eval = False Then
    getLastRow = TargetSheet.Cells(Rows.Count, ColumnNumber).End(xlUp).Row
    Exit Function
   End If
   
   Set fcell1 = TargetSheet.Columns(ColumnNumber).Find(Empty, After:=Cells(Cells.Rows.Count, ColumnNumber), LookAt:=1, MatchCase:=1, LookIn:=xlFormulas)
   Set fcell2 = TargetSheet.Columns(ColumnNumber).Find(Empty, After:=Cells(Cells.Rows.Count, ColumnNumber), LookAt:=1, MatchCase:=1, LookIn:=xlValues)
   If Not fcell1 Is Nothing Then fcell1 = fcell1.Row Else fcell1 = 0
   If Not fcell2 Is Nothing Then fcell2 = fcell2.Row Else fcell2 = 0
   result = Application.WorksheetFunction.Max(fcell1, fcell2)
   
   'If Not fcell Is Nothing Then
   '    result = CStr(fcell.Row)
   'End If
   getLastRow = result - 1
End Function
Function IsInArray(valToBeFound As Variant, arr As Variant) As Boolean
   Dim element As Variant
   On Error GoTo IsInArrayError: 'array is empty
       For Each element In arr
           If element = valToBeFound Then
               IsInArray = True
               Exit Function
           End If
       Next element
   Exit Function
IsInArrayError:
   On Error GoTo 0
   IsInArray = False
End Function
Function ArrayLen(arr As Variant) As Integer
    ArrayLen = UBound(arr) - LBound(arr)
End Function
Function GetLastColumn(Optional SheetName As String = "", Optional Eval As Boolean = False) As Integer
    'Eval видит скрытые столбцы, но натыкаетс€ на первый пустой
   Dim TargetSheet
   Set TargetSheet = Functions.GetTargetSheet(SheetName)
   If TargetSheet Is Nothing Then Exit Function
   
   If Eval = False Then
    GetLastColumn = TargetSheet.Cells(1, Columns.Count).End(xlToLeft).Column
    Exit Function
   End If
   
   Set fcell = TargetSheet.Rows(1).Find(Empty, LookAt:=1, MatchCase:=1, LookIn:=xlValues) 'xlFormulas)
   
   If Not fcell Is Nothing Then
       result = Str(fcell.Column)
   End If
   
   GetLastColumn = result - 1
End Function
Function SortArray(myArray As Variant, mySort As Long) As Variant
Dim l As Long, u As Long, i1 As Long, i2 As Long, im As Long, tmp As Variant
l = LBound(myArray)
u = UBound(myArray)
    For i1 = l To u
        im = i1
            For i2 = i1 To u
                Select Case mySort
                    Case Is = 0
                        If myArray(i2) < myArray(im) Then im = i2
                    Case Is = 1
                        If CStr(myArray(i2)) < CStr(myArray(im)) Then im = i2
                    Case Is = 2
                        num1 = Val(getNumber(myArray(i2)))
                        num2 = Val(getNumber(myArray(im)))
                        If num1 > num2 Then im = i2
                    Case Is = 3
                        If CStr(myArray(i2)) > CStr(myArray(im)) Then im = i2
                End Select
            Next
        If im <> i1 Then
            tmp = myArray(i1)
            myArray(i1) = myArray(im)
            myArray(im) = tmp
        End If
    Next
SortArray = myArray
'0 по возрастанию с числовым сравнением чисел
'1 по возрастанию c текстовым сравнением чисел
'2 по убыванию с числовым сравнением чисел
'3 по убыванию c текстовым сравнением чисел
End Function
Function getNumber(Txt As Variant) As String
    With CreateObject("VBScript.RegExp")
    .Global = True
    .Pattern = "\D"
    getNumber = .Replace(Txt, "")
    End With
End Function
Public Function —уммаѕрописью(x As Double) As String
If x > 999999999999.99 Then
—уммаѕрописью = "јргумент больше 999 999 999 999.99!"
ElseIf x < 0 Then
—уммаѕрописью = "јргумент отрицательный!"
Else
x = FormatNumber(x, 2)
Dim b As Byte, b1 As Byte, b2 As Byte, kop As String
b = (x - Fix(x)) * 100
b2 = b \ 10
b1 = b Mod 10
If b2 <> 1 And b1 = 1 Then
kop = " копейка"
ElseIf b2 <> 1 And b1 > 1 And b1 < 5 Then
kop = " копейки"
Else
kop = " копеек"
End If
kop = b2 & b1 & kop
Dim y(1 To 4) As Integer, i1 As Byte
For i1 = 1 To 4
x = Fix(x) / 1000
y(i1) = (x - Fix(x)) * 1000
Next
Dim Text(1 To 4) As String, i2 As Byte, y1 As Byte, y2 As Byte, _
y3 As Byte, Text0 As String, Text1 As String, Text2 As String, Text3 As String, _
Text4 As String
For i2 = 1 To 4
y1 = y(i2) Mod 10
y2 = (y(i2) - y1) / 10 Mod 10
y3 = y(i2) \ 100
Text1 = Choose(y3 + 1, "", "сто ", "двести ", "триста ", "четыреста ", _
"п€тьсот ", "шестьсот ", "семьсот ", "восемьсот ", "дев€тьсот ")
Text2 = Choose(y2 + 1, "", "", "двадцать ", "тридцать ", "сорок ", _
"п€тьдес€т ", "шестьдес€т ", "семьдес€т ", "восемьдес€т ", "дев€носто ")
If y2 = 1 Then
Text3 = Choose(y1 + 1, "дес€ть ", "одиннадцать ", "двенадцать ", _
"тринадцать ", "четырнадцать ", "п€тнадцать ", "шестнадцать ", _
"семнадцать ", "восемнадцать ", "дев€тнадцать ")
ElseIf y2 <> 1 And i2 = 2 Then
Text3 = Choose(y1 + 1, "", "одна ", "две ", "три ", "четыре ", "п€ть ", _
"шесть ", "семь ", "восемь ", "дев€ть ")
Else
Text3 = Choose(y1 + 1, "", "один ", "два ", "три ", "четыре ", "п€ть ", _
"шесть ", "семь ", "восемь ", "дев€ть ")
End If
If y2 <> 1 And y1 = 1 Then
Text4 = Choose(i2, "рубль ", "тыс€ча ", "миллион ", "миллиард ")
ElseIf y2 <> 1 And y1 > 1 And y1 < 5 Then
Text4 = Choose(i2, "рубл€ ", "тыс€чи ", "миллиона ", "миллиарда ")
ElseIf y1 = 0 And y2 = 0 And y3 = 0 Then
Text4 = Choose(i2, "рублей ", "", "", "")
Else
Text4 = Choose(i2, "рублей ", "тыс€ч ", "миллионов ", "миллиардов ")
End If
Text(i2) = Text1 & Text2 & Text3 & Text4
Next
If y(1) + y(2) + y(3) + y(4) = 0 Then
Text0 = "ноль рублей " & kop
Else
Text0 = Text(4) & Text(3) & Text(2) & Text(1) & kop
End If
—уммаѕрописью = Replace(Text0, Left(Text0, 1), UCase(Left(Text0, 1)), 1, 1)
End If
End Function
Function ¬ыбрать‘айлы(Optional multi As Boolean = False)
    'ќчередность обратна€, начало с 1
    Dim FilesToOpen
    Dim x As Integer
     
    'вызываем диалог выбора файлов дл€ импорта
    FilesToOpen = Application.GetOpenFilename _
      (FileFilter:="All files (*.*), *.*", _
      MultiSelect:=multi, Title:="Files")
 
    If TypeName(FilesToOpen) = "Boolean" Then
        MsgBox "Ќе выбрано ни одного файла!"
        Exit Function
    End If
    
    ¬ыбрать‘айлы = FilesToOpen
End Function
