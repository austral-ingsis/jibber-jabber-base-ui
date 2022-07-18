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
        <Route path={'/home'} element={<Home/>}/>
        <Route path="/users/:userId" element={ <UserProfile/> }/>
        <Route path="/posts/:postId" element={ <PostPage/> }/>
        <Route path={'/*'} element={<Home/>}/>
    </Routes>
  )
}