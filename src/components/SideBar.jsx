import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const SideBar = ({ endpoints, visible, onClose }) => {
  return (
    <Sidebar
        as={Menu}
        animation="overlay"
        direction="right"
        visible={visible}
        vertical
    >
        {endpoints.map((endpoint, index) => (
            <Menu.Item key={index}>
            <Link to={endpoint.path} onClick={onClose}>
                {endpoint.label}
            </Link>
            </Menu.Item>
        ))}
    </Sidebar>
  );
};

export default SideBar;
