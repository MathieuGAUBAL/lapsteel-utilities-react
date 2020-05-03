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

const NavBarVitrine = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
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
                <NavLink className="text-light" href="/Login">Se connecter</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="text-light" href="/Signin">Ouvrir un compte</NavLink>
                </NavItem>
            </Nav>
          </NavbarText>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarVitrine;
