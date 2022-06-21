import { User } from '../../data/users'
import { createContext, useContext } from 'react'
import keycloak from "../../Keycloak";

export const UserContext = createContext<User>(undefined as unknown as User)

export const useUserContext = () => {

    const kc = keycloak.tokenParsed

    console.log(kc)

    const u = sessionStorage.getItem("user")

    console.log(u)


    if(kc?.sub) {

        //si hay tokenparsed se usa eso

        const user: User = {

            id: kc.sub,
            displayName: kc?.given_name + " " + kc?.family_name,
            username: kc?.preferred_username

        }

        sessionStorage.setItem("user", JSON.stringify(user))

        return useContext(createContext<User>(user))

    } else if (u) {

        //si no hay tokenParsed pero hay sessionStorage se usa eso
        return useContext(createContext<User>(JSON.parse(u)))

    }else {

        return useContext(UserContext)

    }


}