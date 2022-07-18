import React, {useEffect, useState} from 'react'
import keycloak from "../Keycloak";
// import {useNavigate} from "react-router-dom";

export const Unauthenticated = () => {

    const [tries, setTries] = useState(0)
    // const navigate = useNavigate()


    useEffect(() => {
            try {
                keycloak.login({
                    redirectUri: 'https://jbbrjbbr2202.store/home',
                })
            }catch (e) {
                console.log(e)
                setTries(tries+1)
                console.log(tries)
            }


    }, [tries])


    if(keycloak === undefined){
        return(<div>Keycloak loading...</div>)
    }



  return (
    <div>
      Unauthenticated...
    </div>
  )
}