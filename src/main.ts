import { emit, on, showUI } from '@create-figma-plugin/utilities';
import {
  ComponentTargetHandler,
  FindComponents,
  IComponent,
  MatchingComponents,
  ReplaceProperties,
  ResizeWindowHandler,
} from './types';

const searchPage = (): SceneNode[] => {
  return figma.currentPage.findAll((node) => node.type === 'COMPONENT');
};

let matchingComps: IComponent[] = [];

const findMatchingComponents = (searchKey: string) => {
  matchingComps = [];
  const nodes = searchPage();

  nodes.forEach((node) => {
    if (
      node.parent &&
      (node.parent.type === 'COMPONENT' || node.parent.type === 'COMPONENT_SET')
    ) {
      const properties = node.name.split(', ');
      const matchedProps = properties.filter((prop) =>
        prop.toLowerCase().includes(searchKey.toLowerCase())
      );

      if (matchedProps.length > 0) {
        const component = {
          name: node.name,
          id: node.id,
          matchedProps: matchedProps.map((prop) => prop.split('=')[0]),
          node,
          parent: {
            id: node.parent.id,
            name: node.parent.name,
          },
        };
        matchingComps.push(component);
      }
    }
  });
};

const handleReplace = (
  searchKey: string,
  replacement: string,
  components: IComponent[]
) => {
  components.forEach((comp) => {
    const properties = comp.name.split(', ');

    const newProperties = properties.map((prop) => {
      const [key, value] = prop.split('=');

      if (key.includes(searchKey)) {
        const newKey = key.replace(new RegExp(searchKey, 'gi'), replacement);
        return `${newKey}=${value}`;
      }

      return prop;
    });

    const node = figma.getNodeById(comp.node.id);
    if (node) node.name = newProperties.join(', ');
  });

  figma.notify('Replacement complete');
};

export default function () {
  showUI({ width: 320, height: 320 });
  on<ReplaceProperties>(
    'REPLACE_PROPERTIES',
    (searchKey, replacement, components) => {
      handleReplace(searchKey, replacement, components);
    }
  );

  on<FindComponents>('FIND_COMPONENTS', (searchKey) => {
    findMatchingComponents(searchKey);
    emit<MatchingComponents>('MATCHING_COMPONENTS', matchingComps);
  });

  on<ComponentTargetHandler>('TARGET_COMPONENT', (parentId) => {
    const node = figma.getNodeById(parentId);
    if (node && (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET')) {
      figma.currentPage.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
    }
  });

  on<ResizeWindowHandler>(
    'RESIZE_WINDOW',
    (windowSize: { width: number; height: number }): void => {
      const { width, height } = windowSize;
      figma.ui.resize(width, height);
    }
  );
}
