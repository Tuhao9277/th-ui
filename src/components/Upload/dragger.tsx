import React, { useState, DragEvent, FC } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void
}
const Dragger: FC<DraggerProps> = ({ onFile, children }) => {
  const [dragOver, setDragOver] = useState(false)
  const cname = classNames('th-uploader-dragger', {
    'is-dragover': dragOver,
  })
  const handleDrop = (_e: DragEvent<HTMLElement>) => {
    _e.preventDefault()
    setDragOver(false)
    onFile(_e.dataTransfer.files)
  }
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }

  return (
    <div
      className={cname}
      onDragOver={e => handleDrag(e, true)}
      onDragLeave={e => handleDrag(e, false)}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger
