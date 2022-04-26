Attribute VB_Name = "Transpose"
Sub Транспонирование()
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
    
    'Константы
    SourceSheetName = "ДАННЫЕ"
    TargetSheetName = "Строчный"
    CountsColumnName = "КОЛ"
    SizesColumnName = "Размер"
    FormSheetName = "Форма"
    
    'Переменные
    DataLastCol = Functions.GetColNumber(CountsColumnName, 1, SourceSheetName)
    SourceLastRow = Functions.GetLastRow(1, SourceSheetName)
    SourceLastCol = Functions.GetLastColumn(SourceSheetName)
    SizesColsStart = LastCol - SouceDataLastCol
    Set SourceSheet = Sheets(SourceSheetName)
    Set TargetSheet = Sheets(TargetSheetName)
    
    'Очистка таблицы
    TargetSheet.UsedRange.ClearContents
    
    'Перенос заголовков
    SourceSheet.Select
    SourceSheet.Range(Cells(1, 1), Cells(1, DataLastCol)).Copy
    TargetSheet.Select
    With TargetSheet.Range(Cells(1, 1), Cells(1, DataLastCol))
        .PasteSpecial Paste:=xlPasteValues
        '.PasteSpecial Paste:=xlPasteFormats
        .PasteSpecial Paste:=xlPasteColumnWidths
    End With
    TargetSizesCol = Functions.GetColNumber(SizesColumnName, 1, TargetSheetName)
    
    'Транспонирование таблицы
    For i = 2 To SourceLastRow Step 1
        TargetLastRow = Functions.GetLastRow(TargetSizesCol, TargetSheetName) 'Последняя строка целевой таблицы
        SourceSheet.Activate 'Активация исходной таблицы
        Set SizesRow = SourceSheet.Range(Cells(1, DataLastCol + 1), Cells(1, SourceLastCol)) 'Диапазон названий размеров
        Set ProductOrder = SourceSheet.Range(Cells(i, DataLastCol + 1), Cells(i, SourceLastCol)) 'Диапазон заказа колонок размеров
        Set OrderToTranspose = Union(SizesRow, ProductOrder) 'Объединение 2 диапазонов
        
        OrderToTranspose.Copy 'Копирование объединённых диапазонов
        TargetSheet.Activate 'Активация целевой таблицы
    
        TargetSheet.Cells(TargetLastRow + 1, TargetSizesCol).PasteSpecial Transpose:=True, Paste:=xlPasteValues 'Транспонирование копированного диапазона
        
        SourceSheet.Activate 'Активация целевой таблицы
        Set TableRowRange = SourceSheet.Range(Cells(i, 1), Cells(i, DataLastCol - 2)) 'Диапазон информации о товаре
        TableRowRange.Copy 'Копирование диапазона информации о товаре
        
        TargetSheet.Activate 'Активация целевой таблицы
        TargetLastRow = Functions.GetLastRow(TargetSizesCol, TargetSheetName) 'Нахождение последней строки целевой таблицыв колонке размеров
        ProductsLastRow = Functions.GetLastRow(1, TargetSheetName) 'Нахождение последней строки целевой таблицыв колонке информации о товаре
        TargetSheet.Range(Cells(TargetLastRow, 1), Cells(ProductsLastRow + 1, DataLastCol - 2)).Select 'Выбор диапазона незаполненной информации о товаре
        Selection.PasteSpecial Paste:=xlPasteFormulas 'Вставка в этот диапазон скопированной информации о товаре
    Next i
    
    'Удаление пустых строк
    Dim TargetSizesColRange As Range
    TargetOrderCountCol = Functions.GetColNumber(CountsColumnName, 1, TargetSheetName) 'Номер колонки с количеством заказа товара
    TargetLastRow = Functions.GetLastRow(TargetSizesCol, TargetSheetName) 'Последняя строка колонки с размерами
    i = 2
    Do
        Set OrderCell = TargetSheet.Cells(i, TargetOrderCountCol) 'Ячейка с количеством заказанного товара
        If Trim(OrderCell.Value) = "" Or Trim(OrderCell.Value) < 1 Then 'Если пуста, то
            OrderCell.EntireRow.Delete 'Удаление строки этой ячейки
            i = i - 1 'Уменьшаем итератор
        Else: i = i + 1
        End If
    Loop While Cells(i, TargetSizesCol) <> "" 'Пока не закончатся значения в колонке с размерами
    
    'Замена названий размеров
    i = 2
    Dim SizeCell As Range
    Do
        Set SizeCell = TargetSheet.Cells(i, TargetSizesCol) 'Ячейка с размером
        SizeOnlyNumbers = Functions.OnlyNumbers(SizeCell.Value) 'Оставляем только числа
        SizeOnlyNumbers = Replace(SizeOnlyNumbers, 5363, "00") 'Данный размер идёт как ONE/00
        SizeCell.Value = SizeOnlyNumbers 'Присваивание ячейке новое значение
        i = i + 1
    Loop While TargetSheet.Cells(i, TargetSizesCol) <> "" 'Пока не кончатся значения в колонке с размерами
    
    TargetSheet.Calculate 'Вычисление формулы полного артикула
    Sheets(FormSheetName).Calculate 'Вычисление сортировки полного артикула

    Application.DisplayAlerts = True 'Включение предупреждений
    Application.ScreenUpdating = True 'Включение обновление экрана



' Форматируем таблицу
'
'
'    Sheets("Строчный").Select
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
' Изменение_размеров Макрос
'
'
    
    'TargetSheet.Columns(TargetSizesCol).Select
    'With Selection
        '.Replace What:="S (55 см)", Replacement:="55", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="S/M (56 см)", Replacement:="56", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="M (57 см)", Replacement:="57", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="M/L (58 см)", Replacement:="58", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="L (59 см)", Replacement:="59", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="L/XL (60 см)", Replacement:="60", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XL (61 см)", Replacement:="61", LookAt:=xlPart, _
            SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XL/XXL (62 см)", Replacement:="62", LookAt:= _
            xlPart, SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XXL (63 см)", Replacement:="63", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XXL/XXXL (64 см)", Replacement:="64", LookAt:= _
            xlPart, SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XXXL (65 см)", Replacement:="65", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XS (53см)", Replacement:="53", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="XS/S (54см)", Replacement:="54", LookAt:=xlPart _
            , SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
        '.Replace What:="O/S (53-63 см)", Replacement:="ONE", LookAt:= _
            xlPart, SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
            ReplaceFormat:=False
    'End With

End Sub
