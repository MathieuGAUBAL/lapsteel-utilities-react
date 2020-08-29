import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

import './NavBarHomePage.css';

const NavBarHomePage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);



  return (
    <div className="mb-5">
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark"  expand="md">
        
        <Link className="text-light" to="/" style={{ textDecoration: "none" }}>
          <img src="/images/lapsteelManV4.png" alt="logo lapsteelator" style={{ width: "100px" }}/>
        </Link>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem><NavLink></NavLink></NavItem>
            <NavItem><NavLink></NavLink></NavItem>
          </Nav>

          <NavbarText>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className="text-light" to="/Home" style={{ textDecoration: "none" }}><p style={{ fontSize: "1.5rem" }}>Accueil</p></Link>
              </NavItem>
            </Nav>
          </NavbarText>

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarHomePage;
