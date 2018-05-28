import React            from 'react';
import ReactDOM         from 'react-dom';
import { createStore }  from 'redux';
import { Provider }     from 'react-redux';
import { reducer }      from './reducer/reducer.js';
import { AppContainer } from './container/container.js';

const initialState = {
    popup : {
        count : 0,
        active : 1,
        list : []
    }
};

const store = createStore(reducer, initialState);


ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.querySelector('.content')
);