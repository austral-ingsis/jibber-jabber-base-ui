
export type Post = {
  id: string
  content: string
  author: string
  threadAnswers?: Post[]
}

export type NewPost = Omit<Post, 'id'>

export interface PostData {
  getFeedPosts(): Promise<Post[]>

  getFullPostById(id: string): Promise<Post | undefined>

  getPostsByUser(userId: string): Promise<Post[]>

  createPost(post: NewPost): Promise<Post>

  answerPost(postId: string, answer: NewPost): Promise<Post>

}
