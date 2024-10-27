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

## Contributing
Pull requests are welcome. Please ensure that your changes lint and build successfully.