import { customElement } from '@microsoft/fast-element';
import { TreeItemTemplate as template } from './tree-item.template';
import { TreeItemStyles as styles } from './tree-item.styles';
import { TreeItem } from './tree-item';

/**
 * The FAST tree item Custom Element. Implements, {@link @microsoft/fast-foundation#TreeItem}
 * {@link @microsoft/fast-foundation#TreeItemTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tree-item\>
 *
 */
@customElement({
  name: 'my-tree-item',
  template,
  styles,
})
export class MyTreeItem extends TreeItem {}
