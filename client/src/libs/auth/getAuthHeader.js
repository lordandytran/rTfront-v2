/**
 * Generates authentication header from session storage.
 * @returns {string}  String header for API HTTP request
 */
const getAuthHeader = () => {
  const storage = sessionStorage.getItem('rtfront_session');
  if (storage) {
    const session = JSON.parse(storage);
    return {
      'Authorization': `Bearer ${session.access_token}:${session.user_id}`,
      'Content-Type': 'application/json',
    }
  }
  else {
    return {};
  }
}

export default getAuthHeader;