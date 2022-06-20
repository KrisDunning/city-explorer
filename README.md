# City Explorer

**Author**: Kris Dunning
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
This project allows a user to enter a city location and it will provide a basic location map and some basic information. 

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
User must provide a [locationIQ](https://locationiq.com/) application key of their own. Please enter the key into the .env-sample file and change local filename to just .env. User must have AXIOS and React-Bootstrap installed in the project folder as well. Run "npm install" in project terminal window after cloning.

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
Web page using HTML, CSS, JS, REACT, NODE.JS, React-Bootstrap, AXIOS. User enters a city into a text input box and then we use AXIOS to make a API server request to locationiq.com. The response data is displayed to the user via a map image and basic text output. 

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
Time Estimates
For each of the lab features, make an estimate of the time it will take you to complete the feature, and record your start and finish times for that feature:

Name of feature: ____File Architecture Layout Repo and API KEY_____

Estimate of time needed to complete: __45 min___

Start time: ___2:15pm__

Finish time: _____

Actual time needed to complete: _____