import React from 'react'
import {useSelector} from 'react-redux'

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [loading, setLoading] = React.useState(true)

  const {user} = useSelector((state) => state.auth)

  React.useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }

    setLoading(false)
  }, [user])

  return {loggedIn, loading}
}