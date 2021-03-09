/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import React from 'react';

import { uniqueBy } from 'min-dash';

import { Icon } from '../icon';
import CloseIcon from '../../../../resources/icons/Close.svg';

export default function FileInput(props) {
  const {
    label,
    field,
    form
  } = props;

  const {
    name,
    value,
    onBlur
  } = field;

  const inputRef = React.useRef(null);

  function onChange() {
    const { files } = inputRef.current;

    form.setFieldValue(name, uniqueBy('path', value, files));
  }

  function removeFile(fileToRemove) {
    form.setFieldValue(name, field.value.filter(file => file !== fileToRemove));
  }

  return (
    <div className="form-group">
      <input
        className="form-control"
        name={ name }
        id={ name }
        onBlur={ onBlur }
        onChange={ onChange }
        multiple
        type="file"
        ref={ inputRef }
      />

      <label htmlFor={ name }>
        <Icon name="open" />
        {label}
      </label>

      <FileList
        files={ value }
        onRemove={ removeFile }
      />
    </div>
  );
}

function FileList(props) {
  const {
    files,
    onRemove
  } = props;

  return (<ul className="file-list">
    { files.map(file => (
      <li className="file-list-item" key={ file.path }>
        { file.name }
        <button className="remove" type="button" onClick={ () => onRemove(file) } aria-label="Remove">
          <CloseIcon aria-hidden="true" />
        </button>
      </li>
    ))}
  </ul>);
}
