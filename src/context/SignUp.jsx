
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
