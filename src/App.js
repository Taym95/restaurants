import React, { lazy } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { withSuspense } from "./HOC";
import { MyHeader } from "./components";

const Restaurants = lazy(() =>
  import("./containers").then(({ Restaurants }) => ({
    default: Restaurants
  }))
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={withSuspense(Restaurants)} />
      </Switch>
    </BrowserRouter>
  );
};

// I usually user redux with redux-saga for the big apps and centralized state.
// But we don't need to install another library since react has already build-in hooks
// for managing state
// but I can easily re-implement it with redux
const AppContainer = () => (
  <>
    <MyHeader title={"Restaurants"} />
    <Container>
      <Routes />
    </Container>
  </>
);

function App() {
  return <AppContainer />;
}

export default App;
