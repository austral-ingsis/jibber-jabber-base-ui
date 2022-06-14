import React, { ReactNode, useEffect, useState } from 'react'
import { User } from '../data/users'
import { Loading } from '../components/loading'
import { useUserData } from '../data/dataContext'
import { Unauthenticated } from '../components/unauthenticated'
import { isNotUndefined } from '../utils/undefined'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../Keycloak";

export type UserLoaderProps = {
  children: ReactNode
}

type UserLoaderState =
  | {
  status: 'loading'
}
  | {
  status: 'unauthenticated'
}
  | {
  status: 'loaded'
  user: User
}

export const UserLoader = ({children}: UserLoaderProps) => {
  const userData = useUserData()

  const [state, setState] = useState<UserLoaderState>({status: 'loading'})

  useEffect(() => {
    userData.getCurrentUser().then((user) => {
      if (isNotUndefined(user))
        setState({status: 'loaded', user})
      else
        setState({status: 'unauthenticated'})
    })
  }, [])

  switch (state.status) {
    case 'loading':
      return <Loading/>
    case 'unauthenticated':
      return <Unauthenticated/>
    case 'loaded':
      return (
        <ReactKeycloakProvider authClient={keycloak}>
          {children}
        </ReactKeycloakProvider>
      )
  }
}