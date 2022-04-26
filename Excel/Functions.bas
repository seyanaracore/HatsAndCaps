Attribute VB_Name = "Functions"
Function GetTargetSheet(SheetName As Variant) As Worksheet
    Dim TargetSheet As Worksheet
    If SheetName <> Empty Then Set TargetSheet = Sheets(SheetName) Else Set TargetSheet = ActiveSheet
    Debug.Print "Target sheet: " & TargetSheet.Name
    Set GetTargetSheet = TargetSheet
End Function
Function GetColNumber(ColName As String, Optional RowNumber As Integer = 1, Optional SheetName As String = "") As Integer
Dim TargetSheet As Worksheet
Set TargetSheet = Functions.GetTargetSheet(SheetName)
If TargetSheet Is Nothing Then Exit Function

Set fcell = TargetSheet.Rows(RowNumber).Find(ColName, LookAt:=1, MatchCase:=1, LookIn:=xlFormulas) 'xlValues)

If Not fcell Is Nothing Then
    result = Str(fcell.Column)
End If
GetColNumber = result
End Function
Function GetRowNumber(RowName As String, Optional ColumnNumber As Integer = 1, Optional SheetName As String = "") As Integer
Dim TargetSheet As Worksheet
Set TargetSheet = Functions.GetTargetSheet(SheetName)
If TargetSheet Is Nothing Then Exit Function

Set fcell = TargetSheet.Columns(ColumnNumber).Find(RowName, LookAt:=1, MatchCase:=1, LookIn:=xlValues) 'LookIn:=xlFormulas)

If Not fcell Is Nothing Then
    result = CStr(fcell.Row)
End If
GetRowNumber = result
End Function
Function GetLastRow(Optional ColumnNumber As Integer = 1, Optional SheetName As String = "") As Integer
Dim TargetSheet As Worksheet
Set TargetSheet = Functions.GetTargetSheet(SheetName)
If TargetSheet Is Nothing Then Exit Function

Set fcell1 = TargetSheet.Columns(ColumnNumber).Find(Empty, After:=Cells(Cells.Rows.Count, ColumnNumber), LookAt:=1, MatchCase:=1, LookIn:=xlFormulas)
Set fcell2 = TargetSheet.Columns(ColumnNumber).Find(Empty, After:=Cells(Cells.Rows.Count, ColumnNumber), LookAt:=1, MatchCase:=1, LookIn:=xlValues)
If Not fcell1 Is Nothing Then fcell1 = fcell1.Row Else fcell1 = 0
If Not fcell2 Is Nothing Then fcell2 = fcell2.Row Else fcell2 = 0
result = Application.WorksheetFunction.Max(fcell1, fcell2)

'If Not fcell Is Nothing Then
'    result = CStr(fcell.Row)
'End If
GetLastRow = result - 1
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
Function GetLastColumn(Optional SheetName As String = "") As Integer
Dim TargetSheet
Set TargetSheet = Functions.GetTargetSheet(SheetName)
If TargetSheet Is Nothing Then Exit Function

Set fcell = TargetSheet.Rows(1).Find(Empty, LookAt:=1, MatchCase:=1, LookIn:=xlValues) 'xlFormulas)

If Not fcell Is Nothing Then
    result = Str(fcell.Column)
End If

GetLastColumn = result - 1
End Function
Function GetTableRange() As Range
TableName = Store.GetTableSheetName
StartRow = Store.GetTableStartRow
LastRow = Functions.GetLastRow(1, TableName, StartRow)
LastCol = Functions.GetLastColumn(TableName)

Dim TableRange As Range
Set TableRange = Sheets(TableName).Range(Cells(LastRow, 1), Cells(StartRow, LastCol))

Set GetTableRange = TableRange
End Function
Function OnlyNumbers(Value As Variant)
    Dim a As String
    Dim i As Long
    Dim l As Long
 
    Dim objRegExp As Object
    Set objRegExp = CreateObject("VBScript.RegExp")
    objRegExp.Global = True
    objRegExp.Pattern = "[^0-9]"
    OnlyNumbers = objRegExp.Replace(Value, "")
End Function
