# Hotel Booking Application

A full-stack hotel booking application with user authentication and booking management system. Built with modern technologies and featuring a responsive design for both desktop and mobile devices.

## 🚀 Features

- **User Authentication**
  - Sign up with email verification
  - Sign in with JWT token authentication
  - Secure logout functionality
  - Protected routes with authentication checks

- **Booking Management**
  - Create bookings with customer details
  - Multiple booking types: Full Day, Half Day, and Custom
  - Time slot selection for half-day and custom bookings
  - Conflict detection to prevent double bookings
  - Date validation with minimum date set to current day

- **Responsive Design**
  - Mobile-first approach
  - Fully responsive UI across all devices
  - Modern and clean interface

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Mantine UI** - Component library
- **Redux Toolkit** - State management
- **RTK Query** - API integration
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Request validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SujalShah2003/Hotel-Hub.git
cd Hotel-Hub
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Client URL
CLIENT_URL=http://localhost:5173
```

**Environment Variables Explanation:**
- `PORT` - Port number for the server (default: 5000)
- `NODE_ENV` - Environment mode (development/production)
- `MONGODB_URI` - MongoDB connection string (replace with your MongoDB Atlas URI or local MongoDB URI)
- `JWT_SECRET` - Secret key for JWT token generation (use a strong random string)
- `JWT_EXPIRE` - JWT token expiration time
- `CLIENT_URL` - Frontend application URL for CORS configuration

Run the development server:

```bash
npm run dev
```

The backend server will start at `http://localhost:5000`

### 3. Frontend Setup

Navigate to the client directory:

```bash
cd ../client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `client` directory with the following variable:

```env
VITE_BASE_URL=http://localhost:5000/api
```

**Environment Variables Explanation:**
- `VITE_BASE_URL` - Backend API base URL (must be prefixed with `VITE_` for Vite to expose it to the client)

Run the development server:

```bash
npm run dev
```

The frontend application will start at `http://localhost:5173`

## 🎯 Usage

1. **Sign Up**: Create a new account with your details
2. **Sign In**: Login with your credentials
3. **Make a Booking**: 
   - Fill in customer name and email
   - Select booking date
   - Choose booking type (Full Day, Half Day, or Custom)
   - Select time slot (for Half Day or Custom bookings)
   - Submit the booking

## 📁 Project Structure

```
BookingApp/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── assets/        # Images and static files
│   │   ├── common/        # Shared components
│   │   ├── components/    # React components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── booking/   # Booking form components
│   │   │   ├── banner/    # Banner component
│   │   │   ├── footer/    # Footer component
│   │   │   ├── header/    # Header component
│   │   │   └── services/  # Services section
│   │   ├── forms/         # Form elements
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route configuration
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   └── types/         # TypeScript types
│   ├── .env               # Environment variables
│   └── package.json
│
└── server/                # Backend application
    ├── src/
    │   ├── config/        # Configuration files
    │   ├── controllers/   # Route controllers
    │   ├── middleware/    # Custom middleware
    │   ├── models/        # Database models
    │   ├── routes/        # API routes
    │   ├── types/         # TypeScript types
    │   ├── utils/         # Utility functions
    │   └── server.ts      # Entry point
    ├── .env               # Environment variables
    └── package.json
```

## 🔐 Authentication Flow

1. User signs up with credentials
2. Password is hashed using bcrypt
3. User data is stored in MongoDB
4. On sign in, credentials are verified
5. JWT token is generated and sent to client
6. Token is stored in Redux and HTTP-only cookies
7. Protected routes verify token before access

## 📝 Booking Conflict Rules

- **Full Day Booking**: Blocks the entire day - no other bookings allowed
- **Half Day Booking**: Blocks specific half (First Half: 9AM-2PM, Second Half: 3PM-7PM)
- **Custom Booking**: Blocks specific time slot - prevents overlapping bookings

## 🚀 Production Build

### Frontend

```bash
cd client
npm run build
```

### Backend

```bash
cd server
npm run build
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Sujal Shah - [GitHub](https://github.com/SujalShah2003)

## 🙏 Acknowledgments

- Mantine UI for the beautiful component library
- MongoDB for the database solution
- The React and Node.js communities for excellent documentation
