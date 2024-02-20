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

export interface ISearchSettings {
  caseSensitive: boolean;
  matchWholeWord: boolean;
  searchScope: 'Selection' | 'Page' | 'All Pages';
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
  handler: (searchKey: string, searchSettings: ISearchSettings) => void;
}
export interface ResizeWindowHandler extends EventHandler {
  name: 'RESIZE_WINDOW';
  handler: (windowSize: { width: number; height: number }) => void;
}

export interface ComponentTargetHandler extends EventHandler {
  name: 'TARGET_COMPONENT';
  handler: (parentId: string) => void;
}
