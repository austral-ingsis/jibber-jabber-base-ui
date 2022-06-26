import React from 'react'
import {Route, Routes, useNavigate} from 'react-router-dom'
import { Home } from '../pages/home/home'
import { PostPage } from '../pages/postPage/postPage'
import { UserProfile } from '../pages/userProfile/userProfile'
import {Login} from "./Login";


export const MainRouter = () => {

    const navigate = useNavigate()

  return (
    <Routes>
        {/*PUBLIC*/}
        <Route path={'/'} element={<Login/>}/>
        {/*PRIVATE*/}
        {/*<Route path={'/but'} element={<button onClick={() => navigate('/home')}>To home</button>}/>*/}
        <Route path="/home" element={ <Home/> }/>
        <Route path="/users/:userId" element={ <UserProfile/> }/>
        <Route path="/posts/:postId" element={ <PostPage/> }/>
    </Routes>
  )
}