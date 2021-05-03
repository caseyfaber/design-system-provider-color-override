import { children, elements, html, ref, slotted, when } from '@microsoft/fast-element';
import { endTemplate, startTemplate } from '@microsoft/fast-foundation';

import type { ViewTemplate } from '@microsoft/fast-element';
import type { TaskItem } from './';

export const TaskItemTemplate: ViewTemplate<TaskItem> = html`
  <template
    role="listitem"
    slot="${(x) => (x.isNestedItem() ? 'item' : void 0)}"
    tabindex="${(x) => (x.disabled || !x.focusable ? void 0 : 0)}"
    class="${(x) => (x.selected ? 'selected' : '')}
            ${(x) => (x.disabled ? 'disabled' : '')}"
    aria-expanded="${(x) => (x.childItems && x.childItemLength() > 0 ? true : void 0)}"
    aria-selected="${(x) => x.selected}"
    aria-disabled="${(x) => x.disabled}"
    @keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
    @click="${(x, c) => x.handleClick(c.event as MouseEvent)}"
    ${children({
      property: 'childItems',
      filter: elements(),
    })}
  >
    <div class="positioning-region" part="positioning-region">
      <div class="content-region" part="content-region">
        ${startTemplate}
        <span class="content"><slot></slot></span>
        ${endTemplate}
      </div>
    </div>
    ${when(
      (x) => x.childItems && x.childItemLength() > 0,
      html<TaskItem>`
        <div role="group" class="items" part="items">
          <slot name="item" ${slotted('items')}></slot>
        </div>
      `
    )}
  </template>
`;
