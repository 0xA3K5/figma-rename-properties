// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import '!./output.css';
import {
  Button,
  Stack,
  Textbox,
  render,
  useWindowResize,
} from '@create-figma-plugin/ui';
import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { emit, on } from '@create-figma-plugin/utilities';
import {
  FindComponents,
  IComponent,
  MatchingComponents,
  ReplaceProperties,
  ResizeWindowHandler,
  ComponentTargetHandler,
  ISearchSettings,
} from './types';
import IconButton from './components/button/IconButton';
import { IconComponent, IconTarget } from './components/icons';
import HighlightedText from './components/highlighted-text/HighlightedText';
import groupByParent from './utils/group-by-parent';
import ChoiceChip from './components/chip/ChoiceChip';

function Plugin() {
  const [searchKey, setSearchKey] = useState('');
  const [replace, setReplacement] = useState('');

  const [replaceComps, setReplaceComps] = useState<IComponent[]>([]);
  const [matchingComps, setMatchingComps] = useState<Record<
    string,
    IComponent[]
  > | null>();

  const [searchSettings, setSearchSettings] = useState<ISearchSettings>({
    caseSensitive: false,
    matchWholeWord: false,
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchKey) {
        emit<FindComponents>('FIND_COMPONENTS', searchKey, searchSettings);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchKey, searchSettings]);

  on<MatchingComponents>('MATCHING_COMPONENTS', (components) => {
    const groupedComponents = groupByParent(components);
    setMatchingComps(groupedComponents);
    setReplaceComps(groupedComponents[Object.keys(groupedComponents)[0]]);

    const firstGroup = Object.values(groupedComponents)[0];
    if (firstGroup && firstGroup.length > 0) {
      emit<ComponentTargetHandler>('TARGET_COMPONENT', firstGroup[0].id);
    }
  });

  const handleReplace = (components: IComponent[]) => {
    emit<ReplaceProperties>(
      'REPLACE_PROPERTIES',
      searchKey,
      replace,
      components
    );
    emit<FindComponents>('FIND_COMPONENTS', searchKey, searchSettings);
  };

  const handleReplaceAll = () => {
    handleReplace(Object.values(matchingComps ?? {}).flat());
  };

  const handleComponentTarget = (parentId: string) => {
    emit<ComponentTargetHandler>('TARGET_COMPONENT', parentId);
  };

  const handleComponentSelect = (
    parentId: string,
    components: IComponent[]
  ) => {
    setReplaceComps(components);
    if (components.length > 0) {
      emit<ComponentTargetHandler>('TARGET_COMPONENT', parentId);
    }
  };

  function onWindowResize(windowSize: { width: number; height: number }) {
    emit<ResizeWindowHandler>('RESIZE_WINDOW', windowSize);
  }

  useWindowResize(onWindowResize, {
    maxHeight: 720,
    maxWidth: 720,
    minHeight: 320,
    minWidth: 320,
    resizeBehaviorOnDoubleClick: 'minimize',
  });

  return (
    <Fragment>
      <div
        className={`${matchingComps ? 'border-b border-border' : null} sticky inset-0 z-10 flex w-full flex-col gap-4 bg-bg p-4`}
      >
        <Stack space="small">
          <div className="flex flex-wrap gap-1">
            <ChoiceChip
              label="Case Sensitive"
              onChange={() =>
                setSearchSettings({
                  ...searchSettings,
                  caseSensitive: !searchSettings.caseSensitive,
                })
              }
            />
            <ChoiceChip
              label="Match Whole Word"
              onChange={() =>
                setSearchSettings({
                  ...searchSettings,
                  matchWholeWord: !searchSettings.matchWholeWord,
                })
              }
            />
          </div>
          <Textbox
            variant="border"
            label="Search"
            placeholder="Search"
            value={searchKey}
            onInput={(e) => setSearchKey(e.currentTarget.value)}
          />
          <Textbox
            variant="border"
            label="replacement"
            placeholder="Replace with..."
            value={replace}
            onInput={(e) => setReplacement(e.currentTarget.value)}
          />
        </Stack>
        <div className="flex gap-2">
          <Button onClick={() => handleReplace(replaceComps)} secondary>
            Replace
          </Button>
          <Button onClick={handleReplaceAll} secondary>
            Replace All
          </Button>
        </div>
      </div>
      {matchingComps && (
        <ul className="flex flex-col pt-4">
          {Object.entries(matchingComps).map(([parentId, components]) => {
            const uniqueProps = new Set(
              components.flatMap((comp) => comp.matchedProps)
            );

            return (
              <li key={parentId}>
                <button
                  type="button"
                  className={`group ${replaceComps.includes(components[0]) ? 'bg-bg-selected bg-opacity-20' : ''} flex w-full cursor-default justify-between gap-3 px-4 py-1 text-sm`}
                  onClick={() => handleComponentSelect(parentId, components)}
                >
                  <span className="flex items-start">
                    <span className="text-text-component">
                      <IconComponent />
                    </span>
                    <span className="flex flex-col items-start gap-1 py-1">
                      <span className="text-xs text-text-component">
                        {components[0].parent?.name ?? components[0].name}
                      </span>
                      {searchKey.length > 0 &&
                        Array.from(uniqueProps).map((prop) => (
                          <HighlightedText
                            key={prop}
                            text={[prop]}
                            searchKey={searchKey}
                            replace={replace}
                            searchSettings={searchSettings}
                          />
                        ))}
                    </span>
                  </span>
                  <IconButton
                    onClick={() => handleComponentTarget(parentId)}
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <IconTarget />
                  </IconButton>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
}

export default render(Plugin);
