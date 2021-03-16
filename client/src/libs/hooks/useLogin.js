import { useCallback, useReducer } from 'react';

/**
 * useLogin records the state of the rTfront login form.
 * @returns {[Object, callback]} state and setter for login details
 */
const useLogin = () => {
  const [details, setDetails] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: '',
      password: '',
      checked: false,
    }
  );

  const update = (key, value) => {
    setDetails({[key]: value});
  }
  const dispatch = useCallback(update, []);

  return [details, dispatch];
}

export default useLogin;