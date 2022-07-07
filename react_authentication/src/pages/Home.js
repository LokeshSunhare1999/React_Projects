import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logoutInitiate } from '../redux/action';

function Home() {

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
/**
 * this func. is despatching action
 */
  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate());
    }
  }
  return (
    <div>
      <h1>Home Page</h1>
      <br />
      <button className='btn btn-danger' onClick={handleAuth}>Logout</button>
    </div>
  )
}

export default Home
