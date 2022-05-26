import React, { Component } from 'react';
import WhiteCell from './WhiteCell';
import BlackCell from './BlackCell';

export class Crossword extends Component {
    static displayName = Crossword.name;

    constructor(props) {
        super(props);
        this.state = { grid: [], loading: true };
    }

    componentDidMount() {
        this.getCrossword();
    }

    static renderCrossword(grid) {
        return (
            <table >
                <tbody>
                    {grid.map((row, rowIndex) =>
                        <tr key={rowIndex}>
                            {row.map((cell, columnIndex) =>
                                cell.hasCharacter ?
                                    <WhiteCell key={(rowIndex, columnIndex)} solutionCharacter={cell.solutionCharacter} /> :
                                    <BlackCell key={(rowIndex, columnIndex)} clueAcross={cell.clueAcross} clueDown={cell.clueDown} />
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Crossword.renderCrossword(this.state.grid);

        return (
            <div>
                <h1 id="tabelLabel">Crossword</h1>
                {contents}
            </div>
        );
    }

    async getCrossword() {
        const response = await fetch('crossword');
        const data = await response.json();
        this.setState({ grid: data.grid, loading: false });
    }
}