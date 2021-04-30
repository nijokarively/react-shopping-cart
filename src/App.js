import React, { PureComponent } from "react";
import { hot } from "react-hot-loader/root";

import "globals.styl";
import styles from "./App.styl";

import Routes from "./Routes";
import CartContextProvider from "./contexts/CartContext";

class App extends PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <CartContextProvider>
          <Routes />
        </CartContextProvider>
      </div>
    );
  }
}

export default hot(App);
