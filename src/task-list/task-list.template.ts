import { html, ref, slotted } from '@microsoft/fast-element';

import type { ViewTemplate } from '@microsoft/fast-element';
import type { TaskList } from '.';

export const TaskListTemplate: ViewTemplate<TaskList> = html`
  <template
    role="list"
    ${ref('taskList')}
    @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
    @focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
  >
    <slot ${slotted('slottedTaskItems')}></slot>
  </template>
`;
