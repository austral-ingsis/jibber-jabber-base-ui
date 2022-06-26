import React from 'react'

import { Stack } from '@mui/material'

import { Post } from '../data/posts'
import { PostCard } from './postCard'

export type FeedProps = {
  posts: Post[]
}

export const Feed = ({posts}: FeedProps) => {

  if (posts.length > 0) {

    return (
        <Stack>
          {posts.map(post => <PostCard key={post.id} post={post} shouldNavigate/>)
          }
        </Stack>
    )

  } else {

    return (
        <h3> So sorry... there arent any posts to see!</h3>
    )

  }


}
