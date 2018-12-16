import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

/**
 * 子コンポーネント
 */
const Child = () => {
  return (
    <div style={{ height: 300, background: "#333" }}>
      <button
        onClick={() => {
          window.open(".", "new", "width=600, height=600");
        }}
      >
        window.open
      </button>
    </div>
  );
};

/**
 * 親コンポーネント
 * 子コンポーネントをrenderしてから自身のheightを算出して
 * windowサイズを変更する
 */
class App extends Component {
  componentDidMount() {
    // コンテンツ部分の高さを取得してwindowサイズを動的に取得
    const diffHeight = window.outerHeight - window.innerHeight;
    const height = this.dom.clientHeight + diffHeight;
    window.resizeTo(600, height);
  }

  render() {
    return (
      <div
        className="App"
        ref={e => {
          this.dom = e;
        }}
      >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Child
          ref={e => {
            this.child = e;
          }}
        />
      </div>
    );
  }
}

export default App;
