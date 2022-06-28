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

    return (
        <ReactKeycloakProvider authClient={keycloak} onTokens={(token) => {if(token.token) sessionStorage.setItem("token", token.token )}}>
            <DataContext.Provider value={dataContainer}>
                {/*<UserLoader>*/}
                    <BrowserRouter>
                        <MainRouter/>
                    </BrowserRouter>
                {/*</UserLoa der>*/}
            </DataContext.Provider>
        </ReactKeycloakProvider>
    )
}
