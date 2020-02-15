import React from "react";
import { Menu, Sidebar, Input } from "semantic-ui-react";

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
        Filters
      </Menu.Item>
      <Menu.Item>
        <Input focus placeholder="Search..." />
      </Menu.Item>
    </Sidebar>
  );
};

export { Filter };
