import { attr, customElement, DOM, FASTElement, observable } from '@microsoft/fast-element';
import { isHTMLElement, keyCodeEnd, keyCodeHome } from '@microsoft/fast-web-utilities';

import { isTaskItemElement, TaskItem } from '../task-item';
import { TaskListStyles as styles } from './task-list.styles';
import { TaskListTemplate as template } from './task-list.template';

@customElement({
  name: 'my-task-list',
  template,
  styles,
})
export class TaskList extends FASTElement {
  public taskList!: HTMLElement;

  @observable currentSelected: HTMLElement | TaskItem | null;

  @observable slottedTaskItems: HTMLElement[];

  private slottedTaskItemsChanged(oldValue, newValue): void {
    if (this.$fastController.isConnected) {
      // filter the task items until that's done for us in the framework
      this.resetItems();
      this.taskItems = this.getVisibleNodes();
      this.setItems();
    }
  }

  private taskItems: HTMLElement[];

  public handleBlur = (e: FocusEvent): void => {
    const { relatedTarget, target } = e;

    /**
     * Clean up previously focused item's tabindex if we've moved to another item in the task list
     */
    if (relatedTarget instanceof HTMLElement && target instanceof HTMLElement && this.contains(relatedTarget)) {
      target.removeAttribute('tabindex');
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();
    this.taskItems = this.getVisibleNodes();

    DOM.queueUpdate(() => {
      //only supporting single select
      const node: HTMLElement | null = this.taskList.querySelector("[aria-selected='true']");
      if (node) {
        this.currentSelected = node;
      }
    });
  }

  public handleKeyDown = (e: KeyboardEvent): void | boolean => {
    if (!this.taskItems) {
      return true;
    }

    switch (e.keyCode) {
      case keyCodeHome:
        if (this.taskItems && this.taskItems.length) {
          TaskItem.focusItem(this.taskItems[0]);
        }
        break;
      case keyCodeEnd:
        if (this.taskItems && this.taskItems.length) {
          TaskItem.focusItem(this.taskItems[this.taskItems.length - 1]);
        }
        break;
      default:
        return true;
    }
  };

  private setItems = (): void => {
    const focusIndex = this.taskItems.findIndex(this.isFocusableElement);

    for (let item: number = 0; item < this.taskItems.length; item++) {
      if (item === focusIndex && !this.taskItems[item].hasAttribute('disabled')) {
        this.taskItems[item].setAttribute('tabindex', '0');
      }
      this.taskItems[item].addEventListener('selected-change', this.handleItemSelected);
    }
  };

  private resetItems = (): void => {
    for (let item: number = 0; item < this.taskItems.length; item++) {
      this.taskItems[item].removeEventListener('selected-change', this.handleItemSelected);
    }
  };

  private handleItemSelected = (e: CustomEvent): void => {
    const newSelection: HTMLElement = e.target as HTMLElement;
    if (newSelection !== this.currentSelected) {
      if (this.currentSelected) {
        (this.currentSelected as HTMLElement).removeAttribute('selected');
      }
      this.currentSelected = newSelection;
    }
  };

  /**
   * check if the item is focusable
   */
  private isFocusableElement = (el: Element): el is HTMLElement => {
    return isTaskItemElement(el) && !this.isDisabledElement(el);
  };

  /**
   * check if the item is disabled
   */
  private isDisabledElement = (el: Element): el is HTMLElement => {
    return isTaskItemElement(el) && el.getAttribute('aria-disabled') === 'true';
  };

  private getVisibleNodes(): HTMLElement[] {
    const taskItems: HTMLElement[] = [];
    if (this.slottedTaskItems !== undefined) {
      this.slottedTaskItems.forEach((item: any) => {
        if (isTaskItemElement(item)) {
          taskItems.push(item as any);
        }
      });
    }
    return taskItems;
  }
}
