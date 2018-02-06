import React, { Component } from 'react';
import { Navbar, NavbarGroup, AnchorButton, Popover, Menu, MenuItem, MenuDivider, Position, PopoverInteractionKind, Button } from '@blueprintjs/core';
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

    let charDropdown =
      <Menu>
        <MenuItem text='My Characters' iconName='properties' href='/characters' shouldDismissPopover={false} />
        <MenuItem text='New Character' iconName='plus' href='/characters/new' shouldDismissPopover={false} />
      </Menu>;

    let infoDropdown =
      <Menu>
        <MenuItem text='Spell List' iconName='th' href='/spells' shouldDismissPopover={false} />
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
              { this.state.isLoggedIn ?
                <Popover content={charDropdown} position={Position.BOTTOM}
                         interactionKind={PopoverInteractionKind.HOVER}
                         hoverOpenDelay={0} hoverCloseDelay={150}>
                  <AnchorButton className='pt-minimal' rightIconName='caret-down'>Characters</AnchorButton>
                </Popover>
              : null }
              <Popover content={infoDropdown} position={Position.BOTTOM}
                       interactionKind={PopoverInteractionKind.HOVER}
                       hoverOpenDelay={0} hoverCloseDelay={150}>
                <AnchorButton className='pt-minimal' rightIconName='caret-down'>Info</AnchorButton>
              </Popover>
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
        <Menu>
          <MenuItem text='Home' href='/' />
          <MenuItem text='Characters'>
            <MenuItem text='My Characters' href='/characters' />
            <MenuItem text='Create Characters' href='/characters/new' />
          </MenuItem>
          <MenuItem text='Info'>
            <MenuItem text='Spell List' href='/spells' />
          </MenuItem>
          <MenuItem text='Profile' href='/profile' />
          <MenuDivider />
          <MenuItem text='Logout' href='/logout' />
        </Menu>;
    }
    else {
      items =
        <Menu>
          <MenuItem text='Home' href='/' />
          <MenuItem text='Login' href='/login' />
          <MenuItem text='Register' href='/register' />
        </Menu>;
    }

    this.menu = (
      <div className='heading'>
        <Navbar>
          <div className='container'>
            <NavbarGroup align='right'>
              <Popover content={items} position={Position.BOTTOM_RIGHT}
                       interactionKind={PopoverInteractionKind.CLICK}>
                <Button className='pt-minimal' iconName='menu'></Button>
              </Popover>
            </NavbarGroup>
          </div>
        </Navbar>
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
