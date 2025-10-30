# MarketMind - Social Media Management Platform

MarketMind is a modern, responsive web application built with React and Vite, designed to help users manage their social media campaigns effectively.

## 🚀 Features

- 📊 Dashboard with campaign analytics
- 📅 Campaign scheduling and management
- 📱 Multi-platform support (Instagram, Facebook, Twitter, etc.)
- 🎨 Modern UI with dark/light mode
- ⚡ Fast and responsive design

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or later recommended)
  - To check if installed: `node --version`
- npm (comes with Node.js)
  - To check npm version: `npm --version`
- [Git](https://git-scm.com/)
  - To check if installed: `git --version`

## 🚀 Complete Setup Guide

### Step 1: Clone the Repository

1. Open your terminal or command prompt
2. Navigate to the directory where you want to install the project
3. Run the following command to clone the repository:
   ```bash
   git clone https://github.com/ankitojha2705/marketmind-frontend.git
   ```
4. Move into the project directory:
   ```bash
   cd marketmind-frontend
   ```

### Step 2: Install Dependencies

```bash
# Install all dependencies
npm install

# If you encounter peer dependency conflicts, use:
npm install --legacy-peer-deps
```

### Step 3: Environment Setup

1. In the project root directory, create a new file named `.env`
2. Add the following environment variables:
   ```env
   VITE_APP_NAME=MarketMind
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

### Step 4: Start the Development Server

**For Development:**
```bash
# Start the development server
npm run dev
```

After running the command, your default browser should automatically open at:
```
http://localhost:5173
```

If it doesn't open automatically, you can manually navigate to that URL.

### Step 5: Building for Production

When you're ready to create a production build:

```bash
# Create production build
npm run build

# Preview the production build locally
npm run preview
```

The production build will be available in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── router/        # Routing configuration
├── store/         # State management
├── styles/        # Global styles and Tailwind configuration
└── utils/         # Utility functions
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🌐 Tech Stack

- ⚛️ React 18
- 🚀 Vite
- 🎨 Tailwind CSS
- 🔄 React Router
- 📦 React Icons (Heroicons)
- 📅 date-fns for date manipulation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

