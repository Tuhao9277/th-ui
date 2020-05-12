import React, {
  FC,
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react'
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
  /** 设置按钮的loading状态 */
  loading?: boolean | { delay: number }
  /** 设置 button 造型 */
  shape?: ButtonShape
  children: React.ReactNode
  className?: string
}

type NativeButtonProps = {
  onClick: MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLElement>, 'type' | 'onClick'>
type AnchorButtonProps = {
  href: string
  onClick: MouseEventHandler<HTMLElement>
} & BaseButtonProps &
  Omit<AnchorHTMLAttributes<any>, 'type' | 'onClick'>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

let delayTimeout: number
const Button: FC<ButtonProps> = props => {
  const {
    children,
    size,
    href,
    shape,
    type,
    className,
    disabled,
    loading,
    onClick,
    ...restProps
  } = props
  const cname = classNames('btn', className, {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    [`btn-${shape}`]: shape,
    [`btn-loading`]: loading,
    disabled: type === 'link' && disabled,
  })

  const [btnLoading, setBtnLoading] = useState(loading)
  useEffect(() => {
    if (loading && typeof loading !== 'boolean') {
      clearTimeout(delayTimeout)
    }
    if (loading && typeof loading !== 'boolean' && loading.delay) {
      delayTimeout = window.setTimeout(() => {
        setBtnLoading(loading)
      }, loading.delay)
    } else if (loading !== btnLoading) {
      setBtnLoading(loading)
    }
  }, [loading, btnLoading])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (loading) return
    if (onClick) {
      ;(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e)
    }
  }

  if (type === 'link' && href) {
    return (
      <a className={cname} href={href} {...restProps}>
        {children}
      </a>
    )
  }
  return (
    <button onClick={handleClick} className={cname} disabled={disabled} {...restProps}>
      {children}
    </button>
  )
}
Button.defaultProps = {
  disabled: false,
  type: 'default',
}

export default Button
