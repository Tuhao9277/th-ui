import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Input from './input'

const defaultInput = () => (
  <Input style={{ width: '300px' }} placeholder="好看的input" onChange={action('changed')} />
)

const disableedInput = () => <Input style={{ width: 300 }} placeholder="disabled Input" disabled />

const sizeInput = () => (
  <>
    <Input style={{ width: 300 }} placeholder="large size" size="lg" />
    <br />
    <br />
    <Input style={{ width: 300 }} placeholder="normal size" />
    <br />
    <br />
    <Input style={{ width: 300 }} placeholder="small size" size="sm" />
  </>
)

const pandInput = () => (
  <>
    <Input
      style={{ width: 300, marginBottom: 16 }}
      placeholder="thdax.com"
      prepend="https://"
      append=".com"
    />
  </>
)

storiesOf('Input输入框', module)
  .add('常规Input', defaultInput)
  .add('被禁用的Input', disableedInput)
  .add('三种大小', sizeInput)
  .add('前后缀', pandInput)
