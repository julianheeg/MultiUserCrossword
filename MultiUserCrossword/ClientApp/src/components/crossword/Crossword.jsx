import React, { Component } from 'react';
import WhiteCell from './WhiteCell';
import BlackCell from './BlackCell';

export class Crossword extends Component {
    static displayName = Crossword.name;

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            activeWord: [],
            activeCell: null,
            loading: true
        };

        this.highlightHorizontalWord = this.highlightHorizontalWord.bind(this);
        this.highlightVerticalWord = this.highlightVerticalWord.bind(this);
        this.focusNextLetterAfterInput = this.focusNextLetterAfterInput.bind(this);
        this.focusPreviousLetter = this.focusPreviousLetter.bind(this);
    }

    render() {
        if (this.state.loading)
            return (
                <div>
                    <p><em>Loading...</em></p>
                </div>
            );

        return (
            <div>
                <h1 id="tabelLabel">Crossword</h1>
                <table className="table crossword">
                    <tbody>
                        {this.state.grid.map((row, rowIndex) =>
                            <tr key={rowIndex}>
                                {row.map((cell, columnIndex) => {
                                    let key = rowIndex + ',' + columnIndex;
                                    return cell.hasCharacter ?
                                        <WhiteCell key={key} solutionCharacter={cell.solutionCharacter} onClick={() => this.highlightHorizontalWord(rowIndex, columnIndex)} activeWord={this.state.activeWord.includes(key)}
                                            activeCell={this.state.activeCell == key} navigateForward={() => this.focusNextLetterAfterInput(key)} navigateBackward={() => this.focusPreviousLetter(key)} /> :
                                        <BlackCell key={key} clueAcross={cell.clueAcross} clueDown={cell.clueDown} onHorizontalClueClick={() => this.highlightHorizontalWord(rowIndex, columnIndex)} onVerticalClueClick={() => this.highlightVerticalWord(rowIndex, columnIndex)} />
                                })
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
                activeWord: {this.state.activeWord}
                activeCell: {this.state.activeCell}
            </div>
        );
    }

    highlightHorizontalWord(rowIndex, columnIndex) {
        let activeWord = [];

        let row = this.state.grid[rowIndex];
        // cells with smaller index
        for (let i = columnIndex; i >= 0; i--) {
            if (!row[i].hasCharacter)
                break;
            activeWord.push(rowIndex + ',' + i);
        }

        // cells are in opposite order, so we reverse
        activeWord = activeWord.reverse();

        // current cell and cells with greater index
        for (let i = columnIndex + 1; i < row.length; i++) {
            if (!row[i].hasCharacter)
                break;
            activeWord.push(rowIndex + ',' + i);
        }

        let activeCell = this.getActiveCellAfterHighlight(rowIndex, columnIndex, activeWord);

        this.setState({ activeWord: activeWord, activeCell: activeCell });
    }

    highlightVerticalWord(rowIndex, columnIndex) {
        let activeWord = [];
        let grid = this.state.grid;

        // cells with smaller index
        for (let i = rowIndex; i >= 0; i--) {
            if (!grid[i][columnIndex].hasCharacter)
                break;
            activeWord.push(i + ',' + columnIndex);
        }

        // cells are in opposite order, so we reverse
        activeWord = activeWord.reverse();

        // current cell and cells with greater index
        for (let i = rowIndex + 1; i < grid.length; i++) {
            if (!grid[i][columnIndex].hasCharacter)
                break;
            activeWord.push(i + ',' + columnIndex);
        }

        let activeCell = this.getActiveCellAfterHighlight(rowIndex, columnIndex, activeWord);

        this.setState({ activeWord: activeWord, activeCell: activeCell });
    }

    getActiveCellAfterHighlight(rowIndex, columnIndex, activeWord) {
        if (this.state.grid[rowIndex][columnIndex].hasCharacter)
            return rowIndex + ',' + columnIndex;
        else
            return activeWord[0];
    }

    focusNextLetterAfterInput(key) {
        let currentLetterInWord = this.state.activeWord.indexOf(key);
        if (currentLetterInWord == this.state.activeWord.length - 1)
            return;
        let nextActiveCell = this.state.activeWord[currentLetterInWord + 1];
        this.setState({ activeCell: nextActiveCell });
    }

    focusPreviousLetter(key) {
        let currentLetterInWord = this.state.activeWord.indexOf(key);
        if (currentLetterInWord == 0)
            return;
        let nextActiveCell = this.state.activeWord[currentLetterInWord - 1];
        this.setState({ activeCell: nextActiveCell });
    }

    componentDidMount() {
        this.getCrossword();
    }

    async getCrossword() {
        const response = await fetch('crossword');
        const data = await response.json();
        this.setState({ grid: data.grid, loading: false });
    }
}