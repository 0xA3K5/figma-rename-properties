import { EventHandler } from '@create-figma-plugin/utilities';

export interface ReplaceProperties extends EventHandler {
  name: 'REPLACE_PROPERTIES';
  handler: (searchKey: string, replace: string) => void;
}
