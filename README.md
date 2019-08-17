# Hitch a Ride
Hitch a Ride is an easy to use web app designed to help people carpool to/from my wedding. It was first developed as a Front-End capstone project while studying at Nashville Software School.  

## Introduction
My Fiance and I are planning our wedding and the venue we chose is in a pretty rural area. Lyft and Uber do go out there, but the hotels don't have any shuttles and providing transportation was out of our price range. I wanted to help our guests get to the venue in a way that limited the number of people needing to drive and minimized the cost if they wanted to use a ride-sharing service.

![Screenshot of home page with a table of all rides](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/home.png)

## Technologies
This project uses React, Reactstrap, Bootstrap, and SASS for the elements and styling. The code is deployed to Firebase for both hosting and the database. Firebase handles authentication through Google, with many other options available in the future. Axios calls inside of promises are used to retrieve the data from the database. 

## Installation and Setup
COMING SOON

## User Experience
### Logging in
Authentication is handled through firebase using Google accounts. When a user logs in for the first time, they will be asked to input their contact information. Users without profiles are forced to enter this information before continuing. Navigating away will just kick them back to the profile creation page.

![Screenshot of login page](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/login.png)
![Screenshot of profile creation form which includes fields for name and phone number](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/profile_create.png)

### Home
After logging in, users will be presented with a list of available rides. Each ride shown has a link to the organizer's profile, whether it's a Lyft/Uber, the origin and destination, the departure time, and the number of available seats (calculated from total seats and number of passengers). Rides where the user is currently a passenger are highlighted in the table.

![Screenshot of home page with a table of all rides](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/home.png)

### Single Ride
If a user chooses to click the View button for a ride, they will be taken to the page for that ride. All of the information for that ride will be displayed as well as a list of all current passengers. If they are not currently a passenger, there will be a button to join the ride.

![Screenshot of the single ride view if not currently a passenger](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/ride_unowned_unjoined.png)

If they are currently a passenger, there will be a button to leave the ride.

![Screenshot of the single ride view if currently a passenger](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/ride_unowned_joined.png)

If the user is the organizer of the ride, there will instead be buttons to edit or delete the ride.

![Screenshot of the single ride view if the organizer of the ride](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/ride_owned.png)

### Deleting Rides
If the organizer of a ride chooses to delete it, they will be prompted to confirm this action.

![Screenshot of the confirmation for deleting a ride](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/ride_delete.png)

### Editing Rides
If the organizer of a ride chooses to edit it, they will be navigated to the edit page where they can make changes to any of the fields.

![Screenshot of the page for editing rides](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/ride_edit.png)

### Creating new Rides
When a user chooses to navigate to the New Ride page, they are presented with a form with all the necessary fields. After creating a ride, the organizer is automatically added as a passenger.

![Screenshot of the new ride page](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/ride_new.png)

### Changing Rides
If a user attempts to join a ride with an identical Origin and Destination of a ride they are already in, they will be asked if they want to switch rides. If so, they will join the new ride and leave the old one. 

![Screenshot of the new ride page](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/ride_unowned_duplicate.png)

### Viewing a Profile
If a user clicks on a profile link on the home page or in the Single Ride view, they will be taken to the profile page of that user. At this point, this is just used to provide contact information.

![Screenshot of the new ride page](https://raw.githubusercontent.com/tilleraj/hitch-a-ride/master/assets/screenshots/profile.png)



- Users need to be able to log in and create an account
- Users need to be able to add information to their profile
	- Name
	- Contact info
	- Where they're staying
	- Looking for or providing rides
	- Willing to split a Lyft/Uber?
- Users will be presented with a list of other attendees which can be sorted/filtered
- Users need to be able to contact other attendees either through the app or through their provided contact info

Stretch:
Possibly integrate Lyft/Uber APIs for ride cost estimation and/or ride requesting

# Default Docs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
