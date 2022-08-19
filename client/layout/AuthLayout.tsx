import React, { ReactNode } from 'react'

interface IAuthLayout{
    children:ReactNode
}
const AuthLayout = ({children}:IAuthLayout) => {
  return (
    <div className={`w-[95%] mx-auto max-w-2xl bg-primary text-white`}>

        {children}
    </div>
  )
}

export default AuthLayout