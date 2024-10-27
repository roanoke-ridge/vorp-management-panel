# VORP Management Panel

## ⚠️WARNING⚠️
Right now, this panel is **unauthenticated**. Making it available to the outside network could result in other people finding it and viewing sensitive data or worse, deleting or modifying data in your database. Do not allow access to this from outside networks yet.

## Purpose
The end-goal is to have a feature-rich management panel for VORP-based servers. Right now, only a few features exist, but the todo list is too long to bother writing here.

## Features
As of now:
- Item creation/updating
- Viewing basic user stats

In the future: (not an exhaustive list)
- Discord authentication
- Editing users and characters
- Heatmaps
- Log viewing
- Other various analytics

## Quick Start
1. Clone the repository.
2. Copy `.env.example` to `.env` and add your MySQL Connection String to the `DATABASE_URL` variable
3. Install dependencies: `yarn`
4. Start the project: `yarn dev`

## Building
1. Copy `.env.example` to `.env` and add your MySQL Connection String to the `DATABASE_URL` variable
2. Run `yarn build`

## Deploying (with Docker Compose)
1. Copy `.env.example` to `.env` and add your MySQL Connection String to the `DATABASE_URL` variable
2. Run `docker compose -f "compose.yaml" up -d --build`

### Set up Discord Authentication
All API endpoints are protected behind Discord authentication. In your `.env` file that you set up in the instructions above, you'll need to also [set up a Discord application](https://discord.com/developers/applications) and under `OAUTH2`, copy the `CLIENT ID` and `CLIENT SECRET` into your `.env` file as well. Authentication is based on Discord roles, so users in your Discord server with a particular role will be able to log into the panel. You'll need to copy your Discord server ID and the role ID you want to use into your `.env` file.

## Contributing
Pull requests are welcome. Please ensure that your changes lint and build successfully.