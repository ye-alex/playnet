import React, { FC, ReactNode } from 'react';
import './Section.scss';
import { joinStrings } from '../../utils/string';

interface Props {
  bgUrl?: string;
  className?: string;
  children: ReactNode;
}

export const Section: FC<Props> = ({ bgUrl, className, children }) => {
  return (
    <main
      className={joinStrings(['content-section', className])}
      style={bgUrl ? { background: `url(${bgUrl})`, backgroundSize: 'cover' } : {}}
    >
      <div className="content-section__children">{children}</div>
    </main>
  );
};
