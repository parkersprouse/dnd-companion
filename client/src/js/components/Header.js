import React, { Component } from 'react';
import { Navbar, NavbarGroup, AnchorButton, Popover, Menu, MenuItem, Position, PopoverInteractionKind, Button, Collapse } from '@blueprintjs/core';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }

    this.configureDesktopMenu = this.configureDesktopMenu.bind(this);

    this.isMobile = false;
    if (window.innerWidth < 992)
      this.isMobile = true;
  }

  configureDesktopMenu() {
    let userDropdown =
      <Menu>
        <MenuItem text="Settings" iconName="cog" href="/profile" shouldDismissPopover={false} />
        <MenuItem text="Logout" iconName="log-out" href="/logout" shouldDismissPopover={false} />
      </Menu>;

    let rightSide = null;
    const auth = false;
    if (auth) {
      rightSide =
        <NavbarGroup align="right">
          <Popover content={userDropdown} position={Position.BOTTOM}
                   interactionKind={PopoverInteractionKind.HOVER}
                   hoverOpenDelay={0} hoverCloseDelay={150}>
            <AnchorButton className="pt-minimal" iconName="user" rightIconName="caret-down">User</AnchorButton>
          </Popover>
        </NavbarGroup>;
    }
    else {
      rightSide =
        <NavbarGroup align="right">
          <AnchorButton href="/login" className="pt-minimal" iconName="log-in">Login</AnchorButton>
          <AnchorButton href="/register" className="pt-minimal" iconName="new-person">Register</AnchorButton>
        </NavbarGroup>;
    }

    this.menu = (
      <div className="heading">
        <Navbar>
          <NavbarGroup>
            <AnchorButton href="/" className="pt-minimal" iconName="home">Home</AnchorButton>
          </NavbarGroup>
          { rightSide }
        </Navbar>
      </div>
    );
  }

  render() {
    if (this.isMobile) {
      this.menu = (
        <div className="heading">
          <Navbar>
            <NavbarGroup align="right">
              <Button onClick={() => this.setState({ isOpen: !this.state.isOpen })} className="pt-minimal" iconName="menu"></Button>
            </NavbarGroup>
          </Navbar>
          <Collapse isOpen={this.state.isOpen}>
            <AnchorButton href="/" className="pt-minimal">Home</AnchorButton>
            <AnchorButton href="/profile" className="pt-minimal">Profile</AnchorButton>
            <AnchorButton href="/logout" className="pt-minimal">Logout</AnchorButton>
          </Collapse>
        </div>
      );
    }
    else {
      this.configureDesktopMenu();
    }

    return this.menu;
  }

}
