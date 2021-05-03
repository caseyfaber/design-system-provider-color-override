import {
  accentForegroundRestBehavior,
  heightNumber,
  neutralFillStealthActiveBehavior,
  neutralFillStealthHover,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFillStealthSelected,
  neutralFillStealthSelectedBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundHintBehavior,
  neutralForegroundRestBehavior,
} from '@fluentui/web-components';
import { css } from '@microsoft/fast-element';
import {
  cssCustomPropertyBehaviorFactory,
  DirectionalStyleSheetBehavior,
  disabledCursor,
  display,
  focusVisible,
  forcedColorsStylesheetBehavior,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';

const horizontalSpace = 'var(--design-unit) * 2px + 4px';
const itemHeight = `(3 + (${heightNumber}))`;

const ltr = css`
  :host([selected])::after {
    left: 0;
  }
`;

const rtl = css`
  :host([selected])::after {
    right: 0;
  }
`;

export const TaskItemStyles = css`
  ${display('block')} :host {
    contain: content;
    position: relative;
    outline: none;
    color: ${neutralForegroundRestBehavior.var};
    background: ${neutralFillStealthRestBehavior.var};
    cursor: pointer;
    font-family: var(--body-font);
    --tree-item-nested-width: 0;
  }

  :host {
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
    font-weight: 400;
  }

  :host(:focus) > .positioning-region {
    outline: none;
  }

  :host(:focus) .content-region {
    outline: none;
  }

  :host(:${focusVisible}) .positioning-region {
    border: ${neutralFocusBehavior.var} calc(var(--outline-width) * 1px) solid;
    border-radius: calc(var(--corner-radius) * 1px);
    color: ${neutralForegroundActiveBehavior.var};
  }

  .positioning-region {
    display: flex;
    position: relative;
    box-sizing: border-box;
    border: transparent calc(var(--outline-width) * 1px) solid;
    height: calc((${itemHeight} + 1) * 1px);
  }

  .positioning-region::before {
    content: '';
    display: block;
    width: var(--tree-item-nested-width);
    flex-shrink: 0;
  }

  .positioning-region:hover {
    background: ${neutralFillStealthHoverBehavior.var};
    color: ${accentForegroundRestBehavior.var};
  }

  .positioning-region:active {
    background: ${neutralFillStealthActiveBehavior.var};
  }

  .content-region {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    width: 100%;
    height: calc(${itemHeight} * 1px);
    margin-inline-start: calc(${horizontalSpace});
    margin-inline-end: calc(${horizontalSpace});
  }

  .items {
    display: none;
    ${
      /* Font size should be based off calc(1em + (design-unit + glyph-size-number) * 1px) -
            update when density story is figured out */ ''
    } font-size: calc(1em + (var(--design-unit) + 16) * 1px);
  }

  .content {
    flex: 1;
  }

  .start,
  .end {
    display: flex;
    fill: currentcolor;
  }

  ::slotted(svg) {
    ${
      /* Glyph size is temporary -
            replace when glyph-size var is added */ ''
    } width: 16px;
    height: 16px;
  }

  .start {
    ${
      /* need to swap out once we understand how horizontalSpacing will work */ ''
    } margin-inline-end: calc(var(--design-unit) * 2px + 2px);
  }

  .end {
    ${
      /* need to swap out once we understand how horizontalSpacing will work */ ''
    } margin-inline-start: calc(var(--design-unit) * 2px + 2px);
  }

  :host > .items {
    display: block;
  }

  :host([disabled]) .content-region {
    opacity: var(--disabled-opacity);
    cursor: ${disabledCursor};
  }

  :host([selected]) .positioning-region {
    background: ${neutralFillStealthSelectedBehavior.var};
  }

  :host([selected])::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 4px;
    height: calc(${itemHeight} * 1px);
    ${
      /* The french fry background needs to be calculated based on the selected background state for this control.
            We currently have no way of chaning that, so setting to accent-foreground-rest for the time being */ ''
    } background: ${accentForegroundRestBehavior.var};
  }

  ::slotted(enabler-task-item) {
    --tree-item-nested-width: 1em;
    color: ${neutralForegroundHintBehavior.var};
    font-size: var(--type-ramp-minus-1-font-size);
  }
`.withBehaviors(
  accentForegroundRestBehavior,
  neutralFillStealthSelectedBehavior,
  neutralFillStealthActiveBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundHintBehavior,
  neutralForegroundRestBehavior,
  new DirectionalStyleSheetBehavior(ltr, rtl),
  forcedColorsStylesheetBehavior(
    css`
      :host {
        forced-color-adjust: none;
        border-color: transparent;
        background: ${SystemColors.Field};
        color: ${SystemColors.FieldText};
      }
      :host .content-region {
        color: ${SystemColors.FieldText};
      }
      :host .content-region .start,
      :host .content-region .end {
        fill: ${SystemColors.FieldText};
      }
      :host .positioning-region:hover,
      :host([selected]) .positioning-region {
        background: ${SystemColors.Highlight};
      }
      :host .positioning-region:hover .content-region,
      :host([selected]) .positioning-region .content-region {
        color: ${SystemColors.HighlightText};
      }
      :host .positioning-region:hover .content-region .start,
      :host .positioning-region:hover .content-region .end,
      :host([selected]) .content-region .start,
      :host([selected]) .content-region .end {
        fill: ${SystemColors.HighlightText};
      }
      :host([selected])::after {
        background: ${SystemColors.Field};
      }
      :host(:${focusVisible}) .positioning-region {
        border-color: ${SystemColors.FieldText};
        box-shadow: 0 0 0 2px inset ${SystemColors.Field};
        color: ${SystemColors.FieldText};
      }
      :host([disabled]) .content-region,
      :host([disabled]) .positioning-region:hover .content-region {
        opacity: 1;
        color: ${SystemColors.GrayText};
      }
      :host([disabled]) .content-region .start,
      :host([disabled]) .content-region .end,
      :host([disabled]) .positioning-region:hover .content-region .start,
      :host([disabled]) .positioning-region:hover .content-region .end {
        fill: ${SystemColors.GrayText};
      }
      :host([disabled]) .positioning-region:hover {
        background: ${SystemColors.Field};
      }
      .start,
      .end {
        fill: ${SystemColors.FieldText};
      }
    `
  )
);
