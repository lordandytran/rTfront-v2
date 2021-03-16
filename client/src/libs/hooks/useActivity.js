import { useContext, useEffect } from 'react';
import { ActiveContext } from '../../components/ActiveContext';

/**
 * useActivity hook changes the ActiveContext on all sessions
 * on a changing event. Setting and destroying a window storage
 * object will fire the hook.
 */
const useActivity = () => {
  const [, setActive] = useContext(ActiveContext);

  useEffect(() => {
    // Different sessions will listen for the event key to change the context
    window.addEventListener('storage', (event) => {
      if (event.key === 'RT_TORRENT_EVENT') {
        setActive(false);
        setActive(true);
      }
    });
  }, [setActive]);
}

export default useActivity;