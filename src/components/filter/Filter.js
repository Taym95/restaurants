import React from "react";
import { Menu, Sidebar, Input, Dropdown } from "semantic-ui-react";
import { filter } from "../../actions";

const options = [
  { key: 1, text: "Best Match", value: "bestMatch" },
  { key: 2, text: "Newest", value: "newest" },
  { key: 3, text: "Rating average", value: "ratingAverage" },
  { key: 4, text: "Distance", value: "distance" },
  { key: 5, text: "Popularity", value: "popularity" },
  { key: 6, text: "Average product price", value: "averageProductPrice" },
  { key: 7, text: "Delivery costs", value: "deliveryCosts" },
  { key: 8, text: "Min cost", value: "minCost" }
];

const Filter = ({ dispatch }) => {
  const onSortingValueChange = (e, sortingValue) => {
    filter(sortingValue.value, dispatch);
  };
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
      <Menu.Item>Sorting Value:</Menu.Item>
      <Menu.Item>
        <Dropdown
          data-testid="filter-sorting-value"
          clearable
          options={options}
          selection
          onChange={onSortingValueChange}
        />
      </Menu.Item>
    </Sidebar>
  );
};

export { Filter };
