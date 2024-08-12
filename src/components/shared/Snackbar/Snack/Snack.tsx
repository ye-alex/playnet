import React, { ComponentPropsWithoutRef, FunctionComponent, useEffect, useRef, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { SnackStateProps, SnackTypes, useSnackbar } from '../../../../hooks/snackbar';
import { useDeviceInfo } from '../../../../hooks/useDeviceInfo';
import { joinStrings } from '../../../../utils/string';
import FailedIcon from '../../../../assets/SVG/error.svg';
import SuccessIcon from '../../../../assets/SVG/success.svg';
import './Snack.scss';

export type SnackProps = SnackStateProps & ComponentPropsWithoutRef<'div'>;

const getSnackIcon = (type: SnackTypes): React.ReactNode => {
  switch (type) {
    case 'error':
      return <img src={FailedIcon} alt="failed" />;
    default:
      return <img src={SuccessIcon} alt="success" />;
  }
};

function getOuterHeight<E extends HTMLElement = HTMLDivElement>(el?: E | null): number {
  if (el) {
    const { marginTop, marginBottom } = window.getComputedStyle(el);

    return (
      el.offsetHeight +
      (parseInt(marginTop) /* istanbul ignore next */ || 0) +
      (parseInt(marginBottom) /* istanbul ignore next */ || 0)
    );
  }

  return 0;
}

type UseSpringAnimation = { from: { height: string }; to: { height: string } } | Record<string, never>;

/**
 * A simple presentational snack component
 *
 * ## Example
 *
 * ```tsx
 * <Snack snackId={1} type="info">Your balance has been updated.</Snack>
 * ```
 */

export const Snack: FunctionComponent<SnackProps> = ({
  action,
  children,
  className,
  displayTime = 5000,
  animationTime = 200,
  snackId,
  theme = 'default',
  type = 'info',
  isDismissible = true,
  ...props
}) => {
  const snackRef = useRef<HTMLDivElement>(null);
  const snackContainerRef = useRef<HTMLDivElement>(null);
  const snackWidth = snackContainerRef?.current?.offsetWidth || window.innerWidth;
  const snackHeight = getOuterHeight(snackRef?.current);

  const { isMobileDevice } = useDeviceInfo();

  const { removeSnack } = useSnackbar();
  const userDismissed = displayTime === 0;
  const animate = animationTime !== 0;

  // States: in, open, out, closed
  const [displayState, setDisplayState] = useState(animate ? 'in' : 'open');
  const [delayedState, setDelayedState] = useState('none');
  const [lockState, setLockState] = useState(false);

  // Use ref to track inside setTimeout calls
  const lockStateRef = useRef(lockState);

  lockStateRef.current = lockState;

  // Handle state changes
  const stateChange = (state: string): void => {
    if (lockStateRef.current) {
      setDelayedState(state);
    } else {
      if (state === 'closed') {
        removeSnack(snackId);
      }

      setDisplayState(state);
    }
  };

  // Handle lockState changes
  const updateLockState = (lockState: boolean): void => {
    lockStateRef.current = lockState;
    setLockState(lockState);
  };

  // Handle delayed state change on mouse leave
  useEffect(() => {
    if (!lockState && delayedState !== 'none') {
      stateChange(delayedState);
      setDelayedState('none');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockState]);

  // Handle open timer
  useEffect(() => {
    if (displayState === 'open' && !userDismissed) {
      const timer = setTimeout(() => stateChange('out'), displayTime);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      // empty func required for linting
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayState]);

  // Handle mouse/touch states
  const [dragX, setDragX] = useState(0);
  const [down, setDown] = useState(false);
  const bind = useDrag(({ down, movement: [dragX] }) => {
    setDown(down);
    setDragX(dragX);
    const isClicked = !down && dragX === 0 && displayState !== 'in';
    const isDragged = animate && !down && dragX > snackWidth / 5; // Only register drags over a 5th of the size

    if ((isClicked || isDragged) && isDismissible) {
      updateLockState(false);
      stateChange(animate ? 'out' : 'closed');
    } else {
      updateLockState(down);
    }
  });

  // Snack container styles for mobile pop from bottom
  const containerAnimation = isMobileDevice
    ? {
        from: {
          height: '0px',
        },
        to: {
          height: `${snackHeight}px`,
        },
      }
    : {};
  const containerStyles = useSpring({
    ...(containerAnimation as UseSpringAnimation),
    config: { ...config.stiff, duration: animationTime },
    onRest() {
      if (displayState === 'in') {
        stateChange('open');
      }
    },
  });
  // Snack container styles for sliding in (desktop only) and out
  const snackAnimation =
    isMobileDevice && displayState === 'in'
      ? {}
      : {
          from: {
            transform: `translateX(${snackWidth}px)`,
          },
          to: {
            transform: down && dragX > 0 && animate ? `translateX(${dragX}px)` : 'translateX(0)',
          },
        };
  const snackStyles = useSpring({
    ...(snackAnimation as UseSpringAnimation),
    immediate: down,
    config: { ...config.stiff, duration: animationTime },
    reverse: displayState === 'out',
    onRest() {
      if (displayState === 'out') {
        stateChange('closed');
      } else if (displayState === 'in') {
        stateChange('open');
      }
    },
  });

  return (
    <animated.div
      {...bind()}
      data-testid={`snack-container-${displayState}-${snackId}`}
      style={isMobileDevice ? containerStyles : { height: 'auto' }}
      ref={snackContainerRef}
      className={joinStrings(['snack__container', 'snack__container--' + displayState, className])}
    >
      {children && (
        <animated.div
          ref={snackRef}
          onMouseEnter={(): void => {
            updateLockState(true);
          }}
          onMouseLeave={(): void => {
            updateLockState(false);
          }}
          style={snackStyles}
          role="alert"
          {...props}
          className={joinStrings(['snack', 'snack--' + type, 'snack--' + theme])}
        >
          <div className={joinStrings(['snack__icon', 'snack__icon--' + type, className])}>{getSnackIcon(type)}</div>
          <h4 className="snack__message">{children}</h4>
          {action && <div className="snack__action">{action(props)}</div>}
        </animated.div>
      )}
    </animated.div>
  );
};
