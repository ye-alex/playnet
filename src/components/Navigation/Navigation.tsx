import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.scss';

export const Navigation: FC = () => {
  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
};
