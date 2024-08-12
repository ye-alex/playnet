import React, { FC, ReactNode } from 'react';
import { joinStrings } from '../../utils/string';
import { Footer } from '../Footer';
import { Header } from '../Header';
import './NavigationTemplate.scss';

interface Props {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}

export const NavigationTemplate: FC<Props> = ({ children, title, description, className }) => {
  return (
    <div className={joinStrings(['navigation-template', className])}>
      <Header title={title} description={description} />
      {children}
      <Footer />
      <div className="navigation-template__contact">
        <p>
          CONTACT <strong>Playnet Interactive</strong>
        </p>
        <a href="mailto:hello@playnetinteractive.com" className="navigation-template__email">
          hello@playnetinteractive.com
        </a>
      </div>
      <p className="navigation-template__license">©Playnet Interactive 2024</p>
    </div>
  );
};
