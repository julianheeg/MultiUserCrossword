import React, { Component } from 'react';

export default class WhiteCell extends Component {
    constructor(props) {
        super(props);
        this.state = { guessedCharacter: null };
    }

    render() {
        return (
            <td>
                {this.props.solutionCharacter}
            </td>
        );
    }
}