import React from 'react'
import { Container, Stack } from '@mui/material'
import {Post} from '../data/posts'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import { PostCard } from './postCard'
import { CreatePostCard } from './createPostCard'

export type PostCardProps = {
  post: Post
  onPostAnswer: (postText: string) => void
}

const answerStyle: SxProps<Theme> = {
  margin: '10px 20px',
}

export const PostDetail = ({post, onPostAnswer}: PostCardProps) => {
  return (
    <Container>
      <PostCard post={post}/>

      <CreatePostCard
        buttonMessage="Answer"
        placeholder="What do you think of this?"
        onPost={onPostAnswer}
        sx={answerStyle}
      />

      <Stack>
        {post.threadAnswers && post.threadAnswers
          .map((answer: Post) => (<PostCard key={answer.id} post={answer} sx={answerStyle}/>))
        }
      </Stack>


    </Container>
  )
}
