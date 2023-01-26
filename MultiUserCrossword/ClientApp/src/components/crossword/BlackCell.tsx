import { FC } from 'react';
import Clue from './Clue';
import { TableCell } from '@mui/material';

interface BlackCellProps {
    clueAcross?: string,
    clueDown?: string,
    onHorizontalClueClick:() => void,
    onVerticalClueClick: () => void
}

const BlackCell: FC<BlackCellProps> = (props) => {
    const clueAcrossContent = props.clueAcross && <Clue clue={props.clueAcross} horizontal={true} onClick={props.onHorizontalClueClick} />;
    const clueDownContent = props.clueDown && <Clue clue={props.clueDown} horizontal={false} onClick={props.onVerticalClueClick}/>;

    return (            
        <TableCell data-testid={'black-cell'} className="blackCell">
            {clueAcrossContent}
            {clueDownContent}
        </TableCell>
    );
}

export default BlackCell;