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

import {
  mount,
  shallow
} from 'enzyme';

import { FileInput } from '..';

/* global sinon */

describe('<FileInput>', function() {

  it('should render', function() {
    createFileInput();
  });


  it('should add files', function() {

    // given
    const setFieldValue = sinon.spy();
    const wrapper = createFileInput({
      field: {
        name: 'name',
        value: []
      },
      form: {
        setFieldValue
      }
    }, mount);
    const input = wrapper.find('input');

    // when
    const newFiles = [ createFile() ];
    setFiles(input, newFiles);
    input.simulate('change');

    // then
    expect(setFieldValue).to.have.been.calledOnce;
    expect(setFieldValue.args).to.deep.equal([
      [ 'name', newFiles ]
    ]);
  });


  it('should add only new files', function() {

    // given
    const initialValue = [ createFile() ];
    const setFieldValue = sinon.spy();
    const wrapper = createFileInput({
      field: {
        name: 'name',
        value: initialValue
      },
      form: {
        setFieldValue
      }
    }, mount);
    const input = wrapper.find('input');

    // when
    setFiles(input, initialValue);
    input.simulate('change');

    // then
    expect(setFieldValue).to.have.been.calledOnce;
    expect(setFieldValue.args).to.deep.equal([
      [ 'name', initialValue ]
    ]);
  });


  it('should remove files', function() {

    // given
    const initialValue = [ createFile() ];
    const setFieldValue = sinon.spy();
    const wrapper = createFileInput({
      field: {
        name: 'name',
        value: initialValue
      },
      form: {
        setFieldValue
      }
    }, mount);

    // when
    wrapper.find('.remove').simulate('click');

    // then
    expect(setFieldValue).to.have.been.calledOnce;
    expect(setFieldValue.args).to.deep.equal([
      [ 'name', [] ]
    ]);
  });
});



// helpers ///////////////////

function createFileInput(options = {}, render = shallow) {
  const {
    field = { value: [] },
    form = {},
    ...props
  } = options;

  return render(<FileInput
    { ...props }
    field={ field }
    form={ form }
  />);
}

function createFile(options = {}) {
  return {
    name: 'file',
    path: '/fake/path',
    ...options
  };
}

function setFiles(input, files) {
  sinon.stub(input.getDOMNode(), 'files').value(files);
}
