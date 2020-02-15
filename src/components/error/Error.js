import React from "react";
import { Segment } from "semantic-ui-react";

const Error = ({ error }) => (
  <Segment inverted color="red" tertiary>
    {error}
  </Segment>
);

export { Error };
