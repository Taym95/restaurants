import React from "react";
import { Header } from "semantic-ui-react";

const MyHeader = React.memo(({ title }) => {
  return (
    <Header as="h3" block data-testid="header">
      {title}
    </Header>
  );
});

export { MyHeader };
