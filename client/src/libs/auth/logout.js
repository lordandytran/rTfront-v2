import getAuthHeader from './getAuthHeader';
const axios = require('axios').default;

/**
 * Promise call to API for user logout.
 * @returns {Promise} Promise on completion
 */
const logout = async() => new Promise((resolve, reject) => {
  axios({
    method: 'delete',
    url: '/api/auth/logout',
    headers: getAuthHeader(),
  })
  .then(() => {
    // Removes session and refresh token.
    sessionStorage.removeItem('rtfront_session');
    localStorage.removeItem('rtfront_refresh');
    resolve();
  })
  .catch(() => reject());
});

export default logout;