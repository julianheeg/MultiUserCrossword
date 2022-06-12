import React, { Component } from 'react';

export default class WhiteCell extends Component {
    constructor(props) {
        super(props);
        this.state = { guessedCharacter: null };
        this.characterInput = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.handleControlButton = this.handleControlButton.bind(this);
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
                    defaultValue={character} pattern="[A-Z]" size="1" maxLength="2" autoComplete="off" onClick={this.props.onClick} onInput={this.handleInput} onKeyDown={this.handleControlButton}/>
            </td>
        );
    }

    handleControlButton = (event) => {
        console.log(event.key);
        switch (event.key) {
            case "Backspace":
                if (event.key != "Backspace")
                    return;
                let input = this.characterInput.current;
                let inputValue = input.value;
                if (inputValue == '')
                    this.props.navigateBackward();
                return;
            case "ArrowUp":
            case "ArrowLeft":
                this.props.navigateBackward();
                return;
            case "ArrowRight":
            case "ArrowDown":
                this.props.navigateForward();
                return;
            default:
                return;
        }
    }

    handleInput() {
        let input = this.characterInput.current;
        let inputValue = input.value;
        // return early if no value;
        if (inputValue == '')
            return;
        // get previous value
        let previousValue = '';
        if (inputValue.length > 1)
            previousValue = inputValue[0];
        // get next value and, if not valid, reset input to previos value and return 
        inputValue = inputValue[inputValue.length - 1].toUpperCase();
        if (!/[A-Z]/.test(inputValue)) {
            input.value = previousValue;
            return;
        }

        // set input field to new value
        input.value = inputValue;  
        this.props.navigateForward();
    }

    componentDidUpdate() {
        if (this.props.activeCell)
            this.characterInput.current.focus();
    }
}