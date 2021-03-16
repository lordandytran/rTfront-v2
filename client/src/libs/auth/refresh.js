import getRefreshHeader from './getRefreshHeader';
const axios = require('axios').default;

/**
 * Promise call to API to reauthenticate user using stored refresh token.
 * @returns {Promise} Promise returning success data or error message 
 */
const refresh = async() => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: '/api/auth/refresh',
    headers: getRefreshHeader(),
  })
  .then((response) => {
    // Creates new session and refresh token on success.
    const data = response.data.data;
    const access = {
      access_token: data.access_token,
      user_id: data.user_id,
    }
    sessionStorage.setItem('rtfront_session', JSON.stringify(access));
    const refresh = {
      refresh_token: data.refresh_token,
      user_id: data.user_id,
    }
    localStorage.setItem('rtfront_refresh', JSON.stringify(refresh));
    resolve(data);
  })
  .catch((e) => {
    reject({
      message: 'Unable to retrieve tokens.',
      error: e.response.status,
    });
  });
});

export default refresh;