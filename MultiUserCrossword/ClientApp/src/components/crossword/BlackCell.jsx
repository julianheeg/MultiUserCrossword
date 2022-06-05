import React, { Component } from 'react';

export default class BlackCell extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        let clueAcrossContent = null;
        if (this.props.clueAcross)
            clueAcrossContent = <div>{this.props.clueAcross} -&gt;</div>;
        let clueDownContent = null;
        if (this.props.clueDown)
            clueDownContent = <div>{this.props.clueDown} v</div>;
        return (            
            <td className="blackCell">
                {clueAcrossContent}
                {clueDownContent}
            </td>
        );
    }
}