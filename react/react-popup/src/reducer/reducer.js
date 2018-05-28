export const reducer = (state, action) => {
    let obj = {};
    let tmp = {};

    switch (action.type) {
    case 'MAKE' :
        tmp.popup = Object.assign({}, state.popup);
        tmp.popup.count = state.popup.count + 1;
        tmp.popup.list.push({
            id : tmp.popup.count,
            isShow : true
        });

        obj = Object.assign({}, state, tmp);
        break;
    case 'TOGGLE' :
        tmp.popup = Object.assign({}, state.popup);
        tmp.popup.list.map((item, i) => {
            if (item.id == action.id) {
                tmp.popup.list[i] = {
                    id : action.id,
                    isShow : !tmp.popup.list[i].isShow
                };
            }
        });
        obj = Object.assign({}, state, tmp);

        break;

    case 'THIS_SIDE' :
        tmp.popup = Object.assign({}, state.popup);
        tmp.popup.active = action.id;

        obj = Object.assign({}, state, tmp);
        break;

    default :
        obj = state;
        break;
    }

    return obj;
};
