import { render, screen, fireEvent } from '@testing-library/react';
import BlackCell from './BlackCell';

it('renders without crashing', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    render(<BlackCell onHorizontalClueClick={() => { }} onVerticalClueClick={() => { }} />, { container: tr });
})

it('renders no clues when no clues given', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    render(<BlackCell onHorizontalClueClick={() => { }} onVerticalClueClick={() => { }} />, { container: tr });
    const clues = screen.queryAllByTestId('clue');
    expect(clues).toHaveLength(0);
});

it('renders down clue if down clue is given', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    render(<BlackCell clueDown={'test clue'} onHorizontalClueClick={() => { }} onVerticalClueClick={() => { }} />, { container: tr });
    const clues = screen.queryAllByTestId('clue');
    expect(clues).toHaveLength(1);
    expect(clues[0]).toHaveClass('clueDown');
    expect(clues[0]).toHaveTextContent('test clue');
});

it('renders across clue if across clue is given', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);

    render(<BlackCell clueAcross={'test clue'} onHorizontalClueClick={() => { }} onVerticalClueClick={() => { }} />, { container: tr });
    const clues = screen.queryAllByTestId('clue');
    expect(clues).toHaveLength(1);
    expect(clues[0]).toHaveClass('clueAcross');
    expect(clues[0]).toHaveTextContent('test clue');
});

it('passes onHorizontalClueClick to across clue', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);
    const onHorizontalClueClick = jest.fn();
    const onVerticalClueClick = jest.fn();

    render(<BlackCell clueAcross={'test clue'} onHorizontalClueClick={onHorizontalClueClick} onVerticalClueClick={onVerticalClueClick} />, { container: tr });
    const clues = screen.queryAllByTestId('clue');
    const clue = clues[0];
    fireEvent.click(clue);
    expect(onHorizontalClueClick).toHaveBeenCalled();
    expect(onVerticalClueClick).not.toHaveBeenCalled();
});

it('passes onVerticalClueClick to down clue', () => {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    document.body.appendChild(table);
    table.appendChild(tbody);
    tbody.appendChild(tr);
    const onHorizontalClueClick = jest.fn();
    const onVerticalClueClick = jest.fn();

    render(<BlackCell clueDown={'test clue'} onHorizontalClueClick={onHorizontalClueClick} onVerticalClueClick={onVerticalClueClick} />, { container: tr });
    const clues = screen.queryAllByTestId('clue');
    const clue = clues[0];
    fireEvent.click(clue);
    expect(onVerticalClueClick).toHaveBeenCalled();
    expect(onHorizontalClueClick).not.toHaveBeenCalled();
});

