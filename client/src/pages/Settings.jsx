import React from 'react';
import DirectorySection from '../components/DirectorySection';
import IntervalSection from '../components/IntervalSection';
import RatesSection from '../components/RatesSection';

/**
 * Settings page.
 * @returns {React.Component} Settings page component
 */
function Settings() {

  return (
    <div className="home-page">
      <div className="uk-margin-large-left uk-margin-large-top uk-margin-large-right">
        <RatesSection />
        <div className="uk-child-width-1-2@m" uk-grid="true">
          <div className="section">
            <DirectorySection />
          </div>
          <div className="section">
            <IntervalSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;