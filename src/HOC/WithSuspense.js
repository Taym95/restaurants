import React, { Suspense } from "react";

// This Higher-Order Component implement React.lazy is React's built-in way of lazy loading components.
// With Suspense you can make that lazy loading be smart and know to render a fallback component (or JSX element)
// whilst waiting for that slowly loading chunk for the lazy component.
const withSuspense = WrappedComponent => {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <WrappedComponent {...props} />
    </Suspense>
  );
};

export { withSuspense };
