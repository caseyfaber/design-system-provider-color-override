import { attr, customElement, FASTElement, Notifier, observable, Observable } from '@microsoft/fast-element';
import { applyMixins, StartEnd } from '@microsoft/fast-foundation';
import {
  getDisplayedNodes,
  isHTMLElement,
  keyCodeArrowDown,
  keyCodeArrowLeft,
  keyCodeArrowRight,
  keyCodeArrowUp,
  keyCodeEnter,
} from '@microsoft/fast-web-utilities';

import { TaskItemStyles as styles } from './task-item.styles';
import { TaskItemTemplate as template } from './task-item.template';

/**
 * check if the item is a list item
 * @public
 * @remarks
 * determines if element is an HTMLElement and if it has the role listitem
 */
export function isTaskItemElement(el: Element): el is HTMLElement {
  return isHTMLElement(el) && (el.getAttribute('role') as string) === 'listitem';
}

@customElement({
  name: 'my-task-item',
  template,
  styles,
})
export class TaskItem extends FASTElement {
  /**
   * When true, the control will appear selected by user interaction.
   * @public
   * @remarks
   * HTML Attribute: selected
   */
  @attr selected: boolean;

  /**
   * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
   * @public
   * @remarks
   * HTML Attribute: disabled
   */
  @attr disabled: boolean;

  @observable focusable: boolean = false;

  @observable childItems: HTMLElement[];

  @observable items: HTMLElement[];

  private itemsChanged(oldValue, newValue): void {
    if (this.$fastController.isConnected) {
      this.enabledChildTaskItems = this.items.filter((item: HTMLElement) => {
        return isTaskItemElement(item) && !item.hasAttribute('disabled');
      });
    }
  }

  private notifier: Notifier;
  private enabledChildTaskItems: HTMLElement[] = [];

  private getParentTaskListNode(): HTMLElement | null | undefined {
    const parentNode: Element | null | undefined = this.parentElement!.closest("[role='list']");
    return parentNode as HTMLElement;
  }

  /**
   * @internal
   */
  public connectedCallback(): void {
    super.connectedCallback();

    const parentTaskListNode: HTMLElement | null | undefined = this.getParentTaskListNode();

    if (parentTaskListNode) {
      this.notifier = Observable.getNotifier(parentTaskListNode);
    }
  }

  /**
   * @internal
   */
  public disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /**
   * Places document focus on a task item and adds the item to the sequential tab order.
   * @param el - the element to focus
   */
  public static focusItem(el: HTMLElement) {
    el.setAttribute('tabindex', '0');
    (el as TaskItem).focusable = true;
    el.focus();
  }

  public handleChange(source: any, propertyName: string) {}

  /**
   * @deprecated - no longer needed.
   * @param e - Event object
   */
  /* eslint-disable-next-line */
  public handleFocus = (e: Event): void => {};

  /**
   * @deprecated - no longer needed.
   * @param e - Event object
   */
  /* eslint-disable-next-line */
  public handleBlur = (e: FocusEvent): void => {};

  /**
   * The keyboarding on treeview should conform to the following spec
   * https://w3c.github.io/aria-practices/#keyboard-interaction-23
   * @param e - Event object for keyDown event
   */
  public handleKeyDown = (e: KeyboardEvent): void | boolean => {
    if (e.target !== e.currentTarget) {
      return true;
    }

    switch (e.keyCode) {
      case keyCodeArrowLeft:
        this.collapseOrFocusParent();
        break;
      case keyCodeArrowDown:
        // preventDefault to ensure we don't scroll the page
        e.preventDefault();
        this.focusNextNode(1);
        break;
      case keyCodeArrowUp:
        // preventDefault to ensure we don't scroll the page
        e.preventDefault();
        this.focusNextNode(-1);
        break;
      case keyCodeEnter:
        // In single-select trees where selection does not follow focus (see note below),
        // the default action is typically to select the focused node.
        this.handleSelected(e);
        break;
    }

    return true;
  };

  public handleClick = (e: MouseEvent): void => {
    if (!e.defaultPrevented && !this.disabled) {
      this.handleSelected(e);
    }
  };

  public childItemLength(): number {
    const taskChildren: HTMLElement[] = this.childItems.filter((item: HTMLElement) => {
      return isTaskItemElement(item);
    });
    return taskChildren ? taskChildren.length : 0;
  }

  public readonly isNestedItem = (): boolean => {
    return isTaskItemElement(this.parentElement as Element);
  };

  private collapseOrFocusParent(): void {
    if (isHTMLElement(this.parentElement)) {
      const parentTaskItemNode: Element | null | undefined = this.parentElement!.closest("[role='listitem']");

      if (isHTMLElement(parentTaskItemNode)) {
        TaskItem.focusItem(parentTaskItemNode as HTMLElement);
      }
    }
  }

  private focusNextNode(delta: number): void {
    const visibleNodes: HTMLElement[] | void = this.getVisibleNodes();
    if (!visibleNodes) {
      return;
    }

    const currentIndex: number = visibleNodes.indexOf(this);
    if (currentIndex !== -1) {
      let nextElement: HTMLElement | undefined = visibleNodes[currentIndex + delta];
      if (nextElement !== undefined) {
        while (nextElement.hasAttribute('disabled')) {
          const offset: number = delta >= 0 ? 1 : -1;
          nextElement = visibleNodes[currentIndex + delta + offset];
          if (!nextElement) {
            break;
          }
        }
      }

      if (isHTMLElement(nextElement)) {
        TaskItem.focusItem(nextElement);
      }
    }
  }

  private getVisibleNodes(): HTMLElement[] | void {
    return getDisplayedNodes(this.getTaskRoot()!, "[role='listitem']");
  }

  private getTaskRoot(): HTMLElement | null {
    /* eslint-disable-next-line  @typescript-eslint/no-this-alias */
    const currentNode: HTMLElement = this;

    if (!isHTMLElement(currentNode)) {
      return null;
    }

    return currentNode.closest("[role='list']") as HTMLElement;
  }

  private handleSelected(e?: Event): void {
    this.selected = !this.selected;
    this.$emit('selected-change', e);
  }
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast-dna/issues/3317
 * @internal
 */
/* eslint-disable-next-line */
export interface TaskItem extends StartEnd {}
applyMixins(TaskItem, StartEnd);
