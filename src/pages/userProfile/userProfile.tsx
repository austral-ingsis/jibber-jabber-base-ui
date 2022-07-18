import React, {useCallback, useEffect, useState} from 'react'
import { MainFrame } from '../../components/mainFrame'
import { useParams } from 'react-router-dom'
import { usePostData, useUserData } from '../../data/dataContext'
import { Post } from '../../data/posts'
import { User } from '../../data/users'
import {LoadElementState, useLoadElementById} from '../../components/hooks/useLoadElementById'
import { mapUndefined, nonUndefined } from '../../utils/undefined'
import { Feed } from '../../components/feed'
import { LoadableElement } from '../../components/loadableElement'
import { Container } from '@mui/material'
import { ProfileHeader } from '../../components/profileHeader'
import { useUserContext } from '../../components/contexts/userContext'
import { FollowActions } from '../../components/followActions'

type UserProfileParams = {
  userId: string
}

type UserProfileValue = {
  posts: Post[]
  user: User
  isFollowed: boolean
}

export const UserProfile = () => {
  const user = useUserContext()
  const {userId} = useParams<UserProfileParams>()

  const isSelf: boolean = user.id === userId

  const postData = usePostData()
  const userData = useUserData()

  const getUserProfileValue = useCallback((id: string) => {

    return Promise.all([userData.getUserById(id), userData.isFollowed(id), postData.getPostsByUser(id)])
      .then(([maybeUser, isFollowed, posts]) =>
        mapUndefined(maybeUser, user => ({user, posts, isFollowed: nonUndefined(isFollowed, false)})),
      )

  }, [postData])

  const {state, load} = useLoadElementById<UserProfileValue>(userId, getUserProfileValue)



  // const renderUserProfile = useCallback(({user, posts, isFollowed}: UserProfileValue) => (
  //   <Container>
  //         <ProfileHeader
  //             user={userInfo}
  //             actions={isSelf ? undefined : (
  //                 <FollowActions userId={user ? userId : user.id} isFollowed={isFollowed} onToggle={handleFollowToggle}/>
  //             )}
  //         />
  //         <Feed posts={posts}/>
  //       </Container>
  // ), [isSelf, handleFollowToggle])


  const [isFollowed, setIsFollowed] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])


  const handleFollowToggle = useCallback((userId: string) => {
    userData.toggleFollow(userId, isFollowed)
        .then(() => load())

    setIsFollowed(!isFollowed)
  }, [userData, userId])

  const [userInfo, setUserInfo] = useState(user)

  useEffect(() => {

    if(userId) {
      userData.isFollowed(userId).then(r => { setIsFollowed(r? r : false)})
      postData.getPostsByUser(userId).then(r => setPosts(r))

      if(!isSelf) {

        userData.getUserById(userId).then(r => setUserInfo(r? r: user))

      }else setUserInfo(user)
    }

  }, [userId, isSelf, isFollowed])

  useEffect(() => {

    if(userId) {

      userData.isFollowed(userId).then(r => { setIsFollowed(r? r : false)})

    }


  }, [])

  return (
    <MainFrame title="User profile">
      <Container>
        <ProfileHeader
            user={userInfo}
            actions={isSelf ? undefined : (
                <FollowActions userId={userId ? userId : user.id} isFollowed={isFollowed} onToggle={handleFollowToggle}/>
            )}
        />
        <Feed posts={posts}/>
      </Container>
      {/*<LoadableElement state={state} renderValue={renderUserProfile}/>*/}
    </MainFrame>
  )
}