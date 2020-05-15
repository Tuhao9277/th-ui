import React from 'react'
import Icon from '../Icon/icon'
import Transition from '../Transition'

interface LoadingProps {
  existIcon: boolean
  loading?: boolean | object
}

const LoadingIcon = ({ loading, existIcon }: LoadingProps) => {
  const visible = !!loading

  if (existIcon) {
    return (
      <span className="btn-loading-icon">
        <Icon spin icon="spinner" />
      </span>
    )
  }

  return (
    <Transition in={visible} animation="scale-in-center" timeout={300} unmountOnExit>
      <span className="btn-loading-icon">
        <Icon spin icon="spinner" />
      </span>
    </Transition>
  )
}

export default LoadingIcon
