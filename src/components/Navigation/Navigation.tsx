import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Navigation: FC = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/services">Services</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
};
