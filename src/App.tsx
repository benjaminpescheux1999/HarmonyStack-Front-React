// import React, { lazy } from 'react';

// import {
//   createBrowserRouter,
//   RouterProvider,
//   // Route,
//   // Routes,
//   Outlet
// } from "react-router-dom";
// import * as ReactDOM from "react-dom/client";
// import { Provider } from 'react-redux';

// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './redux/store';
// import { useAuth, AuthProvider } from './contexts/authContext';

// // import { SnackbarProvider } from 'notistack';

// const Header = lazy(() => import('./layout/Header'));
// const Hero = lazy(() => import('./components/Hero'));
// const Loader = lazy(() => import('./components/animations/loader'));
// const ErrorPage = lazy(() => import('./pages/errorPage'));


// export { Header, Hero, Loader };

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const { user } = useAuth()?? { user: null };

//   return user ? children : <ErrorPage message="Vous n'avez pas les droits pour accéder à ce contenu" />;
// };

// // Layout component that includes the header

// function Layout() {
//   return (
//     <>
//       <Header/>
//       <main>
//         <Outlet />
//       </main>
//     </>
//   );
// }

// // Define the router with the layout applied to all routes
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <Hero /> },
//       { path: "profile*", element: 
//         <ProtectedRoute>
//           <Hero />
//         </ProtectedRoute>
//       },
//       // { path: "users/*", element: <UserApp /> }
//     ]
//   }
// ]);

// const rootElement = document.getElementById("root");
// if (!rootElement) throw new Error("Root container missing in index.html");

// ReactDOM.createRoot(rootElement).render(
//   <React.Suspense fallback={<Loader />} >
//     <Provider store={store}>
//       <PersistGate loading={<Loader />} persistor={persistor}>
//         <AuthProvider>
//           {/* <SnackbarProvider> */}
//             <RouterProvider router={router} />
//           {/* </SnackbarProvider> */}
//         </AuthProvider>
//       </PersistGate>
//     </Provider>
//   </React.Suspense>
// );

// // function App() {
// //   return <RouterProvider router={router} />;
// // }


// // export default App;
