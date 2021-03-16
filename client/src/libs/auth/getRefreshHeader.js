/**
 * Generates authentication header from local storage.
 * @returns {string}  String header for API HTTP request
 */
const getRefreshHeader = () => {
  const storage = localStorage.getItem('rtfront_refresh');
  if (storage) {
    const session = JSON.parse(storage);
    return {
      'Authorization': `Bearer ${session.refresh_token}:${session.user_id}`,
      'Content-Type': 'application/json',
    }
  }
  else {
    return {};
  }
}

export default getRefreshHeader;