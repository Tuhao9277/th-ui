import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Button from './button'

const defaultButton = () => (
  <div style={{ display: 'flex', width: 500, justifyContent: 'space-between' }}>
    <Button onClick={action('change')}>Default</Button>
    <Button type="primary">primary</Button>
    <Button type="danger">danger</Button>
    <Button type="link">link</Button>
    <Button type="dashed">dashed</Button>
  </div>
)

const shapeButton = () => (
  <div style={{ display: 'flex', width: 300, justifyContent: 'space-around' }}>
    <Button shape="circle" type="primary">
      A
    </Button>
    <Button shape="round">round</Button>
  </div>
)
storiesOf('Button', module).add('常规按钮', defaultButton).add('按钮形状', shapeButton)
