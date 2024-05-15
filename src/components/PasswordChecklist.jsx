import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import './PasswordChecklist.css';

const PasswordChecklist = ({ password }) => {
  // Define password requirements
  const requirements = [
    {
      text: 'At least 8 characters long',
      validate: password.length >= 8,
    },
    {
      text: 'Use one or more numbers',
      validate: /[0-9]/.test(password),
    },
    {
      text: 'Use one or more lowercase letters',
      validate: /[a-z]/.test(password),
    },
    {
      text: 'Use one or more uppercase letters',
      validate: /[A-Z]/.test(password),
    },
    {
      text: 'Use one or more special characters',
      validate: /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/.test(password),
    },
  ];

  return (
    <List divided>
      {requirements.map((req, index) => (
        <List.Item key={index}>
          <Icon 
            name={req.validate ? 'circle' : 'circle outline'}
            color={req.validate ? 'green' : 'red'} />
          {req.text}
        </List.Item>
      ))}
    </List>
  );
};

export default PasswordChecklist;
