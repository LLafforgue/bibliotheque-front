import React from 'react'

interface Props {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}


export default function Login ({setEmail, setPassword}:Props) {
    return <div>Login</div>
}