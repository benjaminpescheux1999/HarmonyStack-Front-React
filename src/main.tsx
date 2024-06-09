import React, { lazy } from 'react';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import { useAuth, AuthProvider } from './contexts/authContext';
import { SnackbarProvider } from './contexts/notificationContext';

import './i18n';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18next from './i18n';


const Header = lazy(() => import('./layout/Header'));
const Footer = lazy(() => import('./layout/Footer'));
const Hero = lazy(() => import('./components/Hero'));
const Loader = lazy(() => import('./components/animations/loader'));
const ErrorPage = lazy(() => import('./pages/errorPage'));
const SettingsPage = lazy(() => import('./pages/settings'));
const MessagePage = lazy(() => import('./pages/message'));

const Profile = lazy(() => import('./pages/profile'));



export { Header, Hero, Loader, SettingsPage };

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { t } = useTranslation();
  
  const { user } = useAuth() || { user: null };

  return user ? children : 
    <>
    <ErrorPage message={t('main.protectedRoute.message')} code={403} title={t('main.protectedRoute.title')} />
    </>
  ;
};

// Define the errorElement with useTranslation
const ErrorElement = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header/>
      <ErrorPage message={t('main.errorPage.message')} code={404} title={t('main.errorPage.title')} className="min-h-screen-minus-395"/>
      <Footer/>
    </>
  );
};

// Layout component that includes the header
function Layout() {
  return (
    <>
      <Header/>
      <main className="min-h-screen-minus-395">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

// Define the router with the layout applied to all routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Hero /> },
      { path: "profile/*", element: 
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      },
      { path: "settings", element: 
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      },
      { path: "messages", element: 
        <ProtectedRoute>
          <MessagePage />
        </ProtectedRoute>
      },
    ],
    errorElement: <ErrorElement />
  }
]);


const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root container missing in index.html");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.Suspense fallback={<Loader />} >
    <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <SnackbarProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </SnackbarProvider>
      </PersistGate>
    </I18nextProvider>
    </Provider>
  </React.Suspense>
);