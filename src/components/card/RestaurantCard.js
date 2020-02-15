import React from "react";
import { Card, Responsive, Image, Button, Icon } from "semantic-ui-react";
import { takeaway } from "../../assets";
import { favorite } from "../../actions";

// We can speed up the component re-rendring process
// by using React.memo(), wih will memoized our component
// This is performance optimisation feature for function component.
// React.memo is higher order component. This component is similar to React.PureComponent.
const RestaurantCard = React.memo(
  ({
    id,
    name,
    image,
    status,
    isFavorite,
    sortingValues,
    sortingValue,
    dispatch
  }) => {
    const favoriteRestaurant = () => {
      favorite(id, dispatch);
    };
    return (
      <Responsive>
        <Card data-testid="restaurant-card">
          <Image src={takeaway} wrapped ui={false} />
          <Card.Content>
            <Responsive>
              <Card.Header>{`Restaurant Name: ${name}`}</Card.Header>
              <Card.Meta>{`Opening state: ${status}`}</Card.Meta>
              {sortingValue && (
                <Card.Description>
                  {sortingValue}: {sortingValues[sortingValue]}
                </Card.Description>
              )}
            </Responsive>
          </Card.Content>
          <Card.Content extra textAlign="right">
            <Button
              data-testid="favorite-button"
              color={isFavorite ? "red" : "grey"}
              onClick={favoriteRestaurant}
            >
              <Icon name="heart" />
            </Button>
          </Card.Content>
        </Card>
      </Responsive>
    );
  }
);

export { RestaurantCard };
