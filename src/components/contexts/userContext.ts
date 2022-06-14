import { User } from '../../data/users'
import { createContext, useContext } from 'react'
import keycloak from "../../Keycloak";

export const UserContext = createContext<User>(undefined as unknown as User)

export const useUserContext = () => {

    const kc = keycloak.tokenParsed

    const user : User = {

        id: kc?.sub ? kc.sub : '',
        displayName: kc?.given_name + " " + kc?.family_name,
        username: kc?.preferred_name

    }

    return user

}