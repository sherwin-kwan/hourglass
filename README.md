# Hourglass - an interview scheduling app

## About

This is an introductory React project, based on a Lighthouse Labs codebase. I wrote the code in the /src/hooks, /src/components, and /src/helpers folders, including unit tests, and I also wrote the end-to-end tests in the /cypress folder.

!["Screenshot"](https://github.com/sherwin-kwan/hourglass/blob/master/public/images/main.png)

## Stack

* Node/Express
* React
* PostgreSQL
* Jest, React Testing Library, and Cypress

## Setup

This application communicates with a companion API, which is available [here](https://github.com/sherwin-kwan/scheduler-api). By default, this application runs on port 8000 and the API on port 8001, so you can run both servers on the same computer. An *.env.development* and *.env.test* file have already been created with the correct credentials for proxying (i.e. so API calls to '/api/debug/reset' are made to the API on port 8001).

In order to test out this application, begin by cloning both this repo and the API repo to your computer. Instructions for setting up the API repo are given in its README file.

To set up Hourglass, begin by installing Node modules:

```
npm install
```

This was tested on Node version 10 only. Running it on newer versions of Node will probably cause issues with dependencies and is not recommended.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Cypress Tests

To run the Cypress tests, you will need to run the following commands in three different terminal emulators.

```sh
1) npm start // Run in the root directory of this repo
2) npm test-start // Run in the root directory of the API repo, this will seed test data
3) npm cypress // Starts Cypress
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Notes

Owing to lack of time, the Jest tests are not particularly durable - many of them rely on hard-coded strings or CSS classes. Slight changes to the
React components may cause the tests to fail.

Check the "reducer" branch for a version of this app which implements WebSockets. This is not ready for prime time at the moment; there are several known issues with this branch:

1) When appointments are booked or cancelled, the screen blanks out for other users. This is due to a stale state bug causing the re-render to fail.
2) Cancelling appointments may sometimes cause an error because React attempts to render a non-existent interview.

