import { createContext, useContext } from 'react'

import { PostData} from './posts'
import { UserData } from './users'
import {userAPI} from "./apis/UserAPI";
import {postAPI} from "./apis/PostAPI";

export interface DataContainer {
  posts: PostData
  users: UserData
}

export const DataContext = createContext<DataContainer>({
  posts: postAPI,
  users: userAPI,
})

export const usePostData = (): PostData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.posts
}

export const useUserData = (): UserData => {
  const dataContainer = useContext(DataContext)
  return dataContainer.users
}