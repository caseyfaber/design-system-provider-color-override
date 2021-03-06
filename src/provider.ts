import {
  FASTButton,
  FASTTreeItem,
  FASTTreeView,
  createColorPalette,
  FASTDesignSystemProvider,
  parseColorString,
  FASTDivider,
} from '@microsoft/fast-components';
import { css } from '@microsoft/fast-element';
import {
  defineDesignSystemProvider,
  designSystemProperty,
  DesignSystemProviderTemplate as template,
  display,
} from '@microsoft/fast-foundation';

FASTButton;
FASTDesignSystemProvider;
FASTTreeItem;
FASTTreeView;
FASTDivider;

@defineDesignSystemProvider({
  name: 'my-design-system-provider',
  template,
  styles: css`
    ${display('block')} :host {
      --body-font: 'Segoe UI';
    }
  `,
})
export class MyDesignSystemProvider extends FASTDesignSystemProvider {
  @designSystemProperty({
    default: createColorPalette(parseColorString('#FF0000')),
  })
  neutralPalette: any;
}
