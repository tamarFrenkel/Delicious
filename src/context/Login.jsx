import React, { useState } from "react";
import { useUser } from "./UseContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Card, CardContent, Typography, Container, FormControlLabel, Checkbox } from "@mui/material";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(userName, password, rememberMe)) {
      navigate("/");
    } else {
      alert("שם משתמש או סיסמה שגויים");
      navigate("/Signup");
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: 5, padding: 3, borderRadius: "15px", boxShadow: 3, textAlign: "center", backgroundColor: "#000" }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: "#FFC0CB", marginBottom: 2 }}> התחבר </Typography>
          <form onSubmit={handleLogin}>
            <TextField fullWidth label="שם משתמש" variant="outlined" margin="normal" onChange={(e) => setUserName(e.target.value)} sx={{ backgroundColor: "#FFC0CB", borderRadius: "5px" }} />
            <TextField fullWidth type="password" label="סיסמה" variant="outlined" margin="normal" onChange={(e) => setPassword(e.target.value)} sx={{ backgroundColor: "#FFC0CB", borderRadius: "5px" }} />
            <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />} label="זכור אותי" sx={{ color: "#FFC0CB" }} />
            <Button type="submit" variant="contained" color="secondary" sx={{ marginTop: 2, borderRadius: "8px", backgroundColor: "#FFD700" }} fullWidth> התחבר </Button>
          </form>
          <Button color="secondary" onClick={() => navigate("/signup")} sx={{ marginTop: 2, color: "#FFD700" }}>
             אין לך חשבון? הירשם
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
