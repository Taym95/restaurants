## Restaurants

React app to display restaurants.

# Install dependencies

### Front-End

`cd restaurants && yarn`

### Back-End

`cd restaurants/server && yarn`

# Run App

## Runs the app in the development mode:

### Back-End

`cd restaurants/server && yarn serve`

- The server should be running on port 9000.
- Keep the terminal opened and open a new one to run the frontend.

### Front-End

`cd restaurants && yarn start`

- The client should be running on port 3000.
- Visit http://localhost:3000/ or the browser will open automatically.

### Front-End Test

`cd restaurants && yarn test`

## Runs the app in the production mode:

### Build Front-End

`cd restaurants && yarn build`

- This will generate a frontend build folder.
- Make sure you generate frontend first so the backend can serve static files from the build folder.

### Back-End

`cd restaurants/server && yarn serve`

- Visite http://localhost:9000/
