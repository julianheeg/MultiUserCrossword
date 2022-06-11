import React, { Component } from 'react';

export default class WhiteCell extends Component {
    constructor(props) {
        super(props);
        this.state = { guessedCharacter: null };
        this.characterInput = React.createRef();
        this.validateInput = this.validateInput.bind(this);
    }

    render() {
        let character = this.state.guessedCharacter;
        if (character == null)
            character = '';

        let className = 'whiteCell';
        if (this.props.activeWord)
            className += ' activeWord';

        return (
            <td className={className}>
                <input ref={this.characterInput}
                    defaultValue={character} pattern="[A-Z]" size="1" maxLength="1" autoComplete="off" onClick={this.props.onClick} onInput={this.validateInput}/>
            </td>
        );
    }

    validateInput() {
        let input = this.characterInput.current;
        let inputValue = input.value;
        inputValue = inputValue.toUpperCase();
        if (/[A-Z]/.test(inputValue)) {
            input.value = inputValue;   // set to upper case if lower case was put in
            this.props.onValidInput();
        }
        else
            input.value = '';
    }

    componentDidUpdate() {
        if (this.props.activeCell)
            this.characterInput.current.focus();
    }
}