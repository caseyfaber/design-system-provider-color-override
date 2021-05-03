import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

export const TaskListStyles = css`
  :host([hidden]) {
    display: none;
  }

  ${display('flex')} :host {
    flex-direction: column;
    flex-grow: 1;
    align-items: stretch;
    min-width: fit-content;
    font-size: 0;
  }

  :host:focus-visible {
    outline: none;
  }
`;
