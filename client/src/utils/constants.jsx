import BookOnlineIcon from '@mui/icons-material/BookOnline';
import ApprovalIcon from '@mui/icons-material/Approval';

export const ADMIN = 'ADMIN';
export const USER = 'USER';
export const DENTIST = 'DENTIST';
export const delimiter = ' – '; // This regex allows for variable spacing around the hyphen

export const userLinks = [
  {
    id: 1,
    path: '/',
    name: 'Home',
  },
  {
    id: 2,
    path: '/appointments',
    name: 'Appointments',
  },
  {
    id: 3,
    path: '/apply-dentist',
    name: 'Apply as Dentist',
  },
];

export const dentistLinks = [
  {
    id: 1,
    path: '/',
    name: 'Home',
  },
  {
    id: 2,
    path: '/dentist/appointments',
    name: 'Appointments',
  },
];

export const adminLinks = [
  {
    id: 1,
    path: '/',
    name: 'Home',
  },
  {
    id: 2,
    path: '/admin/users-list',
    name: 'Users',
  },
  {
    id: 3,
    path: '/admin/dentists-list',
    name: 'Dentists',
  },
];

export const usersColumns = ['Name', 'Email', 'Created At', 'Actions'];

export const dentistsColumns = [
  'Name',
  'Phone',
  'Created At',
  'Status',
  'Actions',
];

export const services = [
  {
    id: 1,
    title: 'Book Appointment',
    desc: " Experience the convenience of seamless dental care with our online appointment booking platform. Say goodbye to waiting on hold and hello to hassle-free scheduling at your fingertips. Whether you're due for a routine check-up or seeking specialized treatment, our user-friendly system ensures that securing a dental appointment is as easy as a click away. Take control of your oral health journey and book your next visit online – because a healthier, happier smile is just a few clicks closer",
    path: '/appointments',
    icon: <BookOnlineIcon fontSize="1px" />,
  },
  {
    id: 2,
    title: 'Apply as one of our Dentists',
    desc: "Embark on a fulfilling career in dentistry by joining our dynamic team! We are actively seeking passionate and skilled dentists to contribute to our commitment to exceptional patient care. As a valued member of our practice, you'll have the opportunity to showcase your clinical expertise, compassionate approach, and dedication to promoting oral health. We foster a collaborative and supportive work environment where your skills and passion for dentistry can truly shine. If you're ready to make a positive impact on patients' lives and be part of a forward-thinking dental practice, we invite you to apply online today. Join us in creating smiles that last a lifetime!",
    path: '/apply-dentist',
    icon: <ApprovalIcon fontSize="1px" />,
  },
];

export const BASE_URL = import.meta.env.VITE_BASE_URL;
