import React from 'react'

import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router-dom'


function UserDashboard() {
   return (
    <>
    <NavBar/>
      <div className="pt-14">
        <Outlet />
      </div>
    </>
   );
}

export default UserDashboard