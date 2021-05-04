import { customElement } from '@microsoft/fast-element';
import { TreeViewTemplate as template } from './tree-view.template';
import { TreeViewStyles as styles } from './tree-view.styles';
import { TreeView } from './tree-view';

/**
 * The FAST tree view Custom Element. Implements, {@link @microsoft/fast-foundation#TreeView}
 * {@link @microsoft/fast-foundation#TreeViewTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tree-view\>
 *
 */
@customElement({
  name: 'my-tree-view',
  template,
  styles,
})
export class MyTreeView extends TreeView {}
