import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./context/HomePage";
import Cart from "./context/Cart";
import Login from "./context/Login";
import SignUp from "./context/SignUp";
import { UserProvider, useUser } from "./context/UseContext"; 
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckoutPage from "./pages/CheckoutPage";

function NavBar() {
  const { currentUser, logout } = useUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFC0CB" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }} component={Link} to="/" > Bouty food </Typography>
       
        {currentUser && (
          <IconButton color="inherit" component={Link} to="/Cart">
            <ShoppingCartIcon />
          </IconButton>
        )}

        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar sx={{ bgcolor: "#ffffff" }}>
            {currentUser ? currentUser.userName.charAt(0).toUpperCase() : "?"}
          </Avatar>
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {currentUser ? (
            <>
              <MenuItem component={Link} to="/Cart" onClick={handleMenuClose}>            
              <ShoppingCartIcon />
              העגלה שלי
              </MenuItem>
              <MenuItem onClick={() => { logout(); handleMenuClose(); }}>🚪 התנתקות</MenuItem>
            </>
          ) : (
            <>
              <MenuItem component={Link} to="/Login" onClick={handleMenuClose}>🔑 התחברות</MenuItem>
              <MenuItem component={Link} to="/Signup" onClick={handleMenuClose}>📝 הרשמה</MenuItem>
            </>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}


const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#000" },
    text: { primary: "#fff" },
    primary: { main: "#FFC0CB" },
  },
});

// מוכרחה לציין שבכל עמוד יש בהערה את הדף שעבדתי עלי לבד וע"י חיפוש עצמי באינטרנט, 
// ורק לאחר מכן עליתי מול GPT
// כדי להבין מספר שגיאות, 
// וכן הוספתי מMUI
// פיצרים נוספים.

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/checkout" element={<CheckoutPage />} />

          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;


// //דף App
// import React from "react";
// import { UserProvider, useUser } from "./context/UseContext";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import HomePage from "./context/HomePage";
// import Cart from "./context/Cart";
// import SignUp from "./context/SignUp";
// import Login from "./context/Login";
// import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// function Navbar() {
//   const { currentUser, logout } = useUser();

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#FFC0CB" }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Italyano
//         </Typography>
//         <Button color="inherit" component={Link} to="/">Home</Button>
//         <Button color="inherit" component={Link} to="/cart">Cart</Button>
//         {currentUser ? (
//           <>
//             <IconButton color="inherit">
//               <AccountCircleIcon />
//             </IconButton>
//             <Typography>{currentUser.userName}</Typography>
//             <Button color="inherit" onClick={logout}>Logout</Button>
//           </>
//         ) : (
//           <>
//             <Button color="inherit" component={Link} to="/login">Login</Button>
//             <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// }

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// }

// export default App;

// // import React from "react";
// // import { UserProvider } from "./context/UseContext";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import HomePage from "./context/HomePage";
// // import Cart from "./context/Cart";
// // import SingUp from "./context/SingUp";
// // // import AppBar from "./context/AppBar";
// // import Login from "./context/Login";

// // function App() {
// //   return (
// //     <UserProvider>
// //       <Router>
// //         <Routes>
// //           <Route path="/" element={<HomePage />} />
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/signup" element={<SingUp />} />
// //         </Routes>
// //       </Router>
// //     </UserProvider>
// //   );
// // }

// // export default App;