import React, { Component } from 'react';

export default class Clue extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let className = this.props.horizontal ? 'clueAcross' : 'clueDown';
        return <div className={className} onClick={this.props.onClick}>{this.props.clue} {this.props.horizontal ? ' ->' : 'v'}</div>
    }
}