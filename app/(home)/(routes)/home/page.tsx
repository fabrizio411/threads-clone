'use client'

import { signOut } from "next-auth/react"

const HomePage = () => {
  return (
    <button onClick={() => signOut()}>HomePage</button>
  )
}

export default HomePage