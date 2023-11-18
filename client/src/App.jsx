import { useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Error, HomeLayout, Landing, User } from './pages';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/appointments',
        element: (
          <ProtectedRoute>
            <div>Appointments...</div>
          </ProtectedRoute>
        ),
      },
      {
        path: '/apply-dentist',
        element: (
          <ProtectedRoute>
            <div>Apply-dentist...</div>
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile/:id',
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <Toaster position="top-center" reverseOrder={false} />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box width="100%" height="100%">
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
