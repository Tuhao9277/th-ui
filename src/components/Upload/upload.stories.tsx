import React from 'react'
import { storiesOf } from '@storybook/react'
import Upload from './index'
import Icon from '../Icon/icon'

const SimpleUpload = () => {
  return (
    <Upload
      action="https://run.mocky.io/v3/5107a1de-4406-40b7-8616-5cd6ec95a168"
      name="fileName"
      multiple
      drag
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Icon icon="upload" size="3x" theme="secondary" />
        <br />
        <p>拖动文件到此处上传</p>
      </div>
    </Upload>
  )
}
storiesOf('Upload 上传组件', module).add('Upload', SimpleUpload)
