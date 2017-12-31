import React, { Component } from 'react';
import { Navbar, NavbarGroup, AnchorButton, Popover, Menu, MenuItem, Position, PopoverInteractionKind, Button, Collapse } from '@blueprintjs/core';
import { Container } from 'semantic-ui-react';
import utils from '../lib/utils';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: null,
      isOpen: false
    }

    this.configureDesktopMenu = this.configureDesktopMenu.bind(this);
    this.configureMobileMenu = this.configureMobileMenu.bind(this);
  }

  componentWillMount() {
    utils.isLoggedIn((loggedIn) => {
      this.setState({ isLoggedIn: loggedIn });
    });
  }

  configureDesktopMenu() {
    let userDropdown =
      <Menu>
        <MenuItem text='Settings' iconName='cog' href='/profile' shouldDismissPopover={false} />
        <MenuItem text='Logout' iconName='log-out' href='/logout' shouldDismissPopover={false} />
      </Menu>;

    let rightSide = null;
    if (this.state.isLoggedIn !== null) {
      if (this.state.isLoggedIn) {
        rightSide =
          <NavbarGroup align='right'>
            <Popover content={userDropdown} position={Position.BOTTOM}
                     interactionKind={PopoverInteractionKind.HOVER}
                     hoverOpenDelay={0} hoverCloseDelay={150}>
              <AnchorButton className='pt-minimal' iconName='user' rightIconName='caret-down'>Account</AnchorButton>
            </Popover>
          </NavbarGroup>;
      }
      else {
        rightSide =
          <NavbarGroup align='right'>
            <AnchorButton href='/login' className='pt-minimal' iconName='log-in'>Login</AnchorButton>
            <AnchorButton href='/register' className='pt-minimal' iconName='new-person'>Register</AnchorButton>
          </NavbarGroup>;
      }
    }

    this.menu = (
      <div className='heading'>
        <Navbar>
          <Container>
            <NavbarGroup>
              <AnchorButton href='/' className='pt-minimal' iconName='home'>Home</AnchorButton>
            </NavbarGroup>
            { rightSide }
          </Container>
        </Navbar>
      </div>
    );
  }

  configureMobileMenu() {
    let items = null;
    if (this.state.isLoggedIn) {
      items =
        <Collapse isOpen={this.state.isOpen}>
          <AnchorButton href='/' className='pt-minimal'>Home</AnchorButton>
          <AnchorButton href='/profile' className='pt-minimal'>Profile</AnchorButton>
          <AnchorButton href='/logout' className='pt-minimal'>Logout</AnchorButton>
        </Collapse>;
    }
    else {
      items =
        <Collapse isOpen={this.state.isOpen}>
          <AnchorButton href='/' className='pt-minimal'>Home</AnchorButton>
          <AnchorButton href='/login' className='pt-minimal'>Login</AnchorButton>
          <AnchorButton href='/register' className='pt-minimal'>Register</AnchorButton>
        </Collapse>;
    }

    this.menu = (
      <div className='heading'>
        <Navbar>
          <div className='container'>
            <NavbarGroup align='right'>
              <Button onClick={() => this.setState({ isOpen: !this.state.isOpen })} className='pt-minimal' iconName='menu'></Button>
            </NavbarGroup>
          </div>
        </Navbar>
        <div className='container'>
          { items }
        </div>
      </div>
    );
  }

  render() {
    if (utils.isMobile())
      this.configureMobileMenu();
    else
      this.configureDesktopMenu();

    return this.menu;
  }

}
