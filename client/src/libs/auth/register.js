const axios = require('axios').default;

/**
 * Promise call to API for user registration.
 * @param {string} user Chosen username
 * @param {string} pass Chosen password
 * @param {string} [code] Secret code to verify user account
 * @returns {Promise} Promise on completion
 */
const register = async (user, pass, code) => new Promise((resolve, reject) => {
  const body = {
    username: user,
    password: pass,
    verified: code,
  }
  axios.post('/api/auth/register', body)
  .then(() => {
    resolve();
  })
  .catch((e) => {
    reject({
      message: 'Could not register.',
      error: e.response.status,
    });
  });
});

export default register;