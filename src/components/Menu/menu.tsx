import React, { CSSProperties, createContext, FC, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
  /** 默认active的菜单项的索引值 */
  defaultIndex?: string
  className?: string
  /** 菜单类型 横向 或者 纵向 */
  mode?: MenuMode
  style?: CSSProperties
  /** 点击菜单项触发的回调函数 */
  onSelect?: (selectedIndex: string) => void
  /** 设置子菜单的默认打开 ，只在纵向模式下有效 */
  defaultOpenSubMenus?: string[]
}
interface IMenuContext {
  index: string
  onSelect?: (selectedIndex: string) => void
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({
  index: '0',
})

const Menu: FC<MenuProps> = props => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classNames('th-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive || '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  }
  const renderChildren = () =>
    React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { name } = childElement.type
      if (name === 'MenuItem' || name === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: index.toString(),
        })
      }
      // eslint-disable-next-line no-console
      console.error('Warning:Menu has a child which is not a MenuItem Component')
    })

  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu
