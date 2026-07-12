import './globals.css';

export const metadata = {
  title: 'SAMS — Smart Attendance Management System | FC-USJ',
  description: 'GPS-verified, OTP-secured attendance management for the Faculty of Computing, University of Sri Jayewardenepura.',
  keywords: 'attendance, GPS, OTP, university, Sri Jayewardenepura, Faculty of Computing, SAMS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
