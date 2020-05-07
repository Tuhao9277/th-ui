import React, { InputHTMLAttributes, FC, ReactElement, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
type InputSize = 'lg' | 'sm';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = props => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const cnames = classNames('th-input-wrapper', {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-prepend': !!prepend,
    'input-group-append': !!append,
  });

  const fixControlledeValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  // value存在时，删除defaultValue
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledeValue(props.value);
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="th-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"> </div>}
      <input className="th-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="th-input-group-append">{append}</div>}
    </div>
  );
};
export default Input;
