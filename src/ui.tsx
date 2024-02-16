/* eslint-disable jsx-a11y/label-has-associated-control */
import { render } from '@create-figma-plugin/ui';
import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import '!./output.css';
import { emit } from '@create-figma-plugin/utilities';
import { ReplaceProperties } from './types';

function Plugin() {
  const [searchKey, setSearchKey] = useState('');
  const [replace, setReplacement] = useState('');

  const handleReplace = () => {
    emit<ReplaceProperties>('REPLACE_PROPERTIES', searchKey, replace);
  };

  return (
    <Fragment>
      <div>
        <label htmlFor="searchKey">Search Key:</label>
        <input
          id="searchKey"
          type="text"
          value={searchKey}
          onInput={(e) => setSearchKey(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="replacement">Replacement:</label>
        <input
          id="replacement"
          type="text"
          value={replace}
          onInput={(e) => setReplacement(e.currentTarget.value)}
        />
      </div>
      <button type="button" onClick={handleReplace}>
        Replace
      </button>
    </Fragment>
  );
}

export default render(Plugin);
