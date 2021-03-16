const axios = require('axios').default;

/**
 * Promise call to API for user login.
 * @param {string} user Username of user
 * @param {string} pass Password of user
 * @param {boolean} checked Flag to save refresh token in localStorage
 * @returns {Promise} Promise returning success data or error message
 */
const login = async(user, pass, checked) => new Promise((resolve, reject) => {
  axios.post('/api/auth/access', {
    username: user,
    password: pass,
  })
  .then((response) => {
    // Creates session and refresh token on success.
    const data = response.data.data;
    const access = {
      access_token: data.access_token,
      user_id: data.user_id,
    }
    sessionStorage.setItem('rtfront_session', JSON.stringify(access));
    if (checked) {
      const refresh = {
        refresh_token: data.refresh_token,
        user_id: data.user_id,
      }
      localStorage.setItem('rtfront_refresh', JSON.stringify(refresh));
    }
    resolve(data);
  })
  .catch((e) => {
    // Returns error message if unsuccessful.
    let message = '';
    if (e.response.status === 401) {
      message = e.response.data.message;
    }
    else {
      message = 'Server Error. Please try again later.';
    }
    reject({
      message: message,
      error: e.response.status,
    });
  });
});

export default login;