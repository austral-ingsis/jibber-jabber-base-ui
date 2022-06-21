import React, {useCallback, useEffect, useState} from 'react'
import { Avatar, Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material'
import { Post } from '../data/posts'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import {useUserData} from "../data/dataContext";
import GenericAvatar from "./generic-avatar.jpg"

export type PostCardProps = {
  post: Post
  sx?: SxProps<Theme>
  shouldNavigate?: boolean
}

const cardStyle: SxProps<Theme> = {
  margin: '10px',
}

export const PostCard = ({post, sx, shouldNavigate = false}: PostCardProps) => {
  const navigate = useNavigate()
  const userData = useUserData()

  const {content, author} = post
  const [displayName, setDisplayName] = useState('display name')
  const [username, setusername] = useState('username')

  const mergedCardStyle = {...cardStyle, ...sx}

  useEffect(() => {

    userData.getUserById(author).then(r => {
      if(r) {
        setusername(r.username)
        setDisplayName(r.displayName)
      }

    })

  })

  const handleContentClick = useCallback(() => {
    if (shouldNavigate)
      navigate(`/posts/${post.id}`)
  }, [navigate, post.id])

  const handleHeaderClick = useCallback(() => navigate(`/users/${post.author}`), [navigate, post.author])

  return (
    <Card sx={mergedCardStyle}>
      <CardActionArea>
        <CardHeader
          avatar={<Avatar src={GenericAvatar}/>}
          title={displayName}
          subheader={`@${username}`}
          onClick={handleHeaderClick}
        />
        <CardContent onClick={handleContentClick}>
          <Typography variant="body1" color="text.primary">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
