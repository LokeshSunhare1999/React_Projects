import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../redux/actions/UserAction/usersAction';
import Card from './CardComponent';
import * as routes from "../Router/RoutesURL";

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const logOut = () => {
    localStorage.setItem("login", false)
    navigate(routes.LOG_IN)
  }

  return (
    <>
      <button type="button" className="btn btn-danger" onClick={logOut}>Danger</button>
      {users.loading && <p>Loading...</p>}
      {users.length > 0 && users.map((user) => (
        <Card user={user} key={user.id} />
      ))}
      {users.length === 0 && !loading && <p>No users available!</p>}
      {error && !loading && <p>{error}</p>},
    </>
  )
}

export default Users;