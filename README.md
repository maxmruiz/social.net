# Social.net

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Walkthrough](#walkthrough)

## Description

This project is a backend for a social networking application. It uses a NoSQL database, allowing for flexible data representation, including users, thoughts, friends, and reactions. Built with MongoDB, Mongoose, and Express.js, it supports operations for managing users and their interactions on the network.

## Features

- Create, read, update, and delete operations for users and thoughts.
- Add and remove friends for users.
- Add and remove reactions to thoughts.

## Installation

To get started with this project, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone github.com/maxmruiz/social.net
```

2. Navigate to the project directory:
`cd social.net`

3. Install the necessary dependencies:
`npm install` OR `npm i`

## Usage

To start the server, run the following command in your terminal:
```bash
node server.js
```

This will start the Express server and connect to MongoDB. You can then use an API client like Insomnia to test the API endpoints.

### API Endpoints

- **Users**
  - `GET /api/users` - Retrieve all users
  - `GET /api/users/:id` - Retrieve a single user by ID
  - `POST /api/users` - Create a new user
  - `PUT /api/users/:id` - Update a user by ID
  - `DELETE /api/users/:id` - Delete a user by ID
  - `POST /api/users/:userId/friends/:friendId` - Add a friend
  - `DELETE /api/users/:userId/friends/:friendId` - Remove a friend

- **Thoughts**
  - `GET /api/thoughts` - Retrieve all thoughts
  - `GET /api/thoughts/:id` - Retrieve a single thought by ID
  - `POST /api/thoughts` - Create a new thought
  - `PUT /api/thoughts/:id` - Update a thought by ID
  - `DELETE /api/thoughts/:id` - Delete a thought by ID

- **Reactions**
  - `POST /api/thoughts/:thoughtId/reactions` - Add a reaction to a thought
  - `DELETE /api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction from a thought

## Configuration

Create a `.env` file in the root directory of the project to store your MongoDB URI:
`MONGODB_URI=your_mongodb_uri`

Replace `your_mongodb_uri` with your actual MongoDB connection string.

## Walkthrough

If you would like to see a demo of how this project works, visit this [link](https://youtu.be/Jc4X_nptu-M).