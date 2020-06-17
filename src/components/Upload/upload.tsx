import React, { FC, useState, ChangeEvent, useRef } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent?: number
  raw?: File
  response?: any
  error?: any
}
export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: File) => void
  onSuccess?: (data: any, file: File) => void
  onError?: (err: any, file: File) => void
  onChange?: (file: File) => void
  onRemove?: (file: UploadFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
}
const Upload: FC<UploadProps> = ({
  action,
  defaultFileList = [],
  beforeUpload,
  onProgress,
  onSuccess,
  onError,
  onChange,
  onRemove,
  name,
  headers,
  data,
  withCredentials,
  accept,
  multiple,
  children,
  drag,
}) => {
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList)

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        }
        return file
      })
    })
  }
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: `${Date.now()}upload-file`,
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    }
    setFileList(prevList => [_file, ...prevList])
    const formData = new FormData()
    formData.append(name || 'file', file)
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
        withCredentials,
        onUploadProgress: e => {
          const percentage = Math.round((e.loaded * 100) / e.total) || 0
          if (percentage < 100) {
            updateFileList(_file, { percent: percentage, status: 'uploading' })
          }
          onProgress?.(percentage, file)
        },
      })
      .then(res => {
        updateFileList(_file, { status: 'success', response: res.data })
        onSuccess?.(res.data, file)
        onChange?.(file)
      })
      .catch(err => {
        updateFileList(_file, { status: 'error', response: err })
        onError?.(err, file)
        onChange?.(file)
      })
  }

  const handleClick = () => {
    fileInput.current?.click()
  }
  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (!beforeUpload) {
        post(file)
      }
    })
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => prevList.filter(item => item.uid !== file.uid))
    onRemove?.(file)
  }

  return (
    <div className="th-upload-component">
      <div className="th-upload-input" style={{ display: 'inline-block' }} onClick={handleClick}>
        {drag ? <Dragger onFile={files => uploadFiles(files)}>{children}</Dragger> : children}
        <input
          type="file"
          className="th-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
        />
      </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

export default Upload
