import React, { Component } from 'react';
import WhiteCell from './WhiteCell';
import BlackCell from './BlackCell';

export class Crossword extends Component {
    static displayName = Crossword.name;

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            active: new Set(),
            loading: true
        };

        this.highlightHorizontalWord = this.highlightHorizontalWord.bind(this);
        this.highlightVerticalWord = this.highlightVerticalWord.bind(this);
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
                                        <WhiteCell key={key} solutionCharacter={cell.solutionCharacter} activeInput={this.state.active.has(key)} onClick={() => this.highlightHorizontalWord(rowIndex, columnIndex)} /> :
                                        <BlackCell key={key} clueAcross={cell.clueAcross} clueDown={cell.clueDown} onHorizontalClueClick={() => this.highlightHorizontalWord(rowIndex, columnIndex)} onVerticalClueClick={() => this.highlightVerticalWord(rowIndex, columnIndex)} />
                                })
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
                active: { this.state.active }
            </div>
        );
    }

    highlightHorizontalWord(rowIndex, columnIndex) {
        console.log("highlightHorizontalWord: " + rowIndex + ", " + columnIndex);

        let active = new Set();

        let row = this.state.grid[rowIndex];
        // current cell and cells with greater index
        for (let i = columnIndex + 1; i < row.length; i++) {
            if (!row[i].hasCharacter)
                break;
            active.add(rowIndex + ',' + i);
        }
        // cells with smaller index
        for (let i = columnIndex; i >= 0; i--) {
            if (!row[i].hasCharacter)
                break;
            active.add(rowIndex + ',' + i);
        }

        console.log(active);

        this.setState({ active: active });
    }

    highlightVerticalWord(rowIndex, columnIndex) {
        console.log("highlightVerticalWord: " + rowIndex + ", " + columnIndex);

        let active = new Set();
        let grid = this.state.grid;

        // current cell and cells with greater index
        for (let i = rowIndex + 1; i < grid.length; i++) {
            if (!grid[i][columnIndex].hasCharacter)
                break;
            active.add(i + ',' + columnIndex);
        }
        // cells with smaller index
        for (let i = rowIndex; i >= 0; i--) {
            if (!grid[i][columnIndex].hasCharacter)
                break;
            active.add(i + ',' + columnIndex);
        }

        console.log(active);

        this.setState({ active: active });
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