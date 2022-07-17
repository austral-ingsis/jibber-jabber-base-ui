import {NewPost, Post, PostData} from "../posts";
import axios from "axios";
import UserService from "../../utils/userService";
import _kc from "../../main/Keycloak";


const jjAxios = axios.create({
    baseURL: "https://jbbrjbbr2202.store/posts",
    headers: {
        "Content-type": "application/json"
    }
})

class PostAPI implements PostData {

    answerPost(postId: string, answer: NewPost): Promise<Post> {

        return jjAxios.post<NewPost, Post>(`/answerPost/${postId}`, answer)

    }

    createPost(post: NewPost): Promise<Post> {

        return jjAxios.post<NewPost, Post>("/addPost", post)

    }

    getFeedPosts(): Promise<Post[]> {

        console.log(UserService.getToken())

        return jjAxios.get('/getAllPosts').then(response => response.data.content)

    }

    getFullPostById(id: string): Promise<Post | undefined> {

        return jjAxios.get(`/getPost/${id}`).then(response => response.data.content)

    }

    getPostsByUser(userId: string): Promise<Post[]> {

        return jjAxios.get(`/getUserPosts/${userId}`)

    }

}

jjAxios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
        const cb = () => {
            // @ts-ignore
            config.headers.Authorization = `Bearer ${UserService.getToken()}`;
            return Promise.resolve(config);
        };
        return UserService.updateToken(cb);
    }
});

export const postAPI = new PostAPI()