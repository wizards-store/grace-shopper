import React from 'react';
import { Link } from 'react-router-dom';

// doesn't use props (or Link component)
// can make it one line and omit the return statement
// uncessary div (unless its for styling purposes)
const GeneralHome = props => {
  return (
    <div>
      <h2>Welcome to the Wizard Supply Shop!</h2>
    </div>
  );
};

export default GeneralHome;
