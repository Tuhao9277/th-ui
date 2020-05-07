import React, { useState, ChangeEvent } from 'react';
import Input from './input';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const ControlledInput = () => {
  const [value, setValue] = useState<string>();
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      }}
    />
  );
};
const defaultInput = () => (
  <>
    <Input style={{ width: '300px' }} placeholder="好看的input" onChange={action('changed')} />
    <ControlledInput />
  </>
);

const disableedInput = () => <Input style={{ width: 300 }} placeholder="disabled Input" disabled />;

storiesOf('Input component', module)
  .add('Input', defaultInput)
  .add('被禁用的Input', disableedInput);
