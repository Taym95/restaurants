import React from "react";
import { Menu, Sidebar } from "semantic-ui-react";

const Filter = () => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      vertical
      visible={true}
    >
      <Menu.Item as="a" header>
        Filter
      </Menu.Item>
      <Menu.Item as="a">Share on Social</Menu.Item>
      <Menu.Item as="a">Share by E-mail</Menu.Item>
      <Menu.Item as="a">Edit Permissions</Menu.Item>
      <Menu.Item as="a">Delete Permanently</Menu.Item>
    </Sidebar>
  );
};

export { Filter };
