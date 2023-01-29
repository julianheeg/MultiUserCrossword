import { FC, useState, useEffect } from 'react';
import WhiteCellComponent from './WhiteCell';
import BlackCellComponent from './BlackCell';
import { Direction } from './Direction';
import { Table, TableBody, TableRow } from '@mui/material';
import { Cell, BlackCell } from './crosswordGrid.type';

const Crossword: FC<{}> = () => {
    const [grid, setGrid] = useState<Cell[][] | null>(null);
    const [activeWord, setActiveWord] = useState<string[]>([]);
    const [activeCell, setActiveCell] = useState<string | null>(null);

    useEffect(() => {
        getCrossword();
    }, []);

    const getCrossword = async () => {
        const response = await fetch('crossword');
        const data = await response.json();
        setGrid(data.grid);
    }

    const highlightHorizontalWord = (rowIndex: number, columnIndex: number) => {
        let newActiveWord = [];

        let row = grid![rowIndex];
        // cells with smaller index
        for (let i = columnIndex; i >= 0; i--) {
            if (!row[i].isWhiteCell)
                break;
            newActiveWord.push(rowIndex + ',' + i);
        }

        // cells are in opposite order, so we reverse
        newActiveWord = newActiveWord.reverse();

        // current cell and cells with greater index
        for (let i = columnIndex + 1; i < row.length; i++) {
            if (!row[i].isWhiteCell)
                break;
            newActiveWord.push(rowIndex + ',' + i);
        }

        let newActiveCell = getActiveCellAfterHighlight(rowIndex, columnIndex, newActiveWord);

        setActiveWord(newActiveWord);
        setActiveCell(newActiveCell);
    }

    const highlightVerticalWord = (rowIndex: number, columnIndex: number) => {
        let newActiveWord = [];

        // cells with smaller index
        for (let i = rowIndex; i >= 0; i--) {
            if (!grid![i][columnIndex].isWhiteCell)
                break;
            newActiveWord.push(i + ',' + columnIndex);
        }

        // cells are in opposite order, so we reverse
        newActiveWord = newActiveWord.reverse();

        // current cell and cells with greater index
        for (let i = rowIndex + 1; i < grid!.length; i++) {
            if (!grid![i][columnIndex].isWhiteCell)
                break;
            newActiveWord.push(i + ',' + columnIndex);
        }

        let newActiveCell = getActiveCellAfterHighlight(rowIndex, columnIndex, newActiveWord);

        setActiveWord(newActiveWord);
        setActiveCell(newActiveCell);
    }

    const getActiveCellAfterHighlight = (rowIndex: number, columnIndex: number, activeWord: string[]) => {
        if (grid![rowIndex][columnIndex].isWhiteCell)
            return rowIndex + ',' + columnIndex;
        else
            return activeWord[0];
    }

    const navigate = (rowIndex: number, columnIndex: number, direction: Direction) => {
        switch (direction) {
            case Direction.Forward:
                focusNextLetter(rowIndex, columnIndex);
                return;
            case Direction.Backward:
                focusPreviousLetter(rowIndex, columnIndex);
                return;
            case Direction.Up:
                {
                    if (rowIndex <= 0) {
                        highlightVerticalWord(rowIndex, columnIndex);
                        return;
                    }
                    let newRowIndex = rowIndex - 1;
                    if (grid![newRowIndex][columnIndex].isWhiteCell)
                        highlightVerticalWord(newRowIndex, columnIndex);
                    else 
                        highlightVerticalWord(rowIndex, columnIndex);
                    return;
                }
            case Direction.Down:
                {
                    if (rowIndex >= grid!.length - 1) {
                        highlightVerticalWord(rowIndex, columnIndex);
                        return;
                    }
                    let newRowIndex = rowIndex + 1;
                    if (grid![newRowIndex][columnIndex].isWhiteCell)
                        highlightVerticalWord(newRowIndex, columnIndex);
                    else
                        highlightVerticalWord(rowIndex, columnIndex);
                    return;
                }
            case Direction.Left:
                {
                    if (columnIndex <= 0) {
                        highlightHorizontalWord(rowIndex, columnIndex);
                        return;
                    }
                    let newColumnIndex = columnIndex - 1;
                    if (grid![rowIndex][newColumnIndex].isWhiteCell)
                        highlightHorizontalWord(rowIndex, newColumnIndex);
                    else
                        highlightHorizontalWord(rowIndex, columnIndex);
                    return;
                }
            case Direction.Right:
                {
                    if (columnIndex >= grid![0].length - 1) {
                        highlightHorizontalWord(rowIndex, columnIndex);
                        return;
                    }
                    let newColumnIndex = columnIndex + 1;
                    if (grid![rowIndex][newColumnIndex].isWhiteCell)
                        highlightHorizontalWord(rowIndex, newColumnIndex);
                    else
                        highlightHorizontalWord(rowIndex, columnIndex);
                    return;
                }
            default:
                throw new Error('unreachable code');
        }
    }

    const focusNextLetter = (rowIndex: number, columnIndex: number) => {
        let key = rowIndex + ',' + columnIndex;
        let currentLetterInWord = activeWord!.indexOf(key);
        if (currentLetterInWord === activeWord!.length - 1)
            return;
        let nextActiveCell = activeWord![currentLetterInWord + 1];
        setActiveCell(nextActiveCell);
    }

    const focusPreviousLetter = (rowIndex: number, columnIndex: number) => {
        let key = rowIndex + ',' + columnIndex;
        let currentLetterInWord = activeWord!.indexOf(key);
        if (currentLetterInWord === 0)
            return;
        let nextActiveCell = activeWord![currentLetterInWord - 1];
        setActiveCell(nextActiveCell);
    }

    if (grid === null)
        return (
            <div>
                <p><em>Loading...</em></p>
            </div>
        );

    return (
        <div>
            <h1 id="tabelLabel">Crossword</h1>
            <Table className="table crossword" data-testid={'crossword'} >
                <TableBody>
                    {grid.map((row, rowIndex) =>
                        <TableRow key={rowIndex}>
                            {row.map((cell, columnIndex) => {
                                let key = rowIndex + ',' + columnIndex;
                                if (cell.isWhiteCell) {
                                    return <WhiteCellComponent key={key} onClick={() => highlightHorizontalWord(rowIndex, columnIndex)} isActiveWord={activeWord.includes(key)}
                                        isActiveCell={activeCell === key} navigate={(direction) => navigate(rowIndex, columnIndex, direction)} />
                                }
                                else {
                                    let blackCell = cell as BlackCell;
                                    return <BlackCellComponent key={key} clueAcross={blackCell.clueAcross} clueDown={blackCell.clueDown} onHorizontalClueClick={() => highlightHorizontalWord(rowIndex, columnIndex)} onVerticalClueClick={() => highlightVerticalWord(rowIndex, columnIndex)} />
                                }
                            })
                            }
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            activeWord: {activeWord}
            activeCell: {activeCell}
        </div>
    );
}

export default Crossword;