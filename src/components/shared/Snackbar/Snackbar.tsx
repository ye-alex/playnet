import React, { ComponentPropsWithoutRef, Fragment, FunctionComponent } from 'react';
import { useSnackbar } from '../../../hooks/snackbar';
import { createPortal } from 'react-dom';
import { joinStrings } from '../../../utils/string';
import { Snack, SnackProps } from './Snack/Snack';
import './Snackbar.scss';

export type SnackbarProps = {
  /**
   * Maximum number of snacks to show at one time.
   */
  maxSnacks?: number;
} & ComponentPropsWithoutRef<'div'>;

/**
 * Adds a snackbar notification area to the site which listens to a global state.
 *
 * ## Example
 *
 * ```tsx
 * <Snackbar />
 * ```
 */
export const Snackbar: FunctionComponent<SnackbarProps> = ({ className, maxSnacks = 5, ...props }) => {
  const { snacks } = useSnackbar(true);

  return snacks.length ? (
    <Fragment>
      {createPortal(
        <div role="region" aria-live="polite" className={joinStrings(['snackbar', className, false])} {...props}>
          {snacks.slice(0, maxSnacks).map((snack: SnackProps) => (
            <Snack key={snack.snackId} {...snack}>
              {snack.message}
            </Snack>
          ))}
        </div>,
        document.body
      )}
    </Fragment>
  ) : null;
};
