
import React, { useState } from "react";
import { useUser } from "./UseContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Card, CardContent, Typography, Container } from "@mui/material";

export default function Signup() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (register(userName, password)) {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: 5, padding: 3, borderRadius: "15px", boxShadow: 3, textAlign: "center", backgroundColor: "#000" }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: "#FFC0CB", marginBottom: 2 }}> הרשמה </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="שם משתמש"
              variant="outlined"
              margin="normal"
              onChange={(e) => setUserName(e.target.value)}
              sx={{ backgroundColor: "#FFC0CB", borderRadius: "5px" }}
            />
            <TextField
              fullWidth
              type="password"
              label="סיסמה"
              variant="outlined"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: "#FFC0CB", borderRadius: "5px" }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2, borderRadius: "8px", backgroundColor: "#FFD700" }}
              onClick={() => navigate("/")}
              fullWidth
            >
              הירשם
            </Button>
          </form>
          <Button color="secondary" onClick={() => navigate("/login")} sx={{ marginTop: 2, color: "#FFD700" }}>
            כבר יש לך חשבון? התחבר
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
<<<<<<< HEAD
=======


// import React, { useState } from "react";
// import { useUser } from "./UseContext";
// import { useNavigate } from "react-router-dom";
// import { Button, TextField, Card, CardContent, Typography, Container } from "@mui/material";

// export default function Signup() {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const { register } = useUser();
//   const navigate = useNavigate();

//   const handleSignup = (e) => {
//     e.preventDefault();
//     if (register(userName, password)) {
//       navigate("/");
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Card sx={{ marginTop: 5, padding: 3, borderRadius: "15px", boxShadow: 3, textAlign: "center", backgroundColor: "#000" }}>
//         <CardContent>
//           <Typography variant="h4" sx={{ color: "#FFC0CB", marginBottom: 2 }}> הרשמה </Typography>
//           <form onSubmit={handleSignup}>
//             <TextField
//               fullWidth
//               label="שם משתמש"
//               variant="outlined"
//               margin="normal"
//               onChange={(e) => setUserName(e.target.value)}
//               sx={{ backgroundColor: "#FFC0CB", borderRadius: "5px" }}
//             />
//             <TextField
//               fullWidth
//               type="password"
//               label="סיסמה"
//               variant="outlined"
//               margin="normal"
//               onChange={(e) => setPassword(e.target.value)}
//               sx={{ backgroundColor: "#FFC0CB", borderRadius: "5px" }}
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="secondary"
//               sx={{ marginTop: 2, borderRadius: "8px", backgroundColor: "#FFD700" }}
//               onClick={() => navigate("/")}
//               fullWidth
//             >
//               הירשם
//             </Button>
//           </form>
//           <Button color="secondary" onClick={() => navigate("/login")} sx={{ marginTop: 2, color: "#FFD700" }}>
//             כבר יש לך חשבון? התחבר
//           </Button>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }



// // // דף SignUp
// // import React, { useState } from "react";
// // import { useUser } from "./UseContext";
// // import { useNavigate } from "react-router-dom";
// // import { Button, TextField, Card, CardContent, Typography, Container } from "@mui/material";

// // export default function SignUp() {
// //   const [user, setUser] = useState({ userName: "", password: "" });
// //   const { addUser } = useUser();
// //   const navigate = useNavigate();

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     addUser(user);
// //     navigate("/");
// //   };

// //   return (
// //     <Container maxWidth="sm">
// //       <Card sx={{ marginTop: 5, padding: 3, borderRadius: "15px", boxShadow: 3, textAlign: "center" }}>
// //         <CardContent>
// //           <Typography variant="h4" sx={{ color: "#FF69B4", marginBottom: 2 }}>
// //             הירשם
// //           </Typography>
// //           <form onSubmit={handleSubmit}>
// //             <TextField
// //               fullWidth
// //               label="שם משתמש"
// //               variant="outlined"
// //               margin="normal"
// //               onChange={(e) => setUser({ ...user, userName: e.target.value })}
// //             />
// //             <TextField
// //               fullWidth
// //               type="password"
// //               label="סיסמה"
// //               variant="outlined"
// //               margin="normal"
// //               onChange={(e) => setUser({ ...user, password: e.target.value })}
// //             />
// //             <Button
// //               type="submit"
// //               variant="contained"
// //               color="primary"
// //               sx={{ marginTop: 2, borderRadius: "8px" }}
// //               fullWidth
// //             >
// //               הירשם
// //             </Button>
// //           </form>
// //           <Button
// //             color="secondary"
// //             onClick={() => navigate("/login")}
// //             sx={{ marginTop: 2 }}
// //           >
// //             כבר יש לך חשבון? התחבר
// //           </Button>
// //         </CardContent>
// //       </Card>
// //     </Container>
// //   );
// // }


// // // import React, { useState } from "react";
// // // import { useUser } from "./UseContext";
// // // import { useNavigate } from "react-router-dom";
// // // import SendIcon from '@mui/icons-material/Send';
// // // import { Button } from "@mui/material";
// // // //עמוד מעולה להגשה

// // // export default function SignUp() {
// // //   const [user, setUser] = useState({ userName: "", password: "" });
// // //   const { addUser } = useUser();
// // //   const navigate = useNavigate();

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
// // //     console.log(e.target[0].value);
// // //     addUser(user);
// // //     navigate("/");
// // //    };
     
// // //     return (
// // //         <form onSubmit={handleSubmit}>
// // //           <input type="text" placeholder="שם משתמש" onChange={(e) => setUser({ ...user, userName: e.target.value })} />
// // //           <input type="password" placeholder="סיסמה" onChange={(e) => setUser({ ...user, password: e.target.value })} />
// // //           <Button type="sudmit" variant="contained" endIcon={<SendIcon />}>הירשם</Button>
// // //         </form>
// // //       );
// // //     }
   
>>>>>>> c71a1de (2)
