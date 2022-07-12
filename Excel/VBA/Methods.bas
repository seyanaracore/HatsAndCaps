Attribute VB_Name = "Methods"
Sub ����������������(colNum As Integer, formulaCellRow As Integer, Optional SheetName As String = "", Optional lastRow = False, Optional lrCol As Integer = 1)
    Dim colRange As Range
    Dim colFormula As Variant
    'Dim lrCol As Integer
    Dim TargetSheet As Worksheet
    Set TargetSheet = Functions.GetTargetSheet(SheetName)
    If TargetSheet Is Nothing Then Exit Sub
   
    colFormula = TargetSheet.Cells(formulaCellRow, colNum).Formula
    
    If lastRow = False Then
        lr = Functions.getLastRow(lrCol, TargetSheet.Name)
    Else
        lr = lastRow
    End If
    
    TargetSheet.Select
    Set colRange = Range(Cells((lr - 1), colNum), Cells(formulaCellRow, colNum).End(xlUp))
    
    colRange.Offset(1, 0).Formula = colFormula
End Sub
Sub ��������������(SheetsNamesList, path, Optional SheetsHandlers = False, Optional usedValues As Boolean = True)
On Error Resume Next
    'Consts
    Dim FormListName As String
    Dim LoadList As String
    '���������� ����������� � ����������
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False
    Dim sheetSelection As Range
    Set newWb = Workbooks.Add
    ThisWorkbook.Activate
    
    For i = 1 To Functions.ArrayLen(SheetsNamesList) Step 1
        FormListName = SheetsNamesList(i)
        UnloadList = FormListName & "_"
        
        Worksheets(FormListName).Copy Before:=Worksheets(1)
        Sheets(1).Name = UnloadList
    
        Sheets(UnloadList).Activate
        Dim smallrng As Range
        If usedValues Then ActiveSheet.UsedRange.Value = ActiveSheet.UsedRange.Value
        'ActiveSheet.UsedRange.ClearFormats
        ActiveSheet.UsedRange.Columns.Ungroup
        ActiveSheet.UsedRange.Columns.Hidden = False
        
        ActiveSheet.Copy After:=newWb.Sheets(newWb.Sheets.Count)
        If SheetsHandlers Then
            SheetsHandlers = Split(SheetHandler(i), ";")
            If SheetsNamesList(i) = splitHandler(0) Then Application.Run splitHandler(1)
        End If
        ThisWorkbook.Activate
        Sheets(1).Delete
    Next i
    newWb.Activate
    newWb.Sheets(1).Delete
    Dim FileN$
    FileN = path
    ActiveWorkbook.SaveCopyAs FileN
    ActiveWorkbook.Close SaveChanges:=False
    Sheets(FormListName).Activate

    MsgBox "������� ���������: " & FileN
    Application.ScreenUpdating = True
    Application.DisplayAlerts = True
End Sub
Sub ���������������������(Optional SheetName As String = "")
    Dim TargetSheet As Worksheet
    Set TargetSheet = Functions.GetTargetSheet(SheetName)
    If TargetSheet Is Nothing Then Exit Sub
    
    LastCol = Functions.GetLastColumn(TargetSheet.Name)
    
    For i = LastCol To 1 Step -1
        If CBool(TargetSheet.Columns(i).Hidden) Then
            TargetSheet.Columns(i).Hidden = False
            TargetSheet.Columns(i).EntireColumn.Delete
        End If
    Next i
End Sub
Sub ���������������������(Optional SheetName As String = "")
    Dim TargetSheet As Worksheet
    Set TargetSheet = Functions.GetTargetSheet(SheetName)
    If TargetSheet Is Nothing Then Exit Sub

    'TargetSheet.UsedRange.Value = TargetSheet.UsedRange.Value
    LastCol = Functions.GetLastColumn
    i = 1
    Do
        TargetSheet.Columns(i).Copy 'TargetSheet.Cells(1, i)
        TargetSheet.Cells(1, i).PasteSpecial Paste:=xlPasteValues
        i = i + 1
    Loop While i <> LastCol
End Sub
Sub ��������������������(Optional SheetName As String = "")
    Dim TargetSheet As Worksheet
    Set TargetSheet = Functions.GetTargetSheet(SheetName)
    If TargetSheet Is Nothing Then Exit Sub
    
    lastRow = TargetSheet.UsedRange.Rows.Count
    For i = lastRow To 1 Step -1
        If CBool(Rows(i).Hidden) Then
            Rows(i).EntireRow.Delete
        End If
    Next i
End Sub
Sub �������������������������(Optional SheetName As String = "")
    Dim TargetSheet As Worksheet
    
    Set TargetSheet = Functions.GetTargetSheet(SheetName)
    If TargetSheet Is Nothing Then Exit Sub
    
    Dim Pic As Object
    For Each Pic In TargetSheet.Pictures
        Pic.Delete
    Next Pic
End Sub
Sub �������������������������(Cell As Range)
    Dim xPicRg As Range
    Dim xPic As Picture
    Dim xRg As Range
    Set xRg = Cell
    For Each xPic In Cell.Worksheet.Pictures 'ActiveSheet.Pictures
        Set xPicRg = Range(xPic.TopLeftCell.Address & ":" & xPic.BottomRightCell.Address)
        If Not Intersect(xRg, xPicRg) Is Nothing Then xPic.Delete
    Next
End Sub
Sub �����������������(Optional Row As Integer = 1)
    lastRow = Functions.getLastRow(Row)
    lastRow = lastRow - 3
    ActiveWindow.ScrollRow = Application.WorksheetFunction.Max(lastRow, 1)
End Sub
Sub ���������������������������������()
col = Selection.Column

lastRow = Cells(Rows.Count, col).End(xlUp).Row

For i = lastRow To 1 Step -1
    Dim TargetCell As Range
    Set TargetCell = Cells(i, col)
    If TargetCell.Value = "" Then GoTo NextIteration
    Set CheckingValueUp = Columns(col).Find(TargetCell.Value, LookAt:=1, After:=TargetCell, MatchCase:=1, LookIn:=xlValues, SearchDirection:=xlPrevious)
    
    Debug.Print "ActualRow:" & TargetCell.Row & " / " & "Finded row:" & CheckingValueUp.Row & ";"
    
    If Not CheckingValueUp Is Nothing And CheckingValueUp.Row <> TargetCell.Row Then TargetCell.Value = ""
NextIteration:
Next i

End Sub
Sub �����������������(Optional RowH As Integer = 15)
  For i = 3 To ActiveSheet.UsedRange.Rows.Count Step 1
    Rows(i).Hidden = False
    'Rows(i).RowHeight = RowH
  Next i
End Sub
Sub ��������������������������()
    Dim li As Long, oObj As Shape, wsSh As Worksheet, wsTmpSh As Worksheet
    Dim sImagesPath As String, sName As String
    Dim lNamesCol As Long, s As String
    Dim groupsTypeNumber As Integer, objTypeForSave As Variant
    groupsTypeNumber = 6
    imagesTypeNumber = 13

    objTypeForSave = imagesTypeNumber
 
    s = InputBox("������� ����� ������� � ������� ��� ��������" & vbNewLine & _
                 "(0 - ������� � ������� ���� ��������)", "", "")
    If StrPtr(s) = 0 Then Exit Sub
    lNamesCol = Val(s)
 
    sImagesPath = ActiveWorkbook.path & "\images\" '"
    If Dir(sImagesPath, 16) = "" Then
        MkDir sImagesPath
    End If
'    On Error Resume Next
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False
    Set wsSh = ActiveSheet
    Set wsTmpSh = ActiveWorkbook.Sheets.Add
    For Each oObj In wsSh.Shapes
        If oObj.Type = objTypeForSave Then
            oObj.Copy
            If lNamesCol = 0 Then
                sName = oObj.TopLeftCell.Value
            Else
                sName = wsSh.Cells(oObj.TopLeftCell.Row, lNamesCol).Value
            End If
            '���� � ������ ���� �������, �����������
            '��� ������������� � �������� ���� ��� ������ - �������
            sName = CheckName(sName)
            '���� sName � ���������� ����� - ���� ��� unnamed_ � ���������� �������
            If sName = "" Then
                li = li + 1
                sName = "unnamed_" & li
            End If
            With wsTmpSh.ChartObjects.Add(0, 0, oObj.Width, oObj.Height).Chart
                .ChartArea.Border.LineStyle = 0
                .Parent.Select
                .Paste
                .Export Filename:=sImagesPath & sName & ".jpg", FilterName:="JPG"
                .Parent.Delete
            End With
            'oObj.Delete
        End If
    Next oObj
    Set oObj = Nothing: Set wsSh = Nothing
    wsTmpSh.Delete
    Application.DisplayAlerts = True
    Application.ScreenUpdating = True
    MsgBox "������� ��������� � �����: " & sImagesPath, vbInformation, ""
End Sub
Sub �������������������()
    Dim sPicsPath As String
    Dim sPicName As String, sPFName As String, sSpName As String
    Dim llastr As Long, lr As Long
    Dim oShp As Shape
    Dim zoom As Double

    With Application.FileDialog(msoFileDialogFolderPicker)
        .Title = "������� ����� � ����������"       '��������� ���� �������
        .ButtonName = "������� �����"
        .Filters.Clear                              '������� ������������� ����� ���� ������
        .InitialFileName = ThisWorkbook.path        '��������� ������ ����� �����������
        .InitialView = msoFileDialogViewLargeIcons  '��� ����������� ����
        If .Show = 0 Then Exit Sub               '���������� ������
        sPicsPath = .SelectedItems(1)
    End With
    
    ColForImages = InputBox("������� ����� ������� ��� �����������", "", "")
    
    If StrPtr(ColForImages) = 0 Then Exit Sub
    ColForImages = Val(ColForImages)
    
    
    
    '���������, ���� �� ���� ����� ���� � �����
    '���� ��� - ���������, ����� ���� � �������� ����� ��������
    If Right(sPicsPath, 1) <> Application.PathSeparator Then
        sPicsPath = sPicsPath & Application.PathSeparator
    End If

    '���� ����� ����� � ������� � ������� �������� ������ ���
    If Selection.Rows.Count < 2 Then
        Exit Sub
    End If
    '���� �� ������� � ������� ��������
    For Each Cell In Selection
        sPicName = Cell.Value
        '��������� ������� �������� � �����
        sPFName = sPicsPath & sPicName
        If Dir(sPFName, 16) <> "" And sPicName <> "" Then
            '� ��� ������ ��������� ��������
            With Cells(Cell.Row, ColForImages)
                
                '������ �������� ���������� �����,
                '����������� � ������ ������
                sSpName = "_" & .Address(0, 0) & "_autopaste"
                '���� �������� ��� ���� - ������� �
                Set oShp = Nothing
                On Error Resume Next
                Set oShp = ActiveSheet.Shapes(sSpName)
                If Not oShp Is Nothing Then
                    oShp.Delete
                End If
                On Error GoTo 0
                '��������� ��������� ��������
                Set oShp = ActiveSheet.Shapes.AddPicture(sPFName, False, True, .Left + 1, .Top + 1, -1, -1)
                '���������� ������� �������� � ����������� �� ������� ������
                zoom = Application.Min(.Width / oShp.Width, .Height / oShp.Height)
                oShp.Height = oShp.Height * zoom - 2
                '��������������� ����������� ��������(����� ����� ����� ���� ��������)
                oShp.Name = sSpName
            End With
        End If
    Next
End Sub
Sub ����������������������������()
    ActiveSheet.Cells.Validation.Delete
End Sub
Sub �������������������()
On Error Resume Next
   Dim Name As Object
    For Each Name In ActiveWorkbook.Names
       Name.Delete
   Next
End Sub
Sub ���������������������������(CellsRange As Range)
    Dim a As Range
    Set a = CellsRange
    With a.Borders
        .LineStyle = xlContinuous
        .Weight = xlThin
    End With
End Sub
Sub �������������������()
    Dim xOLE As Object
    On Error Resume Next
    ActiveSheet.Buttons.Delete
    For Each xOLE In ActiveSheet.OLEObjects
        If TypeName(xOLE.Object) = "CommandButton" Then
            xOLE.Delete
        End If
    Next
End Sub
