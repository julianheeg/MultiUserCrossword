import React, { Component } from 'react';

export class Crossword extends Component {
    static displayName = Crossword.name;

    constructor(props) {
        super(props);
        this.state = { cells: [], loading: true };
    }

    componentDidMount() {
        this.getCrossword();
    }

    static renderCrossword(crossword) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <tbody>
                    {crossword.map(cell =>
                        <tr key={cell.date}>
                            <td>{cell.date}</td>
                            <td>{cell.temperatureC}</td>
                            <td>{cell.temperatureF}</td>
                            <td>{cell.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Crossword.renderCrossword(this.state.cells);

        return (
            <div>
                <h1 id="tabelLabel">Crossword</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async getCrossword() {
        const response = await fetch('crossword');
        const data = await response.json();
        this.setState({ cells: data, loading: false });
    }
}