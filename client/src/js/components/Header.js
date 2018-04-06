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
  }

  componentWillMount() {
    utils.isLoggedIn((loggedIn) => {
      if (loggedIn) {
        utils.getCurrentUserInfo((success, response) => {
          this.setState({ username: response.username });
        });
      }
      this.setState({ isLoggedIn: loggedIn });
    });
  }

  render() {
    let menu = null;
    if (utils.isMobile())
      menu = this.configureMobileMenu();
    else
      menu = this.configureDesktopMenu();

    return menu;
  }

  configureDesktopMenu = () => {
    const userDropdown =
      <Menu>
        <MenuItem text='Settings' iconName='cog' href='/profile' shouldDismissPopover={false} />
        <MenuItem text='Logout' iconName='log-out' href='/logout' shouldDismissPopover={false} />
      </Menu>;

    const charDropdown =
      <Menu>
        <MenuItem text='My Characters' iconName='properties' href='/characters' shouldDismissPopover={false} />
        <MenuItem text='New Character' iconName='plus' href='/characters/new' shouldDismissPopover={false} />
      </Menu>;

    const gameDropdown =
      <Menu>
        <MenuItem text='My Games' iconName='properties' href='/games' shouldDismissPopover={false} />
        <MenuItem text='Join Game' iconName='new-person' href='/games/join' shouldDismissPopover={false} />
        <MenuItem text='New Game' iconName='plus' href='/games/new' shouldDismissPopover={false} />
      </Menu>;

    const infoDropdown =
      <Menu>
        <MenuItem text='Armor List' iconName='th' href='/info/armor' shouldDismissPopover={false} />
        <MenuItem text='Equipment List' iconName='th' href='/info/equipment' shouldDismissPopover={false} />
        <MenuItem text='Spell List' iconName='th' href='/info/spells' shouldDismissPopover={false} />
        <MenuItem text='Trinket List' iconName='th' href='/info/trinkets' shouldDismissPopover={false} />
        <MenuItem text='Weapon List' iconName='th' href='/info/weapons' shouldDismissPopover={false} />
      </Menu>;

    let rightSide = null;
    if (this.state.isLoggedIn !== null) {
      if (this.state.isLoggedIn) {
        rightSide =
          <NavbarGroup align='right'>
            <Popover content={userDropdown} position={Position.BOTTOM}
                     interactionKind={PopoverInteractionKind.HOVER}
                     hoverOpenDelay={0} hoverCloseDelay={150}>
              <AnchorButton className='pt-minimal' iconName='user' rightIconName='caret-down'>
                {this.state.username}
              </AnchorButton>
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

    return (
      <div className='heading'>
        <Navbar>
          {
            this.state.isLoggedIn === null ? null :
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
                { this.state.isLoggedIn ?
                  <Popover content={gameDropdown} position={Position.BOTTOM}
                           interactionKind={PopoverInteractionKind.HOVER}
                           hoverOpenDelay={0} hoverCloseDelay={150}>
                    <AnchorButton className='pt-minimal' rightIconName='caret-down'>Games</AnchorButton>
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
          }
        </Navbar>
      </div>
    );
  }

  configureMobileMenu = () => {
    let items = null;

    const info_menu =
      <MenuItem text='Info'>
        <MenuItem text='Armor List' href='/info/armor' />
        <MenuItem text='Equipment List' href='/info/equipment' />
        <MenuItem text='Spell List' href='/info/spells' />
        <MenuItem text='Trinket List' href='/info/trinkets' />
        <MenuItem text='Weapon List' href='/info/weapons' />
      </MenuItem>;

    if (this.state.isLoggedIn) {
      items =
        <Menu>
          <MenuItem text='Home' href='/' />
          <MenuItem text='Characters'>
            <MenuItem text='My Characters' href='/characters' />
            <MenuItem text='New Character' href='/characters/new' />
          </MenuItem>
          <MenuItem text='Games'>
            <MenuItem text='My Games' href='/games' />
            <MenuItem text='Join Game' href='/games/join' />
            <MenuItem text='New Game' href='/games/new' />
          </MenuItem>
          { info_menu }
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
          { info_menu }
        </Menu>;
    }

    return (
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

}
