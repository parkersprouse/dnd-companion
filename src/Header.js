import React, { Component } from 'react';
import { Navbar, NavbarGroup, AnchorButton } from '@blueprintjs/core';

export default class Header extends Component {
  render() {
    return (
      <div className="heading">
        <Navbar>
          <NavbarGroup>
            <AnchorButton href="/" className="pt-minimal" iconName="home">Home</AnchorButton>
            <AnchorButton href="/files" className="pt-minimal" iconName="document">Files</AnchorButton>
          </NavbarGroup>
          <NavbarGroup align="right">
            <AnchorButton href="/" className="pt-minimal" iconName="user"></AnchorButton>
            <AnchorButton href="/" className="pt-minimal" iconName="notifications"></AnchorButton>
            <AnchorButton href="/" className="pt-minimal" iconName="cog"></AnchorButton>
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }
}
