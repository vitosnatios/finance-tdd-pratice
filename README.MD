# Finance TDD Practice

**Practice Your TDD Skills with Finance Operations**

This project serves as a practice ground for mastering Test-Driven Development (TDD) in a finance-oriented context. It's designed to provide hands-on experience with writing tests that guide the development process.

**Prerequisites:**

- **Visual Studio Code (VSCode):** A popular code editor for development.
- **MongoDB:** A NoSQL database for data persistence.
- **Node.js:** A JavaScript runtime environment to execute the backend server.

**Installation:**

1. **Create a `.env` File:**

   - Navigate to the `/backend` folder of your project.
   - Create a new file named `.env` in this folder.

   ```
    PORT=<your_backend_port>
    MONGODB_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    CLIENT_URL=<the frontend url, ex: http://localhost:5173>
   ```

   **Important:**

   - `PORT`: The port number where your backend server will listen for requests (e.g., `PORT=3000`).
   - `MONGODB_URI`: The connection string for your MongoDB database (obtain from your MongoDB provider or local setup instructions).
   - `JWT_SECRET`: A strong, unique secret key used for signing JSON Web Tokens (JWTs) for authentication (refer to your authentication implementation for generation details).
   - `CLIENT_URL`: For cors purposes.

   - Now, navigate to the `/frontend` folder.
   - Create a new file named `.env.local` in this folder.

   ```
    VITE_SERVER_URL=<your backend api url, ex: http://localhost:3000>
   ```

2. **Install Dependencies:**

   - Open a terminal window in the root directory of your project (the directory containing this README.md file).
   - Run the following command to install dependencies for both frontend and backend:

     ```bash
     npm run install
     ```

This command will automatically install the required packages and then start both the frontend and backend servers in development mode with testing and watch mode enabled.

3. **development mode** case you've already installed the dependencies before:
   ```bash
   npm run dev
   ```
