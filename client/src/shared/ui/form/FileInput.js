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

export default function FileInput(props) {
  const {
    label,
    field,
    form,
    multiple = false
  } = props;

  const inputRef = React.useRef(null);

  function onChange() {
    form.setFieldValue(field.name, Array.from(inputRef.current.files));
  }

  return (
    <label>
      {label}
      <input
        onBlur={ field.onBlur }
        onChange={ onChange }
        multiple={ multiple }
        type="file"
        ref={ inputRef }
      />
    </label>
  );
}
