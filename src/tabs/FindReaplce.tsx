// import { Stack, Button } from '@create-figma-plugin/ui';
// import { Fragment, h, JSX } from 'preact';
// import { StateUpdater, useEffect, useState } from 'preact/hooks';
// import { emit } from '@create-figma-plugin/utilities';
// import { ChoiceChip, IconChip } from '../components/chip';
// import { IconCaseSensitive, IconWholeWord } from '../components/icons';
// import TextInput from '../components/input';
// import {
//   IComponent,
//   ISearchSettings,
//   FindComponents,
//   ReplaceProperties,
// } from '../types';

// interface Props {
//   matchingComps: Record<string, IComponent[]> | null;
//   replaceComps: IComponent[];
// }

// export default function FindReplaceTab({
//   matchingComps,
//   replaceComps,
// }: Props): JSX.Element {
//   const [searchKey, setSearchKey] = useState('');
//   const [replace, setReplacement] = useState('');

//   const searchScopeOpts: ISearchSettings['searchScope'][] = [
//     'Selection',
//     'Page',
//     'All Pages',
//   ];

//   const [searchSettings, setSearchSettings] = useState<ISearchSettings>({
//     caseSensitive: false,
//     matchWholeWord: false,
//     searchScope: searchScopeOpts[1],
//   });

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (searchKey) {
//         emit<FindComponents>('FIND_COMPONENTS', searchKey, searchSettings);
//       }
//     }, 300);
//     return () => clearTimeout(timeoutId);
//   }, [searchKey, searchSettings]);

//   const handleReplace = (components: IComponent[]) => {
//     emit<ReplaceProperties>(
//       'REPLACE_PROPERTIES',
//       searchKey,
//       replace,
//       components
//     );
//     emit<FindComponents>('FIND_COMPONENTS', searchKey, searchSettings);
//   };

//   const handleReplaceAll = () => {
//     handleReplace(Object.values(matchingComps ?? {}).flat());
//   };

//   return (
//     <Fragment>
//       <div className="sticky inset-0 z-10 flex w-full flex-col gap-4 border-b border-border bg-bg p-4">
//         <Stack space="small">
//           <div className="flex items-center gap-1">
//             <span className="mr-2 text-text-secondary">Search in</span>
//             {searchScopeOpts.map((opt) => (
//               <ChoiceChip
//                 key={opt}
//                 value={opt}
//                 checked={opt === searchSettings.searchScope}
//                 onChange={() =>
//                   setSearchSettings({
//                     ...searchSettings,
//                     searchScope: opt,
//                   })
//                 }
//               />
//             ))}
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-full">
//               <TextInput
//                 label="search"
//                 placeholder="Search variants"
//                 value={searchKey}
//                 onInput={(e) => setSearchKey(e.currentTarget.value)}
//               >
//                 <div className="flex gap-1">
//                   <IconChip
//                     icon={<IconCaseSensitive />}
//                     label="Case Sensitive"
//                     tooltip="Case Sensitive"
//                     onChange={() =>
//                       setSearchSettings({
//                         ...searchSettings,
//                         caseSensitive: !searchSettings.caseSensitive,
//                       })
//                     }
//                   />
//                   <IconChip
//                     icon={<IconWholeWord />}
//                     label="Match Whole Word"
//                     tooltip="Match Whole Word"
//                     onChange={() =>
//                       setSearchSettings({
//                         ...searchSettings,
//                         matchWholeWord: !searchSettings.matchWholeWord,
//                       })
//                     }
//                   />
//                 </div>
//               </TextInput>
//             </div>
//           </div>
//           <TextInput
//             label="replace with"
//             placeholder="Replace with..."
//             value={replace}
//             onInput={(e) => setReplacement(e.currentTarget.value)}
//           />
//         </Stack>
//         <div className="flex items-center justify-between">
//           <div className="flex w-full gap-2">
//             <Button
//               disabled={replace.trim() === ''}
//               onClick={() => handleReplace(replaceComps)}
//               secondary
//             >
//               Replace
//             </Button>
//             <Button
//               disabled={replace.trim() === ''}
//               onClick={handleReplaceAll}
//               secondary
//             >
//               Replace All
//             </Button>
//           </div>
//         </div>
//       </div>

//       {matchingComps && (
//         <ul className="flex flex-col pt-4">
//           {Object.entries(matchingComps).map(([parentId, components]) => {
//             const uniqueProps = new Set(
//               components.flatMap((comp) => comp.matchedProps)
//             );
//             return (
//               <li key={parentId}>
//                 <button
//                   type="button"
//                   className={`group ${replaceComps.includes(components[0]) ? 'bg-bg-selected bg-opacity-20' : ''} flex w-full cursor-default justify-between gap-3 px-4 py-1 text-sm`}
//                   onClick={() => handleComponentSelect(parentId, components)}
//                 >
//                   <span className="flex items-start">
//                     <span className="text-text-component">
//                       <IconComponent />
//                     </span>
//                     <span className="flex flex-col items-start gap-1 py-1">
//                       <span className="text-xs text-text-component">
//                         {components[0].parent?.name ?? components[0].name}
//                       </span>
//                       {searchKey.length > 0 &&
//                         Array.from(uniqueProps).map((prop) => (
//                           <HighlightedText
//                             key={prop}
//                             text={[prop]}
//                             searchKey={searchKey}
//                             replace={replace}
//                             searchSettings={searchSettings}
//                           />
//                         ))}
//                     </span>
//                   </span>
//                   <IconButton
//                     onClick={() => handleComponentTarget(parentId)}
//                     className="opacity-0 group-hover:opacity-100"
//                   >
//                     <IconTarget />
//                   </IconButton>
//                 </button>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </Fragment>
//   );
// }

export default {};
