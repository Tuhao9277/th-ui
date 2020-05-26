import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import MenuItem, { MenuItemProps } from './menuItem'
import SubMenu, { SubMenuProps } from './subMenu'

export type IMenuConponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuConponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
