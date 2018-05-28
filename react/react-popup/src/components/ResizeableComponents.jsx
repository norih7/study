import React from 'react';

const holdTopStyles = {
    top       : 0,
    left      : 0,
    right     : 0,
    height    : '20px',
    background: '#ddd'
};

const holdRightStyles = {
    top       : 0,
    bottom    : 0,
    right     : 0,
    width     : '10px',
    background: '#ccc'
};

const holdBottomStyles = {
    bottom    : 0,
    left      : 0,
    right     : 0,
    height    : '10px',
    background: '#ccc'
};

const holdLeftStyles = {
    bottom    : '-1px',
    right     : '-1px',
    width     : '11px',
    height    : '11px',
    background: '#777'
};

export default class Resizeable extends React.Component {
    constructor() {
        super();
        this.state = {
            width  : 200,
            left   : 200,
            top    : 200,
            zIndex : 0
        };

        this.setHeight = this.setHeight.bind(this);
        this.setWidth  = this.setWidth.bind(this);
        this.getThisSideClassName = this.getThisSideClassName.bind(this);
        //this.setZIndex = this.setZIndex.bind(this);
    }

    setHeight(height) {
        this.setState({
            height : height
        });
    }

    setWidth(width) {
        this.setState({
            width : width
        });
    }

    setOffsetLeft(left) {
        this.setState({
            left : left
        });
    }

    setOffsetTop(top) {
        this.setState({
            top : top
        });
    }

    handleResizeRight(e) {
        // クリックしたポップアップのoffsetLeftを取得
        const offsetLeft = e.target.parentNode.offsetLeft;

        // ドラッグ時に実行するコールバック関数の定義
        const callback = (ev) => {
            const width = ev.clientX - offsetLeft;
            this.setWidth(width);
        };

        document.addEventListener('mousemove', callback);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', callback);
        });
    }

    handleResizeBottom(e) {
        // クリックしたポップアップのoffsetTopを取得
        const offsetTop = e.target.parentNode.offsetTop;

        // ドラッグ時に実行するコールバック関数の定義
        const callback = (ev) => {
            this.setHeight(ev.clientY - offsetTop);
        };

        // ドラッグ時に監視を開始
        document.addEventListener('mousemove', callback);

        // ドラッグ終了時は監視を停止
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', callback);
        });
    }

    handleResizeCorner(e) {
        const offsetTop  = e.target.parentNode.offsetTop;
        const offsetLeft = e.target.parentNode.offsetLeft;

        const callback = (ev) => {
            const width = ev.clientX - offsetLeft;
            const height = ev.clientY - offsetTop;

            this.setWidth(width);
            this.setHeight(height);
        };

        document.addEventListener('mousemove', callback);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', callback);
        });
    }

    handleDrug(e) {
        const targetWidth = e.target.parentNode.clientWidth;

        const callback = (ev) => {
            const left = ev.clientX - (targetWidth / 2);
            const top = ev.clientY;

            this.setOffsetLeft(left);
            this.setOffsetTop(top);
        };

        document.addEventListener('mousemove', callback);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', callback);
        });

        // this.setZIndex();
    }

    getToggleClassName() {
        let className = '';

        if (this.props.data.isShow) {
            className = 'show';
        } else {
            className = 'hide';
        }

        return className;
    }

    setZIndex() {
        // let list = this.props.handleSetZIndex(this.props.data.id);
        // const nextZIndex = this.state.zIndex + 1;
        
        // this.setState({
        //     zIndex : nextZIndex
        // });
    }

    componentWillReceiveProps() {
        return false;
    }

    getThisSideClassName() {
        let className = '';

        if (this.props.active == this.props.data.id) {
            className = 'this-side';
        } else {
            className = '';
        }

        return className;
    }

    changeStackOverPopUp(e) {
        const target = e.target;
        const className = (/resizeable/.test(target.className) === true) 
            ? target.className : target.parentNode.className;
        // TODO: ポップアップの並び順を変更
        console.log(className);
    }

    render() {
        return (
            <div
                className={'resizeable' + ' popup-' + this.props.data.id + ' ' + this.getToggleClassName() + ' ' + this.getThisSideClassName()}
                style={{
                    background: '#eee',
                    border: '1px solid #ccc',
                    position: 'absolute',
                    userSelect: 'none',
                    width : this.state.width + 'px',
                    height : this.state.height + 'px',
                    top : this.state.top + 'px',
                    left : this.state.left + 'px'
                }}
                onClick={this.changeStackOverPopUp}
            >
                <div
                    className="hold"
                    onMouseDown={this.handleDrug.bind(this)}
                    style={holdTopStyles}
                >
                </div>
                <div
                    className="hold"
                    onMouseDown={this.handleResizeRight.bind(this)}
                    style={holdRightStyles}
                >
                </div>
                <div
                    className="hold"
                    onMouseDown={this.handleResizeBottom.bind(this)}
                    style={holdBottomStyles}
                >
                </div>
                <div 
                    className="hold"
                    onMouseDown={this.handleResizeCorner.bind(this)}
                    style={holdLeftStyles}
                >
                </div>
                <div className="close" onClick={this.props.handleToggle.bind(this)}>×</div>
                <div className="content">
                resize
                </div>
            </div>
        );
    }
}