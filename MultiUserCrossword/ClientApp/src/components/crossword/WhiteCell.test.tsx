import { render, screen, fireEvent } from '@testing-library/react';
import { Direction } from './Direction';
import WhiteCell from './WhiteCell';

it('renders without crashing', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={() => { }} />, { container: tr });
})

it('has active word class if active word', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    render(<WhiteCell isActiveWord={true} isActiveCell={false} onClick={() => { }} navigate={() => { }} />, { container: tr });
    const cell = screen.getByTestId('white-cell');
    expect(cell).toHaveClass('activeWord');
})

it('does not have active word class if not active word', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    render(<WhiteCell isActiveWord={false} isActiveCell={false} onClick={() => { }} navigate={() => { }} />, { container: tr });
    const cell = screen.getByTestId('white-cell');
    expect(cell).not.toHaveClass('activeWord');
})

it('calls onClick if input is clicked', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const onClick = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={onClick} navigate={() => { }} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.click(cellInput);
    expect(onClick).toHaveBeenCalled();
})

it('handles left arrow key if active cell', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.keyDown(cellInput, { key: 'ArrowLeft' });
    expect(navigate).toHaveBeenLastCalledWith(Direction.Left);
})

it('handles right arrow key if active cell', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.keyDown(cellInput, { key: 'ArrowRight' });
    expect(navigate).toHaveBeenLastCalledWith(Direction.Right);
})

it('handles up arrow key if active cell', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.keyDown(cellInput, { key: 'ArrowUp' });
    expect(navigate).toHaveBeenLastCalledWith(Direction.Up);
})

it('handles down arrow key if active cell', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.keyDown(cellInput, { key: 'ArrowDown' });
    expect(navigate).toHaveBeenLastCalledWith(Direction.Down);
})

it('navigates backwards on backspace when no character is present', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { } } navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.keyDown(cellInput, {key: 'Backspace'});
    expect(navigate).toHaveBeenLastCalledWith(Direction.Backward);
})

it('does not navigate backwards on backspace when a character is present', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    (cellInput as HTMLInputElement).value = 'A';
    fireEvent.keyDown(cellInput, { key: 'Backspace' });
    expect(navigate).not.toHaveBeenCalled();
})

it('accepts input character and navigates to next cell if active cell and no character is present', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.input(cellInput, { target: { value: 'A' } });
    expect((cellInput as HTMLInputElement).value).toBe('A');
    expect(navigate).toHaveBeenCalledWith(Direction.Forward);
})

it('changes character on input and navigates to next cell if active cell and character is present', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    (cellInput as HTMLInputElement).value = 'A';
    fireEvent.input(cellInput, { target: { value: 'B' } });
    expect((cellInput as HTMLInputElement).value).toBe('B');
    expect(navigate).toHaveBeenCalledWith(Direction.Forward);
})

it('does not accept special character as input and does not navigate to next cell', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    const navigate = jest.fn();

    render(<WhiteCell isActiveWord={true} isActiveCell={true} onClick={() => { }} navigate={navigate} />, { container: tr });
    const cellInput = screen.getByTestId('white-cell-input');
    fireEvent.input(cellInput, { target: { value: '*' } });
    expect((cellInput as HTMLInputElement).value).toBe('');
    expect(navigate).not.toHaveBeenCalledWith(Direction.Forward);
})