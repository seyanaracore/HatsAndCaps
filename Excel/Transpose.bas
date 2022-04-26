Attribute VB_Name = "Transpose"
Sub ����������������()
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False
    Application.Calculation = xlManual
    
    Dim SourceSheet As Worksheet
    Dim TargetSheet As Worksheet
    Dim SourceSheetName As String
    Dim TargetSheetName As String
    Dim TableRowRange As Range
    Dim SizesRow As Range
    Dim ProductOrder As Range
    Dim OrderToTranspose As Range
    Dim SourceSizesColRange As Range
    Dim TargetSizesCol As Integer
    Dim TargetLastRow As Integer
    Dim CountsColumnName As String
    Dim SizesColumnName As String
    
    '���������
    SourceSheetName = "������"
    TargetSheetName = "��������"
    CountsColumnName = "���"
    SizesColumnName = "������"
    FormSheetName = "�����"
    
    '����������
    DataLastCol = Functions.GetColNumber(CountsColumnName, 1, SourceSheetName)
    SourceLastRow = Functions.GetLastRow(1, SourceSheetName)
    SourceLastCol = Functions.GetLastColumn(SourceSheetName)
    SizesColsStart = LastCol - SouceDataLastCol
    Set SourceSheet = Sheets(SourceSheetName)
    Set TargetSheet = Sheets(TargetSheetName)
    
    '������� �������
    TargetSheet.UsedRange.ClearContents
    
    '������� ����������
    SourceSheet.Select
    SourceSheet.Range(Cells(1, 1), Cells(1, DataLastCol)).Copy
    TargetSheet.Select
    With TargetSheet.Range(Cells(1, 1), Cells(1, DataLastCol))
        .PasteSpecial Paste:=xlPasteValues
        '.PasteSpecial Paste:=xlPasteFormats
        .PasteSpecial Paste:=xlPasteColumnWidths
    End With
    TargetSizesCol = Functions.GetColNumber(SizesColumnName, 1, TargetSheetName)
    
    '���������������� �������
    For i = 2 To SourceLastRow Step 1
        TargetLastRow = Functions.GetLastRow(TargetSizesCol, TargetSheetName) '��������� ������ ������� �������
        SourceSheet.Activate '��������� �������� �������
        Set SizesRow = SourceSheet.Range(Cells(1, DataLastCol + 1), Cells(1, SourceLastCol)) '�������� �������� ��������
        Set ProductOrder = SourceSheet.Range(Cells(i, DataLastCol + 1), Cells(i, SourceLastCol)) '�������� ������ ������� ��������
        Set OrderToTranspose = Union(SizesRow, ProductOrder) '����������� 2 ����������
        
        OrderToTranspose.Copy '����������� ����������� ����������
        TargetSheet.Activate '��������� ������� �������
    
        TargetSheet.Cells(TargetLastRow + 1, TargetSizesCol).PasteSpecial Transpose:=True, Paste:=xlPasteValues '���������������� ������������� ���������
        
        SourceSheet.Activate '��������� ������� �������
        Set TableRowRange = SourceSheet.Range(Cells(i, 1), Cells(i, DataLastCol - 2)) '�������� ���������� � ������
        TableRowRange.Copy '����������� ��������� ���������� � ������
        
        TargetSheet.Activate '��������� ������� �������
        TargetLastRow = Functions.GetLastRow(TargetSizesCol, TargetSheetName) '���������� ��������� ������ ������� �������� ������� ��������
        ProductsLastRow = Functions.GetLastRow(1, TargetSheetName) '���������� ��������� ������ ������� �������� ������� ���������� � ������
        TargetSheet.Range(Cells(TargetLastRow, 1), Cells(ProductsLastRow + 1, DataLastCol - 2)).Select '����� ��������� ������������� ���������� � ������
        Selection.PasteSpecial Paste:=xlPasteFormulas '������� � ���� �������� ������������� ���������� � ������
    Next i
    
    '�������� ������ �����
    Dim TargetSizesColRange As Range
    TargetOrderCountCol = Functions.GetColNumber(CountsColumnName, 1, TargetSheetName) '����� ������� � ����������� ������ ������
    TargetLastRow = Functions.GetLastRow(TargetSizesCol, TargetSheetName) '��������� ������ ������� � ���������
    i = 2
    Do
        Set OrderCell = TargetSheet.Cells(i, TargetOrderCountCol) '������ � ����������� ����������� ������
        If Trim(OrderCell.Value) = "" Or Trim(OrderCell.Value) < 1 Then '���� �����, ��
            OrderCell.EntireRow.Delete '�������� ������ ���� ������
            i = i - 1 '��������� ��������
        Else: i = i + 1
        End If
    Loop While Cells(i, TargetSizesCol) <> "" '���� �� ���������� �������� � ������� � ���������
    
    '������ �������� ��������
    i = 2
    Dim SizeCell As Range
    Do
        Set SizeCell = TargetSheet.Cells(i, TargetSizesCol) '������ � ��������
        SizeOnlyNumbers = Functions.OnlyNumbers(SizeCell.Value) '��������� ������ �����
        SizeOnlyNumbers = Replace(SizeOnlyNumbers, 5363, "00") '������ ������ ��� ��� ONE/00
        SizeCell.Value = SizeOnlyNumbers '������������ ������ ����� ��������
        i = i + 1
    Loop While TargetSheet.Cells(i, TargetSizesCol) <> "" '���� �� �������� �������� � ������� � ���������
    
    TargetSheet.Calculate '���������� ������� ������� ��������
    Sheets(FormSheetName).Calculate '���������� ���������� ������� ��������

    Application.DisplayAlerts = True '��������� ��������������
    Application.ScreenUpdating = True '��������� ���������� ������



' ����������� �������
'
'
'    Sheets("��������").Select
'    Cells.Select
'    With Selection
'        .HorizontalAlignment = xlGeneral
'        .VerticalAlignment = xlBottom
'       .WrapText = False
'        .Orientation = 0
'       .AddIndent = False
'        .IndentLevel = 0
'        .ShrinkToFit = False
'        .ReadingOrder = xlContext
'        .MergeCells = False
'    End With
'    Cells.EntireColumn.AutoFit
'    Range("C7").Select
'    Columns("N:N").Select
'    Selection.Delete Shift:=xlToLeft
'    Columns("S:S").Select
'    Selection.AutoFilter
'    ActiveSheet.Range("$S$1:$S$721").AutoFilter Field:=1, Criteria1:="="
'    Rows("2:2").Select
'    Range("M2").Activate
'    ActiveWindow.SmallScroll Down:=-15

'    ActiveWindow.SmallScroll Down:=423
'    Rows("2:1136").Select
'    Range("M2").Activate
'    Selection.Delete Shift:=xlUp
'    ActiveSheet.Range("$S$1:$S$237").AutoFilter Field:=1
'    Range("A1").Select
    
'
' ���������_�������� ������
'
'
    
    'TargetSheet.Columns(TargetSizesCol).Select
    'With Selection
        '.Replace What:="S (55 ��)", Replacement:="55", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="S/M (56 ��)", Replacement:="56", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="M (57 ��)", Replacement:="57", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="M/L (58 ��)", Replacement:="58", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="L (59 ��)", Replacement:="59", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="L/XL (60 ��)", Replacement:="60", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XL (61 ��)", Replacement:="61", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XL/XXL (62 ��)", Replacement:="62", LookAt:= _
            xlPart, SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XXL (63 ��)", Replacement:="63", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XXL/XXXL (64 ��)", Replacement:="64", LookAt:= _
            xlPart, SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XXXL (65 ��)", Replacement:="65", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XS (53��)", Replacement:="53", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XS/S (54��)", Replacement:="54", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="O/S (53-63 ��)", Replacement:="ONE", LookAt:= _
            xlPart, SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
    'End With

End Sub
