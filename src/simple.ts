import {
  FASTElement,
  customElement,
  attr,
  css,
  html
} from "@microsoft/fast-element";

import { neutralFillRestBehavior } from "@microsoft/fast-components";
import { display } from "@microsoft/fast-foundation";

const styles = css`
  ${display("block")} :host {
    background: ${neutralFillRestBehavior.var};
  }
`.withBehaviors(neutralFillRestBehavior);

const template = html<MyTag>`<div>
  <h2><slot></slot></h2>
</div>`;

@customElement({
  name: "my-tag",
  template,
  styles
})
export class MyTag extends FASTElement {}
