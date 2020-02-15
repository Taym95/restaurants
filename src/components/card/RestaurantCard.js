import React from "react";
import { Card, Responsive, Image, Button, Icon } from "semantic-ui-react";
import { takeaway } from "../../assets";
import { favorite } from "../../actions";

const RestaurantCard = React.memo(
  ({ id, name, image, status, isFavorite, dispatch }) => {
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
              <Card.Description>Description:</Card.Description>
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
