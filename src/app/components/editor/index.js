import React, { useState, useRef } from 'react'

import PropTypes from 'prop-types'
import axios from 'axios'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { useToasts } from 'react-toast-notifications'

import 'braft-editor/dist/index.css'

import styles from './index.module.scss'

const uploadImage = file => {
  return new Promise(resolve => {
    const formData = new FormData()
    formData.append('file', file)
    axios
      .post(process.env.REACT_APP_UPLOAD_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then(res => {
        resolve(res.data.data.url || '')
      })
  })
}

const Editor = ({ onSubmit }) => {
  const [content, setContent] = useState(BraftEditor.createEditorState(null))
  const upload = useRef(null)

  const { addToast } = useToasts()

  const controls = [
    'bold',
    'italic',
    'underline',
    'separator',
    'emoji',
    'fullscreen',
  ]

  const handleInsertImage = async e => {
    // 上传图片
    const res = await uploadImage(e.target.files[0])

    const newContent = ContentUtils.insertMedias(content, [
      {
        type: 'IMAGE',
        url: res,
      },
    ])
    upload.current.value = null
    setContent(newContent)
  }

  const extendControls = [
    {
      key: 'upload',
      type: 'component',
      component: (
        <>
          <label htmlFor='image' className='btn btn-primary margin-left-no'>
            插入图片
          </label>
          <input
            type='file'
            id='image'
            ref={upload}
            className='file d-none'
            onChange={handleInsertImage}
            title=''
          />
        </>
      ),
    },
    {
      key: '发布',
      type: 'component',
      component: (
        <button
          onClick={() => {
            if (content.isEmpty()) {
              addToast('内容不允许为空', {
                appearance: 'error',
                autoDismiss: true,
              })
            } else {
              onSubmit(content.toHTML())
              setContent(BraftEditor.createEditorState(null))
            }
          }}
          className='btn btn-primary float-right'
        >
          发表
        </button>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      <BraftEditor
        value={content}
        placeholder='不要发布不友善、负能量或者引战的内容，否则会封禁账号'
        controls={controls}
        contentStyle={{ height: 125 }}
        extendControls={extendControls}
        onChange={editorState => setContent(editorState)}
      />
    </div>
  )
}

Editor.propTypes = {
  onSubmit: PropTypes.func,
}

export default Editor
