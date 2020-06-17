import React, { useState } from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Button from './button'

const defaultButton = () => (
  <div style={{ display: 'flex', width: 700, justifyContent: 'space-between' }}>
    <Button onClick={action('change')}>Default</Button>

    <Button type="primary">Primary</Button>
    <Button type="danger">danger</Button>
    <Button type="link" href="#">
      link
    </Button>
    <Button type="dashed">dashed</Button>
    <Button disabled>Disabled</Button>
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

const LoadingButton = () => {
  const [loading, setLoading] = useState(false)
  const handleClick = () => {
    setLoading(true)
    const t = setInterval(() => {
      setLoading(false)
      clearInterval(t)
    }, 2000)
  }
  return (
    <div style={{ display: 'flex', width: 300, justifyContent: 'space-around' }}>
      <Button loading={loading} type="primary" onClick={handleClick}>
        Loading
      </Button>
      <Button loading type="primary">
        Loading
      </Button>
    </div>
  )
}

storiesOf('Button', module)
  .add('常规按钮', defaultButton)
  .add('按钮形状', shapeButton)
  .add('Loading按钮', LoadingButton)
