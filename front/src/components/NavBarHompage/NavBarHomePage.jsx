import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

import './NavBarHomePage.css';

const NavBarHomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    localStorage.removeItem("tSoEkCeRnT");
  }


  return (
    <div className="mb-5">
      <Navbar color="dark" light expand="md">
        <NavbarBrand className="text-light" href="/">LapSteelator</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem><NavLink></NavLink></NavItem>
            <NavItem><NavLink></NavLink></NavItem>
          </Nav>

          <NavbarText>
            <Nav className="mr-auto" navbar>
                <NavItem>
                <NavLink className="text-light" href="/Home">accueil</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="text-light" href="/profile">mon profil</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="logout text-light" href="/" onClick={logout}>se déconnecter</NavLink>
                </NavItem>
            </Nav>
          </NavbarText>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarHomePage;
