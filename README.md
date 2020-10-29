# Interview Scheduler

## Current Structure

APPLICATION
  *State*: 
    day
    days
    appointments
    interviewers
  passes day^, key, days^ (of which each day has: name, spots), setDay to DAYLIST
  passes id, time, interview, interviewers to APPOINTMENT


  DAYLIST
    passes name*, key, spots*, selected, setDay* to DAYLISTITEM

    DAYLISTITEM

  APPOINTMENT
    passes 


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
