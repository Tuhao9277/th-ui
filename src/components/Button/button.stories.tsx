import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Button from './button'

const defaultButton = () => (
  <div style={{ display: 'flex', width: 300, justifyContent: 'space-between' }}>
    <Button onClick={action('change')}>Default</Button>
    <Button type="primary">primary</Button>
    <Button type="danger">danger</Button>
    <Button type="link">link</Button>
  </div>
)

const shapeButton = () => (
  <div style={{ display: 'flex', width: 300, justifyContent: 'space-between' }}>
    <Button shape="circle">c</Button>
    <Button shape="round">round</Button>
  </div>
)
storiesOf('Button', module)
  .add('常规按钮', defaultButton)
  .add('按钮形状', shapeButton)
