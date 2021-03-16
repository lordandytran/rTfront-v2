import React, { useState } from 'react';
import setRates from '../libs/settings/setRates'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

/**
 * Settings form for rate changes.
 * @param {Object} props Props containing form settings
 * @param {Object} props.params Contains form settings
 * @param {string} props.params.type Type of setting
 * 'minratio' || 'maxratio' || 'upload' || 'download
 * @param {string} props.params.label Label of current placeholder
 * @param {string} props.params.placeholder Value of form placeholder
 * @param {callback} props.params.change Indicates value change forcing update 
 * @returns {React.Component} RatesForm component
 */
function RatesForm(props) {
  const [form, setForm] = useState(undefined);

  function submitSetting(event) {
    event.preventDefault();
    const notyf = new Notyf();
    setRates(props.params.type, parseFloat(form))
    .then(() => {
      props.params.change((prev) => !prev);
      setForm(undefined);
      notyf.success('Setting successfully changed.');
    })
    .catch(() => notyf.error('Unable to change settings.'))
  }

  return (
    <form 
      className="uk-form-horizontal uk-margin-medium-top" 
      onSubmit={submitSetting}
      >
      <div className="uk-flex uk-flex-left">
        <label 
          className="uk-form-label uk-text-nowrap">{props.params.label}
        </label>
        <input required
          type="text"
          className="uk-input"
          placeholder={`Current: ${props.params.placeholder}`}
          value={form || ''}
          onChange={(e) => {
            if (isFinite(e.target.value)) {
              setForm(e.target.value);
            }
          }}
        />
        <button 
          type="submit" 
          className="uk-button uk-button-primary">Submit
        </button>
      </div>
    </form>
  )
}

export default RatesForm;