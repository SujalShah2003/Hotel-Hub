# Booking App Server

Backend server for the Hotel Booking Application built with TypeScript, Express, and MongoDB.

## Features

- **TypeScript** - Type-safe code
- **Express.js** - Fast web framework
- **MongoDB Atlas** - Cloud database
- **JWT Authentication** - Secure user authentication
- **MVC Pattern** - Clean code architecture
- **Password Hashing** - bcrypt for secure passwords
- **Input Validation** - express-validator
- **CORS** - Cross-origin resource sharing enabled

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.ts         # MongoDB connection
│   ├── controllers/
│   │   └── auth.controller.ts  # Authentication logic
│   ├── middleware/
│   │   └── auth.middleware.ts  # JWT verification
│   ├── models/
│   │   └── User.ts             # User model
│   ├── routes/
│   │   └── auth.routes.ts      # Auth endpoints
│   ├── types/
│   │   └── auth.types.ts       # TypeScript types
│   ├── utils/
│   │   ├── jwt.ts              # JWT utilities
│   │   └── response.ts         # Response helpers
│   └── server.ts               # Entry point
├── .env.example                # Environment template
├── .gitignore
├── nodemon.json
├── package.json
└── tsconfig.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the server root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB Atlas connection string:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/booking-app?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and add it to `.env`

### 4. Run the Server

**Development mode with auto-reload:**
```bash
npm run dev
```

**Build TypeScript:**
```bash
npm run build
```

**Production mode:**
```bash
npm start
```

## API Endpoints

### Authentication

#### Sign Up
- **POST** `/api/auth/signup`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }
  ```

#### Sign In
- **POST** `/api/auth/signin`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Logout
- **POST** `/api/auth/logout`
- **Headers:** `Authorization: Bearer <token>`

### Health Check
- **GET** `/health`
- Returns server status

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production server
- `npm run watch` - Watch TypeScript files for changes

## Technologies Used

- **Node.js** - Runtime environment
- **TypeScript** - Programming language
- **Express** - Web framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **cors** - CORS middleware
- **dotenv** - Environment variables

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- HTTP-only cookies
- Input validation and sanitization
- CORS configuration
- Secure password requirements (minimum 6 characters)

## Development

The server uses the MVC (Model-View-Controller) pattern:

- **Models** - Define data structure (User model)
- **Controllers** - Handle business logic (auth controller)
- **Routes** - Define API endpoints (auth routes)
- **Middleware** - Authentication and validation
- **Utils** - Helper functions (JWT, responses)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | Secret for JWT signing | - |
| JWT_EXPIRE | Token expiration time | 7d |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 |

## License

ISC
