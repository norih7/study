const CONST_MAKE = 'MAKE';
const CONST_TOGGLE = 'TOGGLE';
const CONST_THIS_SIDE = 'THIS_SIDE';

export const makePopupActionCreator = () => {
    return {
        type : CONST_MAKE
    };
};

export const togglePopupActionCreator = (e) => {
    let id = e.target.parentNode.className.split('-')[1].split(' ')[0];
    return {
        type : CONST_TOGGLE,
        id : id
    };
};

// @flow
export const thisSidePopupActionCreator = (e) => {
    let id = e.target.className.split('-')[1].split(' ')[0];
    return {
        type : CONST_THIS_SIDE,
        id : id
    };
};