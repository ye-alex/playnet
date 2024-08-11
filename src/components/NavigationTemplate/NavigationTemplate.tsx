import React, { FC, ReactNode } from 'react';
import { joinStrings } from '../../utils/string';
import { Footer } from '../Footer';
import { Header } from '../Header';
import './NavigationTemplate.scss';

interface Props {
  className?: string;
  children: ReactNode;
}

export const NavigationTemplate: FC<Props> = ({ children, className }) => {
  return (
    <div className={joinStrings(['navigation-template', className])}>
      <Header />
      {children}
      <Footer />
      <div className="navigation-template__contact">
        <p>
          CONTACT <strong>Playnet Interactive</strong>
        </p>
        <p className="navigation-template__email">hello@playnetinteractive.com</p>
      </div>
      <p className="navigation-template__license">©Playnet Interactive 2024</p>
    </div>
  );
};
