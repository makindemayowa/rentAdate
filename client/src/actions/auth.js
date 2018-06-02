/* global localStorage */
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import * as actionTypes from './actionType';

/**
 * Create an action to set currently logged in user
 *
 * @export
 * @param {object} loggedInUser
 * @returns {object} type payload
 */
export function setUser(loggedInUser) {
  return {
    type: actionTypes.SET_CURRENT_USER,
    loggedInUser
  };
}

export function success() {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
  };
}

/**
 * Request to the API to login a user
 *
 * @export
 * @param {any} userData The details of the user to be logged in
 * @returns {object} dispatch object
 */
export function userLoginRequest(userData) {
  return dispatch => axios.post('/api/login', userData).then((res) => {
    const token = res.data.jsonToken;
    localStorage.setItem('tmo_token', token);
    const loggedInUser = jwtDecode(token).userDetails;
    dispatch(setUser(loggedInUser));
  });
}

/**
 * Request to the API to create a new user
 *
 * @export
 * @param {object} userData
 * @returns {object} dispatch object
 */
export function userSignUpRequest(userData) {
  return dispatch =>
    axios.post('/api/signup', userData).then((res) => {
      dispatch(success());
    });
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function updateUserDetails(id, userDetails) {
  return dispatch =>
    axios.put(`/api/v1/users/${id}`, userDetails).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('token', token);
      const loggedInUser = jwtDecode(token).userDetails;
      dispatch(setUser(loggedInUser));
    });
}

/**
 * Request to the API to update an existing user
 *
 * @export
 * @param {number} id
 * @param {object} userDetails
 * @returns {object} dispatch object
 */
export function verifyUserRequest(token) {
  return dispatch =>
    axios.get(`/api/signup/verify/${token}`).then((res) => {
      const token = res.data.jsonToken;
      localStorage.setItem('tmo_token', token);
      const loggedInUser = jwtDecode(token).userDetails;
      dispatch(setUser(loggedInUser));
    });
}

/**
 * Request to delete user token from localStorage
 *
 * @export
 * @returns {object} - remove token
 */
export function logout() {
  return (dispatch) => 
    Promise.resolve(localStorage.removeItem('tmo_token')).then(() => {
      dispatch({ type: actionTypes.LOGOUT });
    })
  ;
}