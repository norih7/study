import React          from 'react';
import { connect }    from 'react-redux';
import { Popup }      from '../components/PopupComponents.jsx';
import { MakeButton } from '../components/MakeButtonComponents.jsx';
import {
    makePopupActionCreator, togglePopupActionCreator,
    thisSidePopupActionCreator
} from '../action/action.js';

class App extends React.Component {
    render() {
        return (
            <div>
                <MakeButton
                    handleClick={this.props.handleMakePopup}
                />
                <Popup
                    popup={this.props.popup}
                    handleToggle={this.props.handleToggle}
                    handleThisSide={this.props.handleThisSide}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        popup : state.popup
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleMakePopup : (value) => {
            dispatch(makePopupActionCreator(value));
        },
        handleToggle : (state) => {
            dispatch(togglePopupActionCreator(state));
        },
        handleThisSide : (id) => {
            dispatch(thisSidePopupActionCreator(id));
        }
    };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);