/**
 * Gets session information from session storage.
 * @returns {Object} Object containing session token and user id
 */
const getSessionToken = () => {
  const storage = sessionStorage.getItem('rtfront_session');
  if (storage) {
    return JSON.parse(storage);
  }
  else {
    return {};
  }
};

export default getSessionToken;