import React, { Component } from "react";
import Header from "./Header";
import Overlay from "./Overlay";
import ToastContainer from "./ToasterContainer";

export default class Layout extends Component<{ children: React.ReactNode }> {
  render() {
    return (
      <>
        <ToastContainer />
        <Header />
        <Overlay />
        <div className="py-20">{this.props.children}</div>
      </>
    );
  }
}
