import React, { Component } from 'react';
import { Navbar, NavbarGroup, AnchorButton, Popover, Menu, MenuItem, Position, PopoverInteractionKind } from '@blueprintjs/core';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.userDropdown =
      <Menu>
        <MenuItem text="Settings" iconName="cog" href="/profile" shouldDismissPopover={false} />
        <MenuItem text="Logout" iconName="log-out" href="/logout" shouldDismissPopover={false} />
      </Menu>;

    this.rightSide = null;
    const auth = false;
    if (auth) {
      this.rightSide =
        <NavbarGroup align="right">
          <Popover content={this.userDropdown} position={Position.BOTTOM}
                   interactionKind={PopoverInteractionKind.HOVER}
                   hoverOpenDelay={0} hoverCloseDelay={150}>
            <AnchorButton className="pt-minimal" iconName="user" rightIconName="caret-down">User</AnchorButton>
          </Popover>
        </NavbarGroup>;
    }
    else {
      this.rightSide =
        <NavbarGroup align="right">
          <AnchorButton href="/login" className="pt-minimal" iconName="log-in">Login</AnchorButton>
          <AnchorButton href="/register" className="pt-minimal" iconName="new-person">Register</AnchorButton>
        </NavbarGroup>;
    }
  }

  render() {
    return (
      <div className="heading">
        <Navbar>
          <NavbarGroup>
            <AnchorButton href="/" className="pt-minimal" iconName="home">Home</AnchorButton>
          </NavbarGroup>
          { this.rightSide }
        </Navbar>
      </div>
    );
  }

}
