import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../costants/routes';
import { joinStrings } from '../../../utils/string';
import './GetInTouchButton.scss';

interface Props {
  className?: string;
}

export const GetInTouchButton: FC<Props> = ({ className }) => {
  return (
    <Link className={joinStrings(['get-in-touch', className])} to={ROUTES.CONTACT}>
      Get in touch
    </Link>
  );
};
