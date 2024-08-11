import React, { FC } from 'react';
import './IconText.scss';

interface Props {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}

export const IconText: FC<Props> = ({ imgAlt, imgSrc, title, description }) => {
  return (
    <div className="icon-text">
      <img className="icon-text__img" src={imgSrc} alt={imgAlt} />
      <div>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};
