import React, { FC } from 'react'
import { UploadFile, UploadFileStatus } from './upload'
import Icon from '../Icon/icon'
import Progress from '../Progress/index'

interface UploadListProps {
  fileList: UploadFile[]
  onRemove: (_file: UploadFile) => void
}
const renderStatusIcon = (status?: UploadFileStatus) => {
  switch (status) {
    case 'uploading':
    case 'ready': {
      return <Icon icon="spinner" spin theme="primary" />
    }
    case 'success': {
      return <Icon icon="check-circle" theme="success" />
    }
    case 'error': {
      return <Icon icon="times-circle" theme="danger" />
    }
    default:
  }
}

const UploadList: FC<UploadListProps> = ({ fileList, onRemove }) => (
  <ul className="th-upload-list">
    {fileList.map(file => (
      <li className="th-upload-list-item" key={file.uid}>
        <span className={`file-name file-name-${file.status}`}>
          <Icon icon="file-alt" theme="secondary" />
          {file.name}
        </span>
        <span className="file-status">{renderStatusIcon(file.status)}</span>
        <span className="file-actions">
          <Icon icon="times" onClick={() => onRemove(file)} />
        </span>
        {file.status === 'uploading' && <Progress percent={file.percent ?? 0} />}
      </li>
    ))}
  </ul>
)

export default UploadList
