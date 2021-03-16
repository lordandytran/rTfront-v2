import React, { useEffect, useState } from 'react';
import getUpdateInterval from '../libs/settings/getUpdateInterval';
import setUpdateInterval from '../libs/settings/setUpdateInterval';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Form to update the torrent update interval.
 * @returns {React.Component} IntervalSection component
 */
function IntervalSection() {
  const [change, setChange] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [update, setUpdate] = useState('');

  // gets interval on render and updates when change state is modified
  useEffect(() => {
    getUpdateInterval()
    .then((result) => setPlaceholder(`${result} ms`))
    .catch(() => {
      console.log('Unable to retrieve update interval.');
      setPlaceholder(Number.NaN);
    })
  }, [change]);

  function submitForm(event) {
    event.preventDefault();
    const notyf = new Notyf();
    setUpdateInterval(Number(update))
    .then(() => {
      setUpdate('');
      // modifies change state to update current interval
      setChange((prev) => !prev);
      notyf.success('Interval successfully changed.');
    })
    .catch(() => {
      notyf.error('Unable to change settings.');
    })
  }

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <h5 className="uk-card-title">Set Update Interval</h5>
      <form 
        className="uk-form-horizontal uk-margin-medium-top" 
        onSubmit={submitForm}
        >
        <div className="uk-flex uk-flex-left">
          <label 
            className="uk-form-label uk-text-nowrap">Interval (ms):
          </label>
          <input required
            type="text"
            className="uk-input"
            placeholder={`Current: ${placeholder}`}
            value={update}
            onChange={(e) => {
              if (isFinite(e.target.value)) {
                setUpdate(e.target.value);
              }
            }}
          />
          <button 
            type="submit" 
            className="uk-button uk-button-primary">Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default IntervalSection;