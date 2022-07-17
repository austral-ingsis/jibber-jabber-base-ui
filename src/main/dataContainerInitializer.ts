import { DataContainer } from '../data/dataContext'
import { LocalPostData } from '../data/localStorage/localPostData'
import { User } from '../data/users'
import { LocalDataStorage } from '../data/localStorage/localDataStorage'
import { LocalUserData } from '../data/localStorage/localUserData'
import {Post} from "../data/posts";
import {userAPI} from "../data/apis/UserAPI";
import {postAPI} from "../data/apis/PostAPI";

const initialUsers: User[] = [
  {
    id: '806a7f05-479c-4e43-9554-27c3af4d973c',
    displayName: 'Bird Person',
    username: 'little_bird',
  },
  {
    id: '56892d6a-fd7c-4c1c-9fc6-1554c2243fdc',
    displayName: 'Joe Doe',
    username: 'joedoe',
  },
  {
    id: '85ce0a1e-cd98-4c64-bb12-14bbc1a1f36e',
    displayName: 'Homer',
    username: 'homer',
  },
]

const initialPosts: Post[] = [
  {
    id: 'bb558482-6bc9-4529-9551-0a1141741627',
    author: initialUsers[1].id,
    content: 'Really great',
    threadAnswers: [],
  },
  {
    id: '28c0143f-12d7-41e9-85e5-8eb813339862',
    author: initialUsers[1].id,
    content: 'I\'m great',
    threadAnswers: [
      {
        id: '32beae9b-d3af-45bc-88f8-4cb792c95a09',
        author: initialUsers[0].id,
        content: 'Not that great...',
      },
    ],
  },
  {
    id: '700e1d1a-fcc7-4389-9d2e-159f8419da53',
    author: initialUsers[2].id,
    content: 'Doh!',
    threadAnswers: [],
  },
]

export const createDataContainer = (): Promise<DataContainer> => {

  const postStorage = new LocalDataStorage<Post>(LocalPostData.type)

  if (postStorage.getAll().length === 0)
    initialPosts.forEach(post => postStorage.setValue(post.id, post))

  const userStorage = new LocalDataStorage<User>(LocalUserData.type)
  if (userStorage.getAll().length === 0)
    initialUsers.forEach(user => userStorage.setValue(user.id, user))

  return Promise.resolve({
    posts: postAPI,
    users: userAPI,
  })
}