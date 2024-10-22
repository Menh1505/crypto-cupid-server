# Server Side of Crypto Cupid

This is the server-side application for Crypto Cupid, a full-stack application that allows people to swipe and match with others on the blockchain.

## Requirements

- **Node.js**: Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **Bun Package Manager**: Install Bun by following the instructions on [bun.sh](https://bun.sh/docs/installation).
- **MongoDB**: Set up a MongoDB database. You can use a local instance or a cloud-based solution like MongoDB Atlas.

## Setup Instructions

1. **Clone the Repository**: Clone the project repository to your local machine.

   ```bash
   git clone https://github.com/yourusername/cryptocupid.git
   cd cryptocupid/server
   ```

2. **Install Dependencies**: Use Bun to install the server dependencies.

   ```bash
   bun install
   ```

3. **Environment Variables**: Create a `.env` file in the `server` directory and add the following environment variables:

   ```plaintext
   SESSION_SECRET=your_secret_key
   MONGODB_URI=mongodb://localhost:27017/dating-app
   ```

   - Replace `your_secret_key` with a secure secret key for session management.
   - Adjust `MONGODB_URI` if you're using a different MongoDB setup.

4. **Start MongoDB**: Ensure your MongoDB server is running. If you're using a local instance, you can start it with:

   ```bash
   mongod
   ```

5. **Run the Server**: Use Bun to start the server.

   ```bash
   bun run start:server
   ```

   The server will start on the port specified in your `.env` file or default to `8080`.

## Available Scripts

- **`bun run start:server`**: Starts the server.
- **`bun run dev`**: Starts the server in development mode with hot-reloading.
- **`bun run test`**: Runs the test suite.

## Additional Information

- **Routes**: The server exposes several routes for user management, swiping, matching, messaging, and more.
- **Socket.IO**: The server uses Socket.IO for real-time communication between clients.

## Troubleshooting

- **MongoDB Connection**: Ensure your MongoDB URI is correct and the database is running.
- **Environment Variables**: Double-check your `.env` file for any missing or incorrect variables.

For further assistance, please refer to the project's documentation or contact the maintainers.

