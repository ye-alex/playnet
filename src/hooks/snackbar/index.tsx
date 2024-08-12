import { useEffect, useState } from 'react';

export type SnackTypes = 'error' | 'warning' | 'info' | 'success';
export type SnackStateProps = {
  /**
   * Function returning a react node to use as the action.
   */
  action?: (snack: SnackStateProps) => React.ReactNode;
  /**
   * Amount of time (in milliseconds)
   * the snack will be displayed in an open state. Set to 0 to require a users dismissal.
   */
  displayTime?: number;
  /**
   * Animation time (in milliseconds) for in and out animations. Set to 0 for no animations, also disables dragging.
   */
  animationTime?: number;
  /**
   * Used to identify the snack in the state.
   */
  snackId?: number;
  /**
   * Determines the snack theme, defaults to 'light'. Out of the box it supports 'light' or 'dark'.
   */
  theme?: string;
  /**
   * Determines the message to show.
   * For static message, pass string
   * For dynamic message, pass react component
   */
  message?: string | React.ReactNode;
  /**
   * Determines the icon to display.
   */
  type?: SnackTypes;
  /**
   * If false user cannot dismiss snackbar.
   */
  isDismissible?: boolean;
  /**
   * Determines component/journey trigger for snackbar.
   * Usecases: show a snackbar only once per game tiles click
   */
  displayFrom?: string;
};

type Subscriber = () => void;
class SnackState {
  snacks: SnackStateProps[];
  subscribers: Subscriber[];

  constructor(snacks: SnackStateProps[] = []) {
    this.snacks = snacks;
    this.subscribers = [];
  }

  getSnacks(): SnackStateProps[] {
    return this.snacks;
  }

  setSnacks(newSnacks: SnackStateProps[]): void {
    if (this.getSnacks() === newSnacks) {
      return;
    }

    this.snacks = newSnacks;

    // Notify subscribers that the global state has changed
    this.subscribers.forEach((subscriber: Subscriber) => {
      subscriber();
    });
  }

  subscribe(itemToSubscribe: Subscriber): void {
    if (this.subscribers.indexOf(itemToSubscribe) > -1) {
      return; // Already subsribed
    }

    this.subscribers.push(itemToSubscribe);
  }

  unsubscribe(itemToUnsubscribe: Subscriber): void {
    this.subscribers = this.subscribers.filter((subscriber: Subscriber) => subscriber !== itemToUnsubscribe);
  }

  addSnack(snackProps: SnackStateProps): SnackStateProps {
    const snack = {
      ...snackProps,
    };

    // Generate the next available snack id
    snack.snackId = this.snacks.length ? Math.max(...this.snacks.map((s: SnackStateProps) => s.snackId || 0)) + 1 : 1;

    this.setSnacks(this.snacks.concat([snack]));

    return snack;
  }

  removeSnack(snackId: SnackStateProps['snackId']): void {
    this.setSnacks(this.snacks.filter((s: SnackStateProps) => s.snackId !== snackId));
  }
}

const snackState = new SnackState();

type UseSnackbar = {
  snacks: SnackStateProps[];
  addSnack: (snackProps: Omit<SnackStateProps, 'snackId'>) => void;
  removeSnack: (snackId: SnackStateProps['snackId']) => void;
};

export function useSnackbar(requiresSnacks = false): UseSnackbar {
  const [, setState] = useState<Record<string, unknown>>();
  const snacks = snackState.getSnacks();

  // This will be called when the snack state changes and force a render
  function reRender(): void {
    setState({});
  }

  // Prevent subscribing when no snack data is used
  if (requiresSnacks) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // Subscribe to a global state when a component mounts
      snackState.subscribe(reRender);

      return () => {
        // Unsubscribe from a global state when a component unmounts
        snackState.unsubscribe(reRender);
      };
    });
  }

  function addSnack(snackProps: Omit<SnackStateProps, 'snackId'>): SnackStateProps {
    return snackState.addSnack(snackProps);
  }

  function removeSnack(snackId: SnackStateProps['snackId']): void {
    snackState.removeSnack(snackId);
  }

  return { snacks, addSnack, removeSnack };
}
