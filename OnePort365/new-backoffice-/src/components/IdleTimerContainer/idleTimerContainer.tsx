import React, { useState, useRef } from 'react';
import { connect, useSelector } from "react-redux";
import { IdleTimerProvider } from 'react-idle-timer';
import AutoLogoutModal from 'components/autoLogoutModal/autoLogout';


const IdleTimerContainer = () => {
    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
    // console.log(admin_data);


    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [isLoggedOut, setIsLoggedOut] = useState(false)
    const idleTimerRef = useRef(null)
    const sessionTimeoutRef: any = useRef(null)


    const onIdle = () => {
        console.log('user is idle')
        setIsOpen(true);
        sessionTimeoutRef.current = setTimeout(logOut, 1000)
    }

    const stayActive = () => {
        setIsOpen(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('User is active')
    }

    const logOut = () => {
        setIsOpen(false)
        setIsLoggedIn(false)
        clearTimeout(sessionTimeoutRef.current)
        console.log('User has logged out')
        window.localStorage.removeItem('token')
        window.location.replace('/dashboard')
        // window.location.reload()
    }

    return (
        <div>
            {
                isLoggedIn ? "" : ""
            }
            <AutoLogoutModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                logOut={logOut}
                stayActive={stayActive}
            />
            {/* {
                admin_data.token == localStorage
                ? 
                <AutoLogoutModal 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen}
                    logOut={logOut}
                    stayActive={stayActive}
                />
                :
                <></>
            } */}

            <IdleTimerProvider
                ref={idleTimerRef}
                timeout={43200 * 1000}
                onIdle={onIdle}
            >
            </IdleTimerProvider>
        </div>
    )
}

export default IdleTimerContainer