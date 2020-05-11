import React, { FC, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import { tuple } from '../_utils/types'

export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'dashed'
export type ButtonSize = 'sm' | 'lg'
const ButtonShape = tuple('circle', 'circle-outline', 'round')
export type ButtonShape = typeof ButtonShape[number]
interface BaseButtonProps {
  /** 设置botton尺寸 */
  size?: ButtonSize
  /** 设置 button 禁用 */
  disabled?: boolean
  /** 设置 button 类型 */
  type?: ButtonType
  /** 设置 button 造型 */
  shape?: ButtonShape
  children: React.ReactNode
  className?: string
}

type NativeButtonProps = BaseButtonProps & Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>
type AnchorButtonProps = {
  href: string
} & BaseButtonProps &
  Omit<AnchorHTMLAttributes<any>, 'type'>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = props => {
  const { children, size, href, shape, type, className, disabled, ...restProps } = props
  const cname = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    [`btn-${shape}`]: shape,
    disabled: type === 'link' && disabled,
  })
  if (type === 'link' && href) {
    return (
      <a className={cname} href={href} {...restProps}>
        {children}
      </a>
    )
  }
  return (
    <button className={cname} disabled={disabled} {...restProps}>
      {children}
    </button>
  )
}
Button.defaultProps = {
  disabled: false,
  type: 'default',
}

export default Button
