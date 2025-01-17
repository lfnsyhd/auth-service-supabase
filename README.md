# Authentication Service - Node.js

This repository contains an authentication service built using Node.js. It provides a scalable and secure solution for user authentication, supporting features like user registration, login, get profile and token-based session management.

---

## Features

- **User Registration**: Allow new users to register with username and password.
- **User Login**: Authenticate users with their credentials.
- **Get Profile**: Getting the profile info for authenticated profile.
- **Token-Based Authentication**: Use JWT (JSON Web Tokens) for secure session management.
- **Error Handling**: Handle authentication errors with user-friendly messages.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/lfnsyhd/authentication-service
   ```

2. Navigate to the project directory:
   ```bash
   cd authentication-service
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Set up environment variables:
   Replace `.env-example` to `.env` and configure the variable

5. Set up database:
   Create new database `auth_db` or anything else based on `DB_NAME` in `.env` file.

### Running the App

1. Start the development server:
   ```bash
   node server.js

2. Open your browser and navigate to:
   ```
   http://localhost:5008
   ```

3. For the purpose of API documentation, here is the link:
   ```
   http://localhost:5008/api-docs
   ```

4. Test the authService:
   ```
   npm test
   ```

---