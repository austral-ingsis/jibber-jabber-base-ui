import React, { useCallback, useContext, useEffect, useState } from 'react'

import { Post } from '../../data/posts'
import { Feed } from '../../components/feed'
import { usePostData } from '../../data/dataContext'
import { Loading } from '../../components/loading'
import { MainFrame } from '../../components/mainFrame'
import {UserContext, useUserContext} from '../../components/contexts/userContext'
import { CreatePostCard } from '../../components/createPostCard'
import { Container } from '@mui/material'
import keycloak from "../../Keycloak";
import {userAPI} from "../../data/apis/UserAPI";

type HomeState =
  | {
  loaded: false
}
  | {
  loaded: true
  posts: Post[]
}

export const Home = () => {
  const postData = usePostData()
  const user = useUserContext()

  const [state, setState] = useState<HomeState>({loaded: false})

  const [load, setLoad] = useState(true)

  useEffect(() => {

      if(load){
        postData.getFeedPosts().then(posts => {
        setState({loaded: true, posts})
        setLoad(false)
        })
      }

  }, [postData])

  const refreshPosts = useCallback(() => {
    postData.getFeedPosts()
      .then(posts => setState(state => state.loaded ? ({...state, posts}) : state))
  }, [state, postData])

  const handleCreatePost = useCallback((postText: string) => {
    if (state.loaded)
      postData.createPost({author: user.id, content: postText})
        .then(() => refreshPosts())
        .catch(error => console.error('Error while creating new post', error))
  }, [state, postData])

  if (!state.loaded)
    return <Loading/>

  const {posts} = state

  return (
    <MainFrame title="Home">
      <Container>
        <CreatePostCard buttonMessage="Post it!" placeholder="What's happening?" onPost={handleCreatePost}/>

        <Feed posts={posts}/>
      </Container>
    </MainFrame>

  )
}
