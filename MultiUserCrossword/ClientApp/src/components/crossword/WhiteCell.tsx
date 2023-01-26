import React, { FC,  useRef, useEffect } from 'react';
import { Direction } from './Direction';
import { TableCell } from '@mui/material';

interface WhiteCellProps {
    isActiveWord: boolean,
    isActiveCell: boolean,
    onClick: () => void,
    navigate: (direction: Direction) => void,
}

const WhiteCell: FC<WhiteCellProps> = (props) => {
    const characterInput = useRef<HTMLInputElement>(null);

    const handleControlButton = (event: React.KeyboardEvent<HTMLInputElement>) => {
        switch (event.key) {
            case "Backspace":
                let input = characterInput.current;
                if (!input) 
                    return;
                let inputValue = input.value;
                if (inputValue === '')
                    props.navigate(Direction.Backward);
                return;
            case "ArrowUp":
                props.navigate(Direction.Up);
                return;
            case "ArrowLeft":
                props.navigate(Direction.Left);
                return;
            case "ArrowRight":
                props.navigate(Direction.Right);
                return;
            case "ArrowDown":
                props.navigate(Direction.Down);
                return;
            default:
                return;
        }
    }

    const handleInput = () => {
        let input = characterInput.current;
        if (!input)
            return;
        let inputValue = input.value;
        // return early if no value;
        if (inputValue === '')
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
        props.navigate(Direction.Forward);
    }

    useEffect(() => {
        if (props.isActiveCell)
            characterInput.current!.focus();
    }, [props.isActiveCell])

    let className = 'whiteCell';
    if (props.isActiveWord)
        className += ' activeWord';

    return (
        <TableCell data-testid={'white-cell'} className={className}>
            <input data-testid={'white-cell-input'} ref={characterInput}
                defaultValue={''}
                pattern="[A-Z]"
                size={1}
                maxLength={2}
                autoComplete="off"
                onClick={props.onClick}
                onInput={handleInput}
                onKeyDown={handleControlButton} />
        </TableCell>
    );
}

export default WhiteCell;