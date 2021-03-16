import React, { useState } from 'react';
import RatesForm from './RatesForm';
import convertBytes from '../libs/convert/convertBytes';
import useSettings from '../libs//hooks/useSettings';

/**
 * Contains rate forms for the settings page.
 * @returns {React.Component} RatesSection component
 */
function RatesSection() {
  // current values of torrent settings
  const [placeholder, setPlaceholder] = useState({});
  // passed to props to change settings in RatesForms component
  const [settings, setChange] = useSettings(setPlaceholder);

  return (
    <>
      <p className="uk-text-lead uk-text-primary">Torrent Settings</p>
      <div className="uk-child-width-1-2@m" uk-grid="true">
        <div className="section">
          <div className="uk-card uk-card-default uk-card-body">
            <h5 className="uk-card-title">Set Ratios</h5>
            <RatesForm
              params={{
                type: "minratio",
                label: "Min Ratio:",
                placeholder: placeholder.minratio,
                change: setChange,
              }}
            />
            <RatesForm
              params={{
                type: "maxratio",
                label: "Max Ratio:",
                placeholder: placeholder.maxratio,
                change: setChange,
                current: settings.maxratio,
              }}
            />
          </div>
        </div>
        <div className="section">
          <div className="uk-card uk-card-default uk-card-body">
            <h5 className="uk-card-title">Set Rates</h5>
            <RatesForm
              params={{
                type: "download",
                label: "Download Rate (KB):",
                placeholder: placeholder.download === 0 
                  ? 'No Limit' 
                  : `${convertBytes(placeholder.download)}/s`,
                change: setChange,
              }}
            />
            <RatesForm
              params={{
                type: "upload",
                label: "Upload Rate (KB):",
                placeholder: placeholder.upload === 0 
                  ? 'No Limit' 
                  : `${convertBytes(placeholder.upload)}/s`,
                change: setChange,
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default RatesSection;