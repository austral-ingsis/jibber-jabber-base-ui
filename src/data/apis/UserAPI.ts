import {User, UserData} from "../users";
import keycloak from "../../Keycloak";

const apiURL = "http://localhost:8080/follows"


class UserAPI implements UserData {

    getCurrentUser(): Promise<User | undefined> {

        const u = sessionStorage.getItem("user")

        if(u) return Promise.resolve(JSON.parse(u))

        const sessionToken = sessionStorage.getItem("tokenParsed")

        if(sessionToken) {

            const t = JSON.parse(sessionToken)

            const user : User = {

                id: t.sub,
                displayName: t.given_name + " " + t.family_name,
                username: t.preferred_username

            }

            sessionStorage.setItem("user", JSON.stringify(user))

            return Promise.resolve(user);

        }

        const kc = keycloak.tokenParsed

        if(kc?.sub) {

            const user : User = {

                id: kc.sub,
                displayName: kc?.given_name + " " + kc?.family_name,
                username: kc?.preferred_username

            }

            sessionStorage.setItem("user", JSON.stringify(user))


            return Promise.resolve(user);

        }

        return Promise.resolve(undefined)

    }

    getUserById(userId: string): Promise<User | undefined> {

        try {

            return fetch(`http://localhost:8087/auth/admin/realms/JibberJabber/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem("token")
                }
            }).then(r => r.json())
                .then(data => {

                    return {
                        id: data.id,
                        displayName: data.firstName + " " + data.lastName,
                        username: data.username
                    }})

        } catch(err) {
            console.log(err)

            return this.getCurrentUser()
        }



    }

    isFollowed(userId: string): Promise<boolean | undefined> {

        const u = sessionStorage.getItem("user")

        return fetch(`${apiURL}/getIsFollowing`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                followerUserId: u? JSON.parse(u).userId : "",
                followedUserId: userId
            }
            )
        }).then(r => r.json()).then(data => {
            console.log(data)
            return data
        })
    }

    toggleFollow(userId: string): Promise<void> {

        const u = sessionStorage.getItem("user")

        return fetch(`${apiURL}/toggleFollow`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                followerUserId: u? JSON.parse(u).userId : "",
                followedUserId: userId
            })
        }).then(r => r.json())

    }

    getFollowing(id: string): Promise<string[]> {

        return fetch(`${apiURL}/getFollowing/${id}`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(res => res.json())

    }


}

export const userAPI = new UserAPI()