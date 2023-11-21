import { useMemo } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {
  ApplyDentist,
  BookAppointment,
  DentistAppointments,
  Dentists,
  DentistsList,
  Error,
  HomeLayout,
  Landing,
  Notifications,
  User,
  UsersList,
} from './pages';
import { Toaster } from 'react-hot-toast';
import { ProtectedRoute } from './components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

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
        path: '/dentists',
        element: (
          <ProtectedRoute>
            <Dentists />
          </ProtectedRoute>
        ),
      },
      {
        path: '/notifications',
        element: (
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        ),
      },
      {
        path: '/apply-dentist',
        element: (
          <ProtectedRoute>
            <ApplyDentist />
          </ProtectedRoute>
        ),
      },
      {
        path: '/book-appointment/:dentistId',
        element: (
          <ProtectedRoute>
            <BookAppointment />
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
      {
        path: '/admin/users-list',
        element: (
          <ProtectedRoute>
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/dentists-list',
        element: (
          <ProtectedRoute>
            <DentistsList />
          </ProtectedRoute>
        ),
      },
      {
        path: '/dentist/appointments',
        element: (
          <ProtectedRoute>
            <DentistAppointments />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="app">
        <Toaster position="top-center" reverseOrder={false} />
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Box width="100%" height="100%">
            <RouterProvider router={router} />
          </Box>
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
}

export default App;
