import React, { useState } from 'react'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { IoNotificationsOutline } from 'react-icons/io5'
import { MdAccountCircle } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function NavBar() {
    const navigate = useNavigate()
    const storeUser = JSON.parse(localStorage.getItem("user"))
    console.log(storeUser)

    const [openDropdown, setOpenDropdown] = useState(false)

    const toggleDropdown = () => setOpenDropdown(!openDropdown)

    const handleLogout = () => {
        localStorage.removeItem("user")
        navigate("/login")
        toast.success("Logout Successful")
    }

    return (
        <>
            {storeUser?.role === 'admin' ? (
              
                <div className='fixed z-[10] w-full'>
                    <div className='w-full h-16 bg-gray-100 shadow p-4 flex justify-between items-center'>
                        {/* Left side */}
                        <div className='flex items-center gap-2'>
                            <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full" />
                            <div className='hidden md:block text-xl font-semibold'>
                                Book Library Admin Panel
                            </div>
                        </div>

                        {/* Middle links */}
                        <div className='flex gap-2'>
                            <Link to='' className='font-semibold hover:text-orange-500'>Home</Link>
                            <Link to='/admin/dashboard/book' className='font-semibold hover:text-orange-500'>Library</Link>
                        </div>

                        {/* Right side */}
                        <div className='flex items-center gap-4'>
                            <IoNotificationsOutline size={22} />
                            <div className='text-orange-500 font-semibold'>
                                Hi, {storeUser.name.toUpperCase()}
                            </div>
                            <MdAccountCircle className='w-10 h-10 text-2xl cursor-pointer' title="Profile" />
                            <FaChevronDown onClick={toggleDropdown} className='cursor-pointer' />

                            {openDropdown && (
                                <div className='bg-white shadow p-4 w-[150px] absolute z-20 top-16 right-4 flex flex-col'>
                                    <Link to={`/admin/dashboard/profile/${storeUser.id}`} className='mb-2 font-semibold hover:text-orange-500 cursor-pointer'>
                                        Profile
                                    </Link>
                                    <hr className='mb-2' />
                                    <button onClick={handleLogout} className='text-left font-semibold hover:text-orange-500 cursor-pointer'>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
               
                <div className='fixed z-[10] w-full'>
                    <div className='w-full h-16 bg-gray-100 shadow p-4 flex justify-between items-center'>
                        {/* Left side */}
                        <div className='flex items-center gap-2'>
                            <img src="/logo.png" alt="Logo" className="w-16 h-16 rounded-full" />
                            <div className='hidden md:block text-xl font-semibold'>
                                Book Library 
                            </div>
                        </div>

                        {/* Right side */}
                        <div className='flex items-center gap-4'>
                            <IoNotificationsOutline size={22} />
                            <div className='text-orange-500 font-semibold'>
                                Hi, {storeUser.name.toUpperCase()}
                            </div>
                            <MdAccountCircle className='w-10 h-10 text-2xl cursor-pointer' title="Profile" />
                            <FaChevronDown onClick={toggleDropdown} className='cursor-pointer' />

                            {openDropdown && (
                                <div className='bg-white shadow p-4 w-[150px] absolute z-20 top-16 right-4 flex flex-col'>
                                    <Link to={`/user/dashboard/profile/${storeUser.id}`} className='mb-2 font-semibold hover:text-orange-500 cursor-pointer'>
                                        Profile
                                    </Link>
                                    <hr className='mb-2' />
                                    <button onClick={handleLogout} className='text-left font-semibold hover:text-orange-500 cursor-pointer'>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default NavBar
