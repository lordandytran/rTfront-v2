import { useState } from 'react';

/**
 * useLoginError maintains the error code when a user tries to log in.
 * @returns {[string, callback]} error code and setter
 */
const useLoginError = () => {
  const [indexSet, setIndexSet] = useState(new Set());
  const [error, setError] = useState('');

  const errorCodes = [
    'Nope.', 'No!', 'Wrong!', 'You\'re joking', 'Access Denied',
    'Try again.', 'Not even close.', 'Seriously?', 'NO', 'Moron',
    'Incorrect password', 'Fuck off', 'This isn\'t runescape', 'Nah'
  ];

  // maintains set of already used error codes. set will reset once all are used.
  const setErrorCode = () => {
    if (indexSet.size === errorCodes.length) {
      setIndexSet(new Set());
    }
    let index;
    // do while? haven't used this one in any project yet
    do {
      index = ~~(Math.random() * errorCodes.length);
    }
    while (indexSet.has(index) && indexSet.size !== errorCodes.length);
    setIndexSet((prev) => new Set(prev.add(index)));
    setError(errorCodes[index]);
  }

  const dispatch = (value) => {
    if (value || value === '') {
      setError(value);
    }
    else {
      setErrorCode();
    }
  }
  
  return [error, dispatch];
}

export default useLoginError;