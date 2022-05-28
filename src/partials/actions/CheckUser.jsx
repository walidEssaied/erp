import React, {useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserdataContext } from '../context/UserdataContext'

export default function CheckUser() {
    
    const {user} = useContext(UserdataContext)
    const pushTo = useNavigate()

    useEffect(() => {
        if(!user){
            pushTo("/login")
        }
    }, [])
  return (
    <div>
        Loading
    </div>
  )
}
