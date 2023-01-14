import React, { FC, Component } from 'react';

interface ClueProps {
    horizontal: boolean;
    clue: string;
    onClick: () => void;
}

const Clue: FC<ClueProps> = (props) => {
    const className = props.horizontal ? 'clueAcross' : 'clueDown';
    return <div className={className} onClick={props.onClick}> { props.clue } { props.horizontal ? ' ->' : 'v' } </div>;
}

export default Clue;

//export default class Clue extends Component {
//    constructor(props) {
//        super(props);
//        this.state = {};
//    }

//    render() {
//        let className = this.props.horizontal ? 'clueAcross' : 'clueDown';
//        return <div className={className} onClick={this.props.onClick}>{this.props.clue} {this.props.horizontal ? ' ->' : 'v'}</div>
//    }
//}