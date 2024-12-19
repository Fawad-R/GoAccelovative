export const metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="css/app.v2.css" type="text/css" />
        <link rel="stylesheet" href="css/font.css" type="text/css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
        <link rel="stylesheet" href="css/app.v2.css" type="text/css" />
    <link rel="stylesheet" href="css/font.css" type="text/css" cache="false" />
    <link rel="stylesheet" href="js/fuelux/fuelux.css" type="text/css" />
    <link rel="stylesheet" href="js/datatables/datatables.css" type="text/css" />

      </head>
      <body>
        {children}
        <script src="js/app.v2.js" async defer></script>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </body>
    </html>
  );
}
