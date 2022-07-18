import {useEffect} from "react";
import keycloak from "../Keycloak";
import {useNavigate} from "react-router-dom";
import React from "react";
import {User} from "../data/users";


export const Login = () => {

    const navigate = useNavigate()

    const redirect = () => {

        keycloak.login( {
            redirectUri:  'https://jbbrjbbr2202.store/home',

        } ).then(() => {

            const kc = keycloak.tokenParsed

            const user = {

                id: kc.sub,
                displayName: kc?.given_name + " " + kc?.family_name,
                username: kc?.preferred_username

            }

            sessionStorage.setItem("user", JSON.stringify(user))
            // navigate('/home')
        })

    }


    useEffect(() => {

        if(keycloak.authenticated) {

            const kc = keycloak.tokenParsed

            while(!sessionStorage.getItem("user")) {

                if (kc?.sub) {

                    const user = {

                        id: kc.sub,
                        displayName: kc?.given_name + " " + kc?.family_name,
                        username: kc?.preferred_username

                    }

                    sessionStorage.setItem("user", JSON.stringify(user))

                }

            }


            // setTimeout(() => navigate('/home'), 1000)

            navigate("/home")


        }else{

            keycloak.login( {
                redirectUri:  'https://jbbrjbbr2202.store/home',

            } ).then(() => {

                const kc = keycloak.tokenParsed

                const user = {

                    id: kc.sub,
                    displayName: kc?.given_name + " " + kc?.family_name,
                    username: kc?.preferred_username

                }

                sessionStorage.setItem("user", JSON.stringify(user))
                // navigate('/home')
            })

        }

    })

    return (
        <div>

        </div>
    )

}
