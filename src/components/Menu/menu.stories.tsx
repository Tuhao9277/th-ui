import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const HorzonialMenu = () => (
  <Menu
    defaultIndex="0"
    onSelect={index => {
      action(`clicked ${index} item`)
    }}
  >
    <MenuItem>cool Link</MenuItem>
    <MenuItem>cool Link2</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
      <MenuItem>cool Link2</MenuItem>
    </SubMenu>
  </Menu>
)
const VerticalMenu = () => (
  <Menu
    mode="vertical"
    defaultIndex="0"
    onSelect={index => {
      action(`clicked ${index} item`)
    }}
  >
    <MenuItem>cool Link</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>drop1</MenuItem>
      <MenuItem>cool Link2</MenuItem>
    </SubMenu>
    <MenuItem>cool Link2</MenuItem>
  </Menu>
)
storiesOf('Menu 菜单', module).add('横向Menu', HorzonialMenu).add('纵向Menu', VerticalMenu)
