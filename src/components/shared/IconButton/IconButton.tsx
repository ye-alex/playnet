import React, { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';
import './IconButton.scss';
import { joinStrings } from '../../../utils/string';

export type IconButtonSize = 'small' | 'medium' | 'large' | 'x-large' | 'inherit';
export type IconButtonColor = 'default' | 'primary' | 'accent' | 'inherit';

export type IconButtonProps = {
  /**
   * Required. Which icon to render in the button. Should utilise the Icon component.
   */
  icon: ReactNode;
  /**
   * Required. Used to describe the icon button's function to screen reader users.
   */
  'aria-label': string;
  /**
   * Optional, defaults to medium. Sets the size of the icon
   */
  size?: IconButtonSize;
  /**
   * Optionally disable the button.
   *
   * This is provided by ComponentProps but it's added to note that it will
   * use the aria-disabled attribute rather than using HTMLButtonElement.disable
   * for better accessibility.
   */
  disabled?: boolean;
  /**
   * Optionally customize the colour. Defaults to 'default' which is a standard grey.
   */
  color?: IconButtonColor;
} & ComponentPropsWithRef<'button'>;

/**
 * A component used to render a button containing an icon and no text, e.g. a modal close button.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = 'medium', disabled = false, color = 'default', onClick, ...props }, ref) => {
    return (
      <button
        {...props}
        className={joinStrings([
          `icon-button icon-button--${size}`,
          `icon-button--color-${color}`,
          disabled && 'icon-button--disabled',
        ])}
        {...(!disabled && onClick ? { onClick } : {})}
        aria-disabled={disabled}
        ref={ref}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
