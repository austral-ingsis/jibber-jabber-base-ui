import React, {useEffect} from 'react'
import keycloak from "../Keycloak";

export const Unauthenticated = () => {


    useEffect(() => {
            try {
                keycloak.login({
                    redirectUri: 'https://jbbrjbbr2202.store/',
                })
            }catch (e) {
                console.log(e)
                keycloak.login({
                    redirectUri: 'https://jbbrjbbr2202.store/',
                })
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