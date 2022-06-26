import { NewPost, Post, PostData } from '../posts'
import { LocalDataStorage } from './localDataStorage'
import { v4 as uuid } from 'uuid'

export class LocalPostData implements PostData {
  static type: string = 'post'

  constructor(private readonly data: LocalDataStorage<Post>) {}

  getFeedPosts(): Promise<Post[]> {
    return Promise.resolve(this.data.getAll())
  }

  getFullPostById(id: string): Promise<Post | undefined> {
    return Promise.resolve(this.data.getValue(id))
  }

  createPost(newPost: NewPost): Promise<Post> {
    const post = this.createPostFromNewPost(newPost)

    const fullPost: Post = {...post, threadAnswers: []}

    return Promise.resolve(this.data.setValue(fullPost.id, fullPost))
  }

  answerPost(postId: string, answer: NewPost): Promise<Post> {
    const maybePost = this.data.getValue(postId)

    if (maybePost !== undefined) {
      const newPost = {
        ...maybePost,
        threadAnswers: maybePost.threadAnswers ? maybePost.threadAnswers.concat(this.createPostFromNewPost(answer)) : [],
      }

      return Promise.resolve(this.data.setValue(newPost.id, newPost))
    }

    return Promise.reject(`Post ${postId} not found`)
  }

  private createPostFromNewPost = (newPost: NewPost): Post => ({
    id: uuid(),
    ...newPost,
  })

  getPostsByUser(userId: string): Promise<Post[]> {
    const result = this.data.getAllByPredicate(post => post.author === userId)
    return Promise.resolve(result);
  }
}