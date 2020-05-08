import React from 'react';
import Input from './input';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

const defaultInput = () => (
  <Input style={{ width: '300px' }} placeholder="好看的input" onChange={action('changed')} />
);

const disableedInput = () => <Input style={{ width: 300 }} placeholder="disabled Input" disabled />;

storiesOf('Input component', module)
  .add('Input', defaultInput)
  .add('被禁用的Input', disableedInput);
