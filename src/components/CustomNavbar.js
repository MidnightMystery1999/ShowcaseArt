import {NavLink as ReactLink, useNavigate} from 'react-router-dom';
import React, { useState , useEffect} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { isLoggedIn, getCurrentUser, doLogout } from '../Auth';
import { toast } from 'react-toastify';
import {ProfileInfo} from '../pages/user-routes/ProfileInfo';


const CustomNavbar=()=>{

  let navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [login,setLogin] = useState(false);
  const [user,setUser] = useState(undefined);

  useEffect(()=>{
    setLogin(isLoggedIn());
    setUser(getCurrentUser());
  },[login]);

  const logOut=()=>{
    doLogout(()=>{
      setLogin(false);
      navigate("/");
      toast.success("Logged Out Successfully");
    });
  }


  return (
    <div>
      <Navbar 
        // color='dark'
        dark
        expand='sm'
        fixed='top'
        id='navbar'
      >
        <NavbarBrand >ShowCase ArT</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/">Feed</NavLink>
            </NavItem>
            
            {/* <NavItem>
              <NavLink tag={ReactLink} to="/login">
                Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/register">
                Register
              </NavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/about">About</DropdownItem>
                <DropdownItem>Contact US</DropdownItem>
                
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {/* When logged in */}
            {
              login && (
                <>
                <NavItem >
                  <NavLink tag={ReactLink} to="/user/profile">
                    Profile Info
                  </NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">
                    {user.email}
                  </NavLink>
                </NavItem>

                <NavItem onClick={logOut}>
                  <NavLink>
                    Logout
                  </NavLink>
                </NavItem>
                </>
                
              )
            }
            {/* When Logged Out */}
            {
              !login && (
                <>
                <NavItem>
                  <NavLink tag={ReactLink} to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={ReactLink} to="/register">
                    Register
                  </NavLink>
                </NavItem>
                </>
              )
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;