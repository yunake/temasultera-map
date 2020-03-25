import React from 'react'

import { createComponentWithAuth } from '../../api/firebase'


function SignIn({ loading, user, signOut, signInWithGoogle }) {
  return (
    <div>
      {
        loading && <h2>Loading..</h2>
      }

      {
        user
          ? <h1>Hello, {user.displayName}</h1>
          : <h1>Log in</h1>
      }

      {
        user
          ? <button onClick={signOut}>Sign out</button>
          : <button onClick={signInWithGoogle}>Sign in with Google</button>
      }
    </div>
  )
}

export default createComponentWithAuth(React.memo(SignIn))