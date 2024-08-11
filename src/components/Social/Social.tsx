import React, { FC } from 'react';
import { LinkedinIcon } from '../../assets/SVG/social-linkedin';
import { WhatsIcon } from '../../assets/SVG/social-whats';
import { XIcon } from '../../assets/SVG/social-x';
import './Social.scss';

export const Social: FC = () => {
  return (
    <div className="social">
      <a href="https://x.com/" className="social__link" target="_blank" rel="noreferrer">
        <XIcon />
      </a>
      <a href="https://www.linkedin.com/" className="social__link" target="_blank" rel="noreferrer">
        <LinkedinIcon />
      </a>
      <a href="https://www.whatsapp.com/" className="social__link" target="_blank" rel="noreferrer">
        <WhatsIcon />
      </a>
    </div>
  );
};
