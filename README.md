# Welcome to Vaulty!

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Motivation](#motivation)
- [Contributors](#contributors)

## Introduction

A small and simple chicken management app(*currently*) aimed at small and medium-scale farmers. It helps you keep track of your chicken on the farm, vaccination routines, feeding schedules and such all at the click of a button. Designed to have a friendly UI and simple to use features that are modularized to allow you use only the features that you need, I hope you enjoy using it. 

## Features

Being a learning project, I aim to follow the rules outlined in the SDLC(Software Development Life Cycle), more specifically using the waterfall model. Most of the concepts that I try to learn on my end will appear to be additional features to the user :). This will include:

- [ ] **User Roles & Permissions** - implement RBAC(Role Based Access) within the application. This will include 3 main roles at first:
    - admin
    - farmer
    - vet(erinary)
    - buyer

- [ ] **Social Authentication** - allow users to login with third party services into the app. Primarily this will be using Google, Facebook and Twitter. But I intend to make this modular to allow for additions or deletions late on. Passport.js can be used to achieve this. 

- [ ] **Two-Factor Authentication (2FA)** - Add an additional layer of security by integrating two-factor authentication. Using libraries like `speakeasy` (for TOTP generation) or services like Authy, Google Authenticator, or Twilio for SMS-based verification.

- [ ] **Password Reset Flow** - Add a password recovery option where users can request a reset link. Use `nodemailer` for sending password reset emails.

- [ ] **Session Management** - Manage how long a user can remain logged in without any activity, using session management libraries (e.g., `express-session`).

- [ ] **AI** - yes, the buzzword that we've al had enough of. But seriously, I intend of integration a module that will help me in keeping track of vaccination schedules based on chicken stages. Also it will be handy on early detection of chicken diseases and reporting. Thinking of also helping count the numbers(in large farms) to ensure none went missing.

- [ ] **Fully Fledged CMS** - the C in CMS is for Chicken! This tidbit will include:
    - chicken registry: each chicken will have its info logged, i.e name, breed, DOB, health status
    - egg tracking: daily egg count and possible egg laying statistics
    - feed log: record the feeding times, types of feed, quantity give
    - health logs: record overall health of the chicken, vaccination schedules, treatment given, possible outbreaks in the area and such.
    - expenses incurred: feed costs, vet visits, house contructions, labour incurred and such.
    - report dashboard: each user will have a unique dashboard with detailed info relevant to their specific role. Graphs would help give better visual cues.
    - IoT system integration: for most of these modules to work, It becomes essential to incorporate an IoT system, such as cameras to allow the A.I model detect sickly chicken. This might be a roller coaster to implement, but this is why we do it!

- [ ] **Testing** - Writing unit and integration tests for your authentication logic on both the frontend (Angular) and backend (Node.js). Useful for ensuring your security and authentication processes work correctly.

- [ ] **Docker** - containerize the application using docker to allow for easier deployment to whatever platform I'll use. Im thinking AWS for now. 

- [ ] **Open API** - as a developer, Id like to make the API public, such that in the event you think the app does not have an essential feature that you want, you can simply built it and easily *plug and play*. At the moment of writing this, I do not have the slighest idea where to begin to make this functionality even slighty work, but when has that ever stopped me before? Im using (Neo)Vim and it plugin eco-system has really amazed me, so that might have majorly influenced this passing thought.

## Tech Stack

Database: MySql, SQLite3

Frontend: Angular, Jinja2

Backend: Node.Js, Express, Flask

## Motivation

Initially, this began as an learning project, more so aimed at the authentication process. I wanted to grasp concepts such as 2FA and social authentication. Along the way, another idea to built a chicken app hit me and instead of retiring the what I was working on the ever growing list of side project I never complete,I decided to merge both projects into one and this is it.
I aim to keep it small and not overcomplicate it architecture as much as I can while also having fun in the process.
Deployment would be a major plus, but we'll cross that bridge when we get there.

## Contributors

[![Contributors](https://contrib.rocks/image?repo=mbvgua/vaulty)](https://github.com/mbvgua/vaulty/graphs/contributors)
