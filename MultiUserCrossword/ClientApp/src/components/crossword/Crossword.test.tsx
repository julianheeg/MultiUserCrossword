import { render, screen, fireEvent, within } from '@testing-library/react';
import Crossword from './Crossword';
import fetchMock from 'jest-fetch-mock';

const testCrossword = {
    grid: [
        [
            {
                isWhiteCell: false,
                clueAcross: null,
                clueDown: null
            },
            {
                isWhiteCell: false,
                clueAcross: null,
                clueDown: "ac"
            },
            {
                isWhiteCell: false,
                clueAcross: "e",
                clueDown: "bd"
            },
            {
                isWhiteCell: true,
                solutionCharacter: "e",
                guessedCharacter: null
            }
        ],
        [
            {
                isWhiteCell: false,
                clueAcross: "abf",
                clueDown: null
            },
            {
                isWhiteCell: true,
                solutionCharacter: "a",
                guessedCharacter: null
            },
            {
                isWhiteCell: true,
                solutionCharacter: "b",
                guessedCharacter: null
            },
            {
                isWhiteCell: true,
                solutionCharacter: "f",
                guessedCharacter: null
            }
        ],
        [
            {
                isWhiteCell: false,
                clueAcross: "cdg",
                clueDown: null
            },
            {
                isWhiteCell: true,
                solutionCharacter: "c",
                guessedCharacter: null
            },
            {
                isWhiteCell: true,
                solutionCharacter: "d",
                guessedCharacter: null
            },
            {
                isWhiteCell: true,
                solutionCharacter: "g",
                guessedCharacter: null
            }
        ]
    ]
}

beforeEach(() => {
    fetchMock.resetMocks();
})

it('renders without crashing', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    await screen.findByTestId('crossword');
})

it('loads a crossword after mounting', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCells = await screen.findAllByTestId('white-cell');
    const blackCells = await screen.findAllByTestId('black-cell');
    expect(whiteCells.length).toBe(7);
    expect(blackCells.length).toBe(5);
})

it('has not highlighted a word after mounting', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCells = await screen.findAllByTestId('white-cell');
    const highlightedCells = whiteCells.filter(cell => cell.classList.contains('activeWord'))
    expect(highlightedCells.length).toBe(0);
})

it('highlights corresponding horizontal word when clicking on an across clue', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const clue = await screen.findByText('abf', { exact: false });
    fireEvent.click(clue);
    const whiteCells = await screen.findAllByTestId('white-cell');

    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[3]).toHaveClass('activeWord');

    const highlightedCells = whiteCells.filter(cell => cell.classList.contains('activeWord'))
    expect(highlightedCells.length).toBe(3);
})

it('highlights corresponding vertical word when clicking on a down clue', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const clue = await screen.findByText('bd', { exact: false });
    fireEvent.click(clue);
    const whiteCells = await screen.findAllByTestId('white-cell');

    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[5]).toHaveClass('activeWord');

    const highlightedCells = whiteCells.filter(cell => cell.classList.contains('activeWord'))
    expect(highlightedCells.length).toBe(2);
})

it('highlights corresponding horizontal word when clicking on a white cell input', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[2]);

    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[3]).toHaveClass('activeWord');

    const highlightedCells = whiteCells.filter(cell => cell.classList.contains('activeWord'))
    expect(highlightedCells.length).toBe(3);
})

it('focusses first white cell input in horizontal word when clicking on an across clue', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const clue = await screen.findByText('abf', { exact: false });
    fireEvent.click(clue);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');

    expect(whiteCellInputs[1]).toHaveFocus();
})

it('focusses first white cell input in vertical word when clicking on a down clue', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const clue = await screen.findByText('bd', { exact: false });
    fireEvent.click(clue);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');

    expect(whiteCellInputs[2]).toHaveFocus();
})

it('focusses corresponding input when clicking on a white cell', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[2]);
    expect(whiteCellInputs[2]).toHaveFocus();
})

it('navigates left when left arrow key is pressed and navigation is possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[2]);

    fireEvent.keyDown(whiteCellInputs[2], { key: 'ArrowLeft' });

    expect(whiteCellInputs[1]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[3]).toHaveClass('activeWord');
})

it('keeps focus when left arrow key is pressed and navigation is not possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[1]);

    fireEvent.keyDown(whiteCellInputs[1], { key: 'ArrowLeft' });

    expect(whiteCellInputs[1]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[3]).toHaveClass('activeWord');
})

it('navigates right when right arrow key is pressed and navigation is possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[2]);

    fireEvent.keyDown(whiteCellInputs[2], { key: 'ArrowRight' });

    expect(whiteCellInputs[3]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[3]).toHaveClass('activeWord');
})

it('keeps focus when right arrow key is pressed and navigation is not possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[3]);

    fireEvent.keyDown(whiteCellInputs[3], { key: 'ArrowRight' });

    expect(whiteCellInputs[3]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[3]).toHaveClass('activeWord');
})

it('navigates down when down arrow key is pressed and navigation is possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[2]);

    fireEvent.keyDown(whiteCellInputs[2], { key: 'ArrowDown' });

    expect(whiteCellInputs[5]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[5]).toHaveClass('activeWord');
})

it('keeps focus when down arrow key is pressed and navigation is not possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[5]);

    fireEvent.keyDown(whiteCellInputs[5], { key: 'ArrowDown' });

    expect(whiteCellInputs[5]).toHaveFocus();

    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[5]).toHaveClass('activeWord');
})

it('navigates up when up arrow key is pressed and navigation is possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[5]);

    fireEvent.keyDown(whiteCellInputs[5], { key: 'ArrowUp' });

    expect(whiteCellInputs[2]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[5]).toHaveClass('activeWord');
})

it('keeps focus when up arrow key is pressed and navigation is not possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[2]);

    fireEvent.keyDown(whiteCellInputs[2], { key: 'ArrowUp' });

    expect(whiteCellInputs[2]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[5]).toHaveClass('activeWord');
})

it('navigates left when backspace is pressed on empty input when horizontal word is active and navigation is possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[5]);

    fireEvent.keyDown(whiteCellInputs[5], { key: 'Backspace' });

    expect(whiteCellInputs[4]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[4]).toHaveClass('activeWord');
    expect(whiteCells[5]).toHaveClass('activeWord');
    expect(whiteCells[6]).toHaveClass('activeWord');
})

it('keeps focus when backspace is pressed on empty input when horizontal word is active and navigation is not possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[1]);

    fireEvent.keyDown(whiteCellInputs[1], { key: 'Backspace' });

    expect(whiteCellInputs[1]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[3]).toHaveClass('activeWord');
})

it('navigates up when backspace is pressed on empty input when vertical word is active and navigation is possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[5]);
    fireEvent.keyDown(whiteCellInputs[5], { key: 'ArrowDown' });

    fireEvent.keyDown(whiteCellInputs[5], { key: 'Backspace' });

    expect(whiteCellInputs[2]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[2]).toHaveClass('activeWord');
    expect(whiteCells[5]).toHaveClass('activeWord');
})

it('keeps focus when backspace is pressed on empty input when vertical word is active and navigation is not possible', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(testCrossword));
    render(<Crossword />);
    const whiteCellInputs = await screen.findAllByTestId('white-cell-input');
    fireEvent.click(whiteCellInputs[1]);
    fireEvent.keyDown(whiteCellInputs[1], { key: 'ArrowUp' });

    fireEvent.keyDown(whiteCellInputs[1], { key: 'Backspace' });

    expect(whiteCellInputs[1]).toHaveFocus();
    const whiteCells = await screen.findAllByTestId('white-cell');
    expect(whiteCells[1]).toHaveClass('activeWord');
    expect(whiteCells[4]).toHaveClass('activeWord');
})