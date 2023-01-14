import { Component } from 'react';
import Clue from './Clue';
import { TableCell } from '@mui/material';

export default class BlackCell extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        let clueAcrossContent = null;
        if (this.props.clueAcross != null)
            clueAcrossContent = <Clue clue={this.props.clueAcross} horizontal={true} onClick={this.props.onHorizontalClueClick}/>;
        let clueDownContent = null;
        if (this.props.clueDown != null)
            clueDownContent = <Clue clue={this.props.clueDown} horizontal={false} onClick={this.props.onVerticalClueClick}/>;
        return (            
            <TableCell className="blackCell">
                {clueAcrossContent}
                {clueDownContent}
            </TableCell>
        );
    }
}