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

        this.onCellClick = this.onCellClick.bind(this);
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
                                        <WhiteCell key={key} solutionCharacter={cell.solutionCharacter} activeInput={this.state.active.has(key)} onClick={() => this.onCellClick(rowIndex, columnIndex)} /> :
                                        <BlackCell key={key} clueAcross={cell.clueAcross} clueDown={cell.clueDown} />
                                }
                                )}
                            </tr>
                        )}
                    </tbody>
                </table>
                active: { this.state.active }
            </div>
        );
    }

    onCellClick(rowIndex, columnIndex) {
        console.log("onCellClick: " + rowIndex + ", " + columnIndex);

        let active = new Set();

        let row = this.state.grid[rowIndex];
        // current cell and cells with greater index
        for (let i = columnIndex; i < row.length; i++) {
            if (!row[i].hasCharacter)
                break;
            active.add(rowIndex + ',' + i);
        }
        // cells with smaller index
        for (let i = columnIndex - 1; i >= 0; i--) {
            if (!row[i].hasCharacter)
                break;
            active.add(rowIndex + ',' + i);
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