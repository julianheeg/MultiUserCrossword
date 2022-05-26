import React, { Component } from 'react';

export default class BlackCell extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        let text = "";
        if (this.props.clueDown)
            text += this.props.clueDown + " v ";
        if (this.props.clueAcross)
            text += this.props.clueAcross + " ->";
        return (            
            <td>
                {text}
            </td>
        );
    }
}