import TekoID from 'teko-oauth2';
import { browserHistory } from 'helpers';

const isLoggedIn = () => {
  return TekoID.user.isLoggedIn();
};

const login = () => {
  TekoID.user.login();
};

const logout = () => {
  // Tracking - Reset userId when logged out
  track('resetUserId');

  TekoID.user.logout(window.location.origin);
};

const getAccessToken = () => {
  return TekoID.user.getAccessToken();
};

const getUserInfo = () => {
  return TekoID.user.getUserInfo();
};

const getFullUserInfo = async () => {
  const fullUserInfo = await TekoID.user.getFullUserInfo();
  return fullUserInfo;
};

const denyAccess = () => {
  browserHistory.push('/403');
};

export default {
  isLoggedIn,
  login,
  logout,
  getAccessToken,
  getUserInfo,
  getFullUserInfo,
  denyAccess,
};
