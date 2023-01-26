import { render, screen, fireEvent } from '@testing-library/react';
import Clue from './Clue';

it('renders horizontally without crashing', () => {
    render(<Clue clue={'test clue'} horizontal={true} onClick={() => { } } />);
})

it('renders vertically without crashing', () => {
    render(<Clue clue={'test clue'} horizontal={false} onClick={() => { }} />);
})

it('has correct class name if horizontal', () => {
    render(<Clue clue={'test clue'} horizontal={true} onClick={() => { }} />);
    const clue = screen.getByTestId('clue');
    expect(clue).toHaveClass('clueAcross');
})

it('has correct class name if vertical', () => {
    render(<Clue clue={'test clue'} horizontal={false} onClick={() => { }} />);
    const clue = screen.getByTestId('clue');
    expect(clue).toHaveClass('clueDown');
})

it('shows correct direction sign if horizontal', () => {
    render(<Clue clue={'test clue'} horizontal={true} onClick={() => { }} />);
    const clue = screen.getByTestId('clue');
    expect(clue).toContainHTML('->');
})

it('shows correct direction sign if horizontal', () => {
    render(<Clue clue={'test clue'} horizontal={false} onClick={() => { }} />);
    const clue = screen.getByTestId('clue');
    expect(clue).toContainHTML('v');
})

it('fires onClick event if horizontal and when clicked', () => {
    const onClick = jest.fn();
    render(<Clue clue={'test clue'} horizontal={true} onClick={onClick} />);
    const clue = screen.getByTestId('clue');
    fireEvent.click(clue);
    expect(onClick).toHaveBeenCalled();
})

it('fires onClick event if vertical and when clicked', () => {
    const onClick = jest.fn();
    render(<Clue clue={'test clue'} horizontal={false} onClick={onClick} />);
    const clue = screen.getByTestId('clue');
    fireEvent.click(clue);
    expect(onClick).toHaveBeenCalled();
})