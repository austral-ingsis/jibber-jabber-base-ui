import {NewPost, Post, PostData} from "../posts";

const apiURL = "http://localhost:8083/posts"

class PostAPI implements PostData {

    answerPost(postId: string, answer: NewPost): Promise<Post> {

        return fetch(`${apiURL}/answerPost/${postId}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(answer)
        }).then(r => (r.json()))

    }

    createPost(post: NewPost): Promise<Post> {

        return fetch(`${apiURL}/addPost`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(post)
        }).then(r => r.json())

    }



    getFeedPosts(): Promise<Post[]> {

        return fetch(`${apiURL}/getAllPosts/`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => {

            return res.json()
        }).then(data => {

            return data.content
        })

    }

    getFullPostById(id: string): Promise<Post | undefined> {

        return fetch(`${apiURL}/getPost/${id}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(r => r.json())

    }

    getPostsByUser(userId: string): Promise<Post[]> {

        return fetch(`${apiURL}/getUserPosts/${userId}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(r => r.json())
            .then(data => {
                return data.content
        })

    }

}

export const postAPI = new PostAPI()