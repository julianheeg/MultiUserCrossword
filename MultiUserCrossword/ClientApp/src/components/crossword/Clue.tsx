import { FC } from 'react';

interface ClueProps {
    horizontal: boolean;
    clue: string;
    onClick: () => void;
}

const Clue: FC<ClueProps> = (props) => {
    const className = props.horizontal ? 'clueAcross' : 'clueDown';
    return <div data-testid={'clue'} className={className} onClick={props.onClick}> { props.clue } { props.horizontal ? ' ->' : 'v' } </div>;
}

export default Clue;