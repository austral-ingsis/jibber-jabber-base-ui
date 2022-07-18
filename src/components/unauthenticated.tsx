import React, {useEffect} from 'react'
import keycloak from "../Keycloak";
import {isNotUndefined} from "../utils/undefined";

export const Unauthenticated = () => {


    useEffect(() => {
        let success = false
        while(!success){
            try {
                keycloak.login({
                    redirectUri: 'https://jbbrjbbr2202.store/',
                })
                success = true
            }catch (e) {
                success = false
                console.log(e)
            }
        }


    }, [])

    if(keycloak === undefined){
        return(<div>Keycloak loading...</div>)
    }



  return (
    <div>
      Unauthenticated...
    </div>
  )
}