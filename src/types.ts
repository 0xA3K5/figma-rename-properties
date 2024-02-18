import { EventHandler } from '@create-figma-plugin/utilities';

export interface IComponent {
  id: string;
  name: string;
  parent?: {
    id: string;
    name: string;
  };
  isSet?: boolean;
  matchedProps: string[];
  node: SceneNode;
}

export interface ReplaceProperties extends EventHandler {
  name: 'REPLACE_PROPERTIES';
  handler: (
    searchKey: string,
    replace: string,
    components: IComponent[]
  ) => void;
}

export interface MatchingComponents extends EventHandler {
  name: 'MATCHING_COMPONENTS';
  handler: (components: IComponent[]) => void;
}

export interface FindComponents extends EventHandler {
  name: 'FIND_COMPONENTS';
  handler: (searchKey: string) => void;
}
