import React, { Component } from 'react';
import { Navbar, NavbarGroup, AnchorButton, Popover, Menu, MenuItem, Position, PopoverInteractionKind } from '@blueprintjs/core';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.userDropdown =
      <Menu>
        <MenuItem text="Settings" iconName="cog" href="/" shouldDismissPopover={false} />
        <MenuItem text="Logout" iconName="log-out" href="/" shouldDismissPopover={false} />
      </Menu>;
  }

  render() {
    return (
      <div className="heading">
        <Navbar>
          <NavbarGroup>
            <AnchorButton href="/" className="pt-minimal" iconName="home">Home</AnchorButton>
          </NavbarGroup>
          <NavbarGroup align="right">
            <Popover content={this.userDropdown} position={Position.BOTTOM} interactionKind={PopoverInteractionKind.HOVER} hoverOpenDelay={0} hoverCloseDelay={150}>
              <AnchorButton className="pt-minimal" iconName="user">User</AnchorButton>
            </Popover>
          </NavbarGroup>
        </Navbar>
      </div>
    );
  }

}
