import React, { Suspense } from 'react';
import useHashRoute from './router/useHashRoute.js';
import NavBar from './components/NavBar.jsx';

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('./pages/Dashboard.jsx'));
const CampaignNew = React.lazy(() => import('./pages/CampaignNew.jsx'));
const Calendar = React.lazy(() => import('./pages/Calendar.jsx'));
const Library = React.lazy(() => import('./pages/Library.jsx'));
const Settings = React.lazy(() => import('./pages/Settings.jsx'));

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600 dark:text-red-400">
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p>{this.state.error?.message || 'An unknown error occurred'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function App() {
  const { route } = useHashRoute();

  let Page = Dashboard;
  if (route === '/dashboard') Page = Dashboard;
  else if (route === '/campaigns/new') Page = CampaignNew;
  else if (route === '/calendar') Page = Calendar;
  else if (route === '/library') Page = Library;
  else if (route === '/settings') Page = Settings;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <NavBar current={route} />
        <main className="container mx-auto px-4 py-8 pt-24">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">MarketMind</h1>
          </header>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Suspense fallback={<LoadingSpinner />}>
              <Page />
            </Suspense>
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
}