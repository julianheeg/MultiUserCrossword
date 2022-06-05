import React, { Component } from 'react';

export default class WhiteCell extends Component {
    constructor(props) {
        super(props);
        this.state = { guessedCharacter: null };
    }

    render() {
        let character = this.state.guessedCharacter;
        if (character == null)
            character = '';

        let className = 'whiteCell';
        if (this.props.activeInput)
            className += ' activeWord';

        return (
            <td className={className}>
                <input defaultValue={character} onClick={this.props.onClick} />
            </td>
        );
    }
}