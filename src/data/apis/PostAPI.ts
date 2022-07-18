import {NewPost, Post, PostData} from "../posts";
import keycloak from "../../Keycloak";

const apiURL = "https://jbbrjbbr2202.store/posts"

class PostAPI implements PostData {

    answerPost(postId: string, answer: NewPost): Promise<Post> {

        let token

        if(keycloak.token) token = keycloak.token
        else if(sessionStorage.getItem("token")) token = sessionStorage.getItem("token")


        return fetch(`${apiURL}/answerPost/${postId}`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(answer)
        }).then(r => (r.json()))

    }

    createPost(post: NewPost): Promise<Post> {

        let token

        if(keycloak.token) token = keycloak.token
        else if(sessionStorage.getItem("token")) token = sessionStorage.getItem("token")


        return fetch(`${apiURL}/addPost/`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + token
            },
            body: JSON.stringify(post)
        }).then(r => r.json())

    }



    getFeedPosts(): Promise<Post[]> {

        console.log(keycloak)

        let token

        if(sessionStorage.getItem("token")) token = sessionStorage.getItem("token")

        console.log(token)

        return fetch(`${apiURL}/getAllPosts/`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + token
            }
        }).then(res => {

            return res.json()
        }).then(data => {

            return data.content
        })

    }

    getFullPostById(id: string): Promise<Post | undefined> {

        let token

        if(keycloak.token) token = keycloak.token
        else if(sessionStorage.getItem("token")) token = sessionStorage.getItem("token")


        return fetch(`${apiURL}/getPost/${id}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + token
            }
        }).then(r => r.json())

    }

    getPostsByUser(userId: string): Promise<Post[]> {

        let token

        if(keycloak.token) token = keycloak.token
        else if(sessionStorage.getItem("token")) token = sessionStorage.getItem("token")


        return fetch(`${apiURL}/getUserPosts/${userId}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                'Authorization' : 'Bearer ' + token
            }
        }).then(r => r.json())
            .then(data => {
                return data.content
        })

    }

}

export const postAPI = new PostAPI()