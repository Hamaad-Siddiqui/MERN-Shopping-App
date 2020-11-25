import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as MessengerIcon } from "../../assets/icons/messenger.svg";
import { ReactComponent as CaretIcon } from "../../assets/icons/caret.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as CogIcon } from "../../assets/icons/cog.svg";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "../../assets/icons/arrow.svg";
import { ReactComponent as BoltIcon } from "../../assets/icons/bolt.svg";
import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { showPopup } from "../../redux/actions/popup";
import { useDispatch } from "react-redux";

import "../../style/css/Navbar.css";

const Logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  window.location.reload();
};

function TheNav(props) {
  const dispatch = useDispatch();
  return (
    <Navbar name={props.name}>
      {props.name ? (
        <NavItem
          icon={
            <PlusIcon
              onClick={() => {
                dispatch(showPopup());
              }}
            />
          }
        />
      ) : (
        ""
      )}
      {props.name ? <NavItem icon={<BellIcon />} /> : ""}
      {props.name ? <NavItem icon={<MessengerIcon />} /> : ""}
      <NavItem icon={<CaretIcon />}>
        <DropdownMenu name={props.name}></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {props.name ? (
          <li className={"name"}> {props.name}</li>
        ) : (
          <li className={"name"}>
            <Link to="/login">Login </Link>/<Link to="/signup"> Register</Link>
          </li>
        )}
        {props.children}
      </ul>
    </nav>
  );
}
function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  // const [allowed, setAllowed] = useState(false);
  // if (props.name != null) setAllowed(true);
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  function DropdownLogout(props) {
    return (
      <a href="#" className="menu-item" onClick={() => Logout(props.stateOrig)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<UserIcon />}>
            {props.name ? "My Profile" : "Guest"}
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="animals"
          >
            Animals
          </DropdownItem>
          {props.name ? (
            <DropdownLogout leftIcon={<LogoutIcon />}>Logout</DropdownLogout>
          ) : (
            ""
          )}
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Settings</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Settings</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>About</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "animals"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default TheNav;
