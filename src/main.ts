import { on, showUI } from '@create-figma-plugin/utilities';

function handleFindAndReplace(searchKey: string, replace: string) {
  const nodes = figma.currentPage.findAll(
    (node) => node.type === 'COMPONENT' || node.type === 'COMPONENT_SET'
  );

  nodes.forEach((node) => {
    const properties = node.name.split(', ');

    const newProperties = properties.map((prop) => {
      const [key, value] = prop.split('=');
      if (key === searchKey) {
        return `${replace}=${value}`;
      }
      figma.notify(`no property name ${searchKey}`);
      return prop;
    });

    // eslint-disable-next-line no-param-reassign
    node.name = newProperties.join(', ');
  });
}

export default function () {
  showUI({ width: 240, height: 180 });
  on('REPLACE_PROPERTIES', handleFindAndReplace);
}
