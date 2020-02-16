import React, { useCallback } from "react";
import { Menu, Sidebar, Input, Dropdown } from "semantic-ui-react";
import { debounce } from "lodash";
import { filter, search } from "../../actions";

const options = [
  { key: 1, text: "Best Match", value: "bestMatch" },
  { key: 2, text: "Newest", value: "newest" },
  { key: 3, text: "Rating average", value: "ratingAverage" },
  { key: 4, text: "Distance", value: "distance" },
  { key: 5, text: "Popularity", value: "popularity" },
  { key: 6, text: "Average product price", value: "averageProductPrice" },
  { key: 7, text: "Delivery costs", value: "deliveryCosts" },
  { key: 8, text: "Min cost", value: "minCost" },
  { key: 9, text: "Top Restaurant", value: "topRestaurant" }
];

const Filter = ({ dispatch }) => {
  // if we are asking data from server firing a request on every character entered results in 429's (rate limit exceeded).
  // Throttling/debouncing the input should help to solve this.
  const handlerSearch = useCallback(debounce(search, 300), []);

  const onSortingValueChange = (e, sortingValue) => {
    filter(sortingValue.value, dispatch);
  };

  const onSearchChange = (e, searchValue) => {
    handlerSearch(searchValue.value, dispatch);
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
        <Input
          data-testid="search"
          focus
          placeholder="Search..."
          onChange={onSearchChange}
        />
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
