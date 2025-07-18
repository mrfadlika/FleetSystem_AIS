import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomeScreen from '../components/views/home/HomeScreen'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ProfileScreen from '../components/views/profile/ProfileScreen'
import History from '../components/views/history/History'

function RouteIndex() {
  return (
    <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/history' element={<History />} />
    </Routes>
  )
}

export default RouteIndex;
