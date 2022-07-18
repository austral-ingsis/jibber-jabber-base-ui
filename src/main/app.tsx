import * as React from 'react'
import {useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'

import {DataContainer, DataContext} from '../data/dataContext'
import {MainRouter} from './mainRouter'
import {createDataContainer} from './dataContainerInitializer'
import keycloak from "../Keycloak";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {postAPI} from "../data/apis/PostAPI";
import {userAPI} from "../data/apis/UserAPI";
import {User} from "../data/users";
import {UserLoader} from "./userLoader";


export const App = () => {
    // const [dataContainer, setDataContainer] = useState<DataContainer>()

    const dataContainer = {
        posts: postAPI,
        users: userAPI
    }

    useEffect(() => {

        // createDataContainer()
        //     .then(container => setDataContainer(container))

    }, [])
    //
    // if (dataContainer === undefined)
    //     return (<div>Loading ...</div>)
    //

    if(keycloak === undefined){
        return(<div>Keycloak loading...</div>)
    }

    return (
        <ReactKeycloakProvider authClient={keycloak} onTokens={(token) => {

            console.log(token.token)
            if(token.token) sessionStorage.setItem("token", token.token )
            console.log(keycloak.tokenParsed)

            const kc = keycloak.tokenParsed

            if(kc?.sub){
                const user: User = {

                    id: kc?.sub,
                    displayName: kc?.given_name + " " + kc?.family_name,
                    username: kc?.preferred_username

                }

                sessionStorage.setItem("user", JSON.stringify(user))
            }

        }}>
            <DataContext.Provider value={dataContainer}>
                <UserLoader>
                    <BrowserRouter>
                        <MainRouter/>
                    </BrowserRouter>
                </UserLoader>
            </DataContext.Provider>
        </ReactKeycloakProvider>
    )
}
