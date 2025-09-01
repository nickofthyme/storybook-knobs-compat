/* eslint-disable @stylistic/jsx-one-expression-per-line */

import type { Meta } from '@storybook/react';
import React from 'react';

import { array, boolean, button, color, date, files, object, optionsKnob, radios, select } from '../lib/preview';
import { number } from '../lib/preview/knobs/number';
import { text } from '../lib/preview/knobs/text';

const meta: Meta = {
  title: 'Knobs',
  parameters: {},
  args: {},
};

export default meta;

export const Default = () => {
  const textValue = text('some text', 'primary');
  const booleanValue = boolean('some bool', true);
  const numberValue = number('some number', 10, { min: 0, max: 100, step: 1 });
  const arrayValue = array('some array', ['a', 'b', 'c']);
  const objectValue = object('some object', { a: 1, b: 2, c: 3 });
  const selectValue = select('some select', { A: 'a', B: 'b', C: 'c' }, 'a');
  const radiosValue = radios('some radios', { Test: 'test', test2: 'test2' }, 'test');
  const dateValue = date('some date', new Date());
  const colorValue = color('some color', '#000000');
  const filesValue = files('some files', 'image/*');
  const optionsValue = optionsKnob('some options', { A: 'a', B: 'b', C: 'c' }, ['a']);

  button('Handle click', () => {
    console.log('button clicked');
  });

  return (
    <div style={{ padding: '1rem' }}>
      {/* <button onClick={handleClick}>Click me</button><br />
      <span><b>label:</b> {JSON.stringify(label)}</span><br /> */}
      <span><b>text:</b> {JSON.stringify(textValue)}</span><br />
      <span><b>boolean:</b> {JSON.stringify(booleanValue)}</span><br />
      <span><b>number:</b> {JSON.stringify(numberValue)}</span><br />
      <span><b>array:</b> {JSON.stringify(arrayValue)}</span><br />
      <span><b>object:</b> {JSON.stringify(objectValue)}</span><br />
      <span><b>select:</b> {JSON.stringify(selectValue)}</span><br />
      <span><b>radios:</b> {JSON.stringify(radiosValue)}</span><br />
      <span><b>date:</b> {JSON.stringify(dateValue)}</span><br />
      <span><b>color:</b> {JSON.stringify(colorValue)}</span><br />
      <span><b>files:</b> {JSON.stringify(filesValue)}</span><br />
      <span><b>options:</b> {JSON.stringify(optionsValue)}</span><br />
    </div>
  );
};
