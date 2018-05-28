// @flow
import React from 'react';

type Props = {
    handleClick: any,
};

export class MakeButton extends React.Component<Props> {
    handleButtonClick: Function;

    constructor() {
        super();
    }
    handleButtonClick(e: SyntheticEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.handleClick();
        return;
    }
    render() {
        return (
            <div>
                <button onClick={(e) => this.handleButtonClick(e)}>Make Popup</button>
            </div>
        );
    }
}