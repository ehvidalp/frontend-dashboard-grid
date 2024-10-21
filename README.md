# Frontend Dashboard Grid

## Overview

Frontend Dashboard Grid is a web application built with React, Vite, and Redux for handling and displaying a list of 150 Pokémon. It integrates the Pokémon API to fetch Pokémon details in batches, allowing users to select up to 6 Pokémon for combat. The app features infinite scroll or a button for loading more Pokémon, and includes search functionality to filter the Pokémon list.

## Features

- **Infinite Scroll or Load More:** Load Pokémon dynamically either by scrolling or clicking a button.
- **Search:** Filter the Pokémon list by name.
- **Combat Selection:** Choose up to 6 Pokémon for battle.
- **Pokemon Details:** View detailed stats for each Pokémon.
- **Persistent Scroll Position:** Maintain the user's scroll position when navigating between routes.
- **Responsive Grid Layout:** The app uses a responsive grid layout to display Pokémon cards.

## Project Structure

```plaintext
├── public
│   └── assets
│       └── images
├── src
│   ├── api
│   │   └── PokeApiService.ts  # API service to interact with Pokémon API
│   ├── app
│   │   └── store.ts           # Redux store configuration
│   ├── features
│   │   ├── dashboard
│   │   │   ├── components     # UI components for dashboard
│   │   │   ├── hooks          # Custom hooks for fetching and managing state
│   │   │   ├── pages          # Pages like Dashboard and ItemDescription
│   │   │   └── dataDashboardSlice.ts  # Redux slice for managing Pokémon data
│   ├── hooks                  # Global hooks like reduxHooks
│   ├── shared
│   │   └── components         # Reusable components like SquareSearch
│   └── index.tsx              # Main entry point
└── README.md
```
# Installation and Build Steps

## Prerequisites

Make sure you have the following tools installed:

- **Node.js** (version 14.x or later)
- **npm** (comes with Node.js) or **Yarn**

## Setup

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/your-username/frontend-dashboard-grid.git
