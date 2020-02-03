import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useToasts } from 'react-toast-notifications'
import { withRouter } from 'react-router-dom'
import styles from './index.module.scss'
import { TO_COMMENT, TO_REPLY } from 'src/pages/video/constant'

import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import { MdMessage } from 'react-icons/md'

import { Editor, Pagination } from 'src/app/components/index'
import {
  postAddComment,
  getCommentList,
  postAddReply,
} from 'src/pages/video/api'
import { formatTime } from 'src/app/util/time'
import { useSelector } from 'react-redux'

const PAGE_SIZE = 30

const Comment = props => {
  const { genre } = props
  const params = new URLSearchParams(props.location.search)
  const topicId = Number(params.get('id'))
  const anchor = params.get('anchor')
  const { addToast } = useToasts()
  const { loginInfo } = useSelector(state => state.app)

  // 评论页码和总条数
  const [page, setPage] = useState(Number(params.get('page')) || 1)
  const [total, setTotal] = useState(0)
  // 评论列表
  const [list, setList] = useState([])

  // 锚点跳转
  const scrollToAnchor = useCallback(
    anchor => {
      let element = document.getElementById(anchor)
      if (element) {
        const headerOffset = 84
        let elementPosition = element.getBoundingClientRect().top
        let offsetPosition = elementPosition - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
        // eslint-disable-next-line
        location.replace(`#/${genre}/detail?id=${topicId}`)
      }
    },
    [genre, topicId],
  )

  const fetchCommentList = useCallback(async () => {
    const params = {
      page,
      pageSize: PAGE_SIZE,
      topicId,
      genre,
    }
    const res = await getCommentList(params)
    const { list, total } = res
    setList(list)
    setTotal(total)
    if (anchor) {
      scrollToAnchor(anchor)
    }
  }, [page, topicId, genre, anchor, scrollToAnchor])

  useEffect(() => {
    fetchCommentList()
  }, [fetchCommentList])

  // 提交评论或者回复
  const handleSubmitContent = async content => {
    // 构造请求参数
    const params = {
      topicId,
      genre,
      content,
    }

    await postAddComment(params)
    addToast('新增评论成功！', {
      appearance: 'info',
      autoDismiss: true,
    })
    fetchCommentList()
  }
  // 新增回复
  return (
    <div className={styles.container}>
      <p className={styles.name}>评论列表</p>
      <div className={styles.list}>
        {list.map((item, index) => (
          <div key={item.id}>
            <div className='divider' />
            <CommentItem
              topicId={topicId}
              genre={genre}
              detail={item}
              origin={item.content}
              floor={(page - 1) * PAGE_SIZE + index + 1}
              fetchCommentList={fetchCommentList}
              userId={loginInfo.id}
            />
          </div>
        ))}
        <div className='divider margin-bottom-no' />
        <Pagination
          totalNumber={total}
          currentPage={page}
          pageSize={PAGE_SIZE}
          middlePage={4}
          showPrev
          showNext
          onChange={page => setPage(page)}
          showGo={false}
        />
      </div>
      <Editor onSubmit={handleSubmitContent} />
    </div>
  )
}

Comment.propTypes = {
  genre: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(Comment)

// 评论子项
const CommentItem = ({
  floor,
  origin,
  detail,
  fetchCommentList,
  topicId,
  genre,
  userId,
}) => {
  const [showEditor, setShowEditor] = useState(false)
  const { addToast } = useToasts()
  return (
    <div
      className={classNames(
        styles.item,
        detail.commentId ? 'margin-top-sm' : '',
      )}
    >
      <div className={styles.left}>
        <figure
          className={classNames(
            'avatar',
            detail.commentId ? 'avatar' : 'avatar-lg',
          )}
        >
          <img
            className={styles.avatar}
            src={
              detail.fromUser.avatarUrl &&
              (detail.fromUser.avatarUrl.indexOf('http') === -1
                ? `http://online.njtech.edu.cn${detail.fromUser.avatarUrl}`
                : detail.fromUser.avatarUrl)
            }
            alt=''
          />
        </figure>
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <div className={styles['header-left']}>
            <span className={styles.nickname}>{detail.fromUser.nickname}</span>
            {detail.replyId > 0 && detail.replyType === TO_REPLY && (
              <span>回复: {detail.toUser.nickname}</span>
            )}
            <span className={styles.time}>
              发表于：{formatTime(detail.modifiedOn)}
            </span>
          </div>
          {detail.topicId && (
            <div className={styles['header-right']} id={detail.id}>
              #{floor}
            </div>
          )}
        </div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: detail.content }}
        />

        <div className={styles.action}>
          <p>
            <FaAngleUp />
            <span>{detail.upCount}</span>
          </p>
          <p>
            <FaAngleDown />
            <span>{detail.downCount}</span>
          </p>
          {!(!detail.topicId && detail.fromUserId === userId) && (
            <p onClick={() => setShowEditor(!showEditor)}>
              <MdMessage />
              <span className={styles.reply}>
                {showEditor ? '关闭' : '回复'}
              </span>
            </p>
          )}
        </div>

        {/*编辑器 start*/}
        {showEditor && (
          <div className='padding-top-sm'>
            <Editor
              onSubmit={async content => {
                // 添加回复
                const params = {
                  commentId: detail.replyId ? detail.commentId : detail.id,
                  content,
                  origin,
                  replyType: detail.replyId ? TO_REPLY : TO_COMMENT,
                  replyId: detail.replyId ? detail.replyId : detail.id,
                  toUserId: detail.fromUserId,
                  topicId: topicId,
                  topicType: genre,
                }
                await postAddReply(params)
                addToast('新增回复成功！', {
                  appearance: 'info',
                  autoDismiss: true,
                })
                fetchCommentList()
                setShowEditor(false)
              }}
            />
          </div>
        )}
        {/*编辑器 end*/}

        {/*回复列表 start*/}
        {detail.replies && detail.replies.length > 0 && (
          <div className={styles['reply-list']}>
            {detail.replies &&
              detail.replies.map(item => (
                <CommentItem
                  key={`${item.commentId} - ${item.id}`}
                  detail={item}
                  origin={item.content}
                  fetchCommentList={fetchCommentList}
                  topicId={topicId}
                  genre={genre}
                  userId={userId}
                />
              ))}
          </div>
        )}
        {/*回复列表 start*/}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  detail: PropTypes.object.isRequired,
  origin: PropTypes.string.isRequired,
  fetchCommentList: PropTypes.func.isRequired,
  topicId: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  floor: PropTypes.number,
  userId: PropTypes.number,
}
