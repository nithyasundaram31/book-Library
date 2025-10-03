import React, { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import { ToastContainer } from 'react-toastify'
import LoginPage from './pages/LoginPage'
import BookTable from './components/BookTable'



import Profile from './components/Profile'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import UserDashboard from './pages/user/UserDashboard'
import UserDashboardPage from './pages/user/UserDashboardPage'
import BookDescription from './pages/user/bookDescription'


function App() {
  return (
    <>
     <Routes>
      {/* Redirect from root to /register */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Actual register route */}
      <Route path="/register" element={<RegisterPage />} />
 <Route path="/login" element={<LoginPage />} />
     
       <Route path="/admin/dashboard" element={< AdminDashboard/>}>
        <Route  index element={<AdminDashboardPage />} /> 
        <Route  path='profile/:id' element={<Profile />} />
         <Route  path='book' element={<BookTable />} />
        </Route>

        <Route path="/user/dashboard" element={< UserDashboard/>}>
        <Route  index element={<UserDashboardPage />} /> 
        <Route  path='profile/:id' element={<Profile />} />
         <Route  path='book/:id' element={<BookDescription />} />
        </Route>
         

         
    </Routes>


    <ToastContainer/>
    </>
   
  )
}

export default App
