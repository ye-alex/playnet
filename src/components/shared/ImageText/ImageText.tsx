import React, { FC } from 'react';
import { joinStrings } from '../../../utils/string';
import './ImageText.scss';

interface Props {
  title: string;
  coloredTitle: string;
  description: string;
  imgSrc: string;
  isReverse?: boolean;
}

export const ImageText: FC<Props> = ({ title, coloredTitle, description, imgSrc, isReverse }) => {
  return (
    <div className="image-text">
      <div className={joinStrings(['image-text__text-content', isReverse && 'image-text__text-content--reverse'])}>
        <h2>
          {title} <span className="image-text__highlight">{coloredTitle}</span>
        </h2>
        <p>{description}</p>
      </div>
      <div className={joinStrings(['image-text__image-content', isReverse && 'image-text__image-content--reverse'])}>
        <img src={imgSrc} alt="service-img" />
      </div>
    </div>
  );
};
