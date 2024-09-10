import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import logo from '../assets/aplogo.jpg'; 

function NavigationBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" {...args}>
        <NavbarBrand href="/">
        <img
            src={logo}
            alt="Logo"
            style={{ height: '100px', width: 'auto' }}  // Adjust size as needed
          />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                Create
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                View
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.aksharpaaul.org/">
                Website
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://www.aksharpaaul.org/">
                About
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Profile</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
