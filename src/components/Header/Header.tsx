import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon } from '../../assets/SVG/close';
import { HamburgerIcon } from '../../assets/SVG/hamburger-menu';
import Logo from '../../assets/SVG/pn-logo.svg';
import { ROUTES } from '../../costants/routes';
import { joinStrings } from '../../utils/string';
import { Navigation } from '../Navigation';
import { IconButton } from '../shared/IconButton/IconButton';
import { Social } from '../Social';
import './Header.scss';

interface Props {
  title: string;
  description: string;
}

export const Header: FC<Props> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <nav className={joinStrings(['header__nav', isOpen && 'header__nav--open'])}>
        <div className="header__left">
          <IconButton
            size="x-large"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="header-menu"
            onClick={toggleIsOpen}
            color="inherit"
          />
          <Navigation />
        </div>
        <div className="header__logo-wrapper">
          <Link to={ROUTES.HOME} className="header__logo">
            <img src={Logo} alt="logo" />
          </Link>
          <div className="header__title">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>
        <div className="header__right">
          <Social />
        </div>
      </nav>
    </header>
  );
};
