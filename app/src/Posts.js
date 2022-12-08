// Posts.js

import React from 'react'
import { css } from '@emotion/css';
import { Link } from 'react-router-dom';
export default function Posts({
  posts = []
}) {
  return (
    <>
      {
        posts.map(post => (
          
            <div key={post.id} className='column'>
              <div className='frame'>
                <Link to={`/post/${post.id}`} className={linkStyle} key={post.id}>
                  <h1 className={postTitleStyle}>{post.name}</h1>
                </Link>
                <Link to={`/post/${post.id}`} className={linkStyle} key={post.id}>
                <img alt="post" className={imageStyle} src={post.image} />
                </Link>
              </div>
             
            </div> 
        ))
      }
    </>
  )
}

const postTitleStyle = css`
  margin: 15px 0px;
  color: #0070f3;
`

const linkStyle = css`
  text-decoration: none;
`

 

const imageStyle = css` 
`
