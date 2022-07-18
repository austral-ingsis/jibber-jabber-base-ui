import React, {useEffect} from 'react'
import keycloak from "../Keycloak";
import {isNotUndefined} from "../utils/undefined";

export const Unauthenticated = () => {


    useEffect(() => {
        if(isNotUndefined(keycloak)){
            keycloak.login({
                redirectUri:  'https://jbbrjbbr2202.store/',
            })
        }

    }, [keycloak])

    if(keycloak === undefined){
        return(<div>Keycloak loading...</div>)
    }



  return (
    <div>
      Unauthenticated...
    </div>
  )
}