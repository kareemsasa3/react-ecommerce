import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <Loader active inline="centered" size="large">
        Loading...
      </Loader>
    </div>
  );
};

export default LoadingScreen;
