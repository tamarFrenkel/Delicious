import React, { useEffect, useState } from "react";
import { useUser } from "../UseContext";
import { Typography, Card, CardContent, Button } from "@mui/material";

export default function CheckoutPage() {
  const { currentUser } = useUser();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!currentUser) return;
    fetch(`http://localhost:5000/api/cart/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.items || []);
        const t = data.items.reduce(
          (sum, item) => sum + item.productId.price * item.quantity,
          0
        );
        setTotal(t);
      });
  }, [currentUser]);

  const handlePayment = async () => {
    // קריאה לשרת ליצירת session של Stripe
    const res = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: currentUser.id }),
    });
    const data = await res.json();
    // ניתוב ל-Stripe
    window.location.href = data.url;
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#FFC0CB" }}>
        סיכום הזמנה
      </Typography>

      {cart.map((item) => (
        <Card
          key={item.productId._id}
          sx={{
            mb: 2,
            backgroundColor: "#000",
            border: "1.5px solid #FFD700",
            borderRadius: "10px",
          }}
        >
          <CardContent>
            <Typography sx={{ color: "#FFC0CB" }}>
              {item.productId.name} × {item.quantity}
            </Typography>
            <Typography sx={{ color: "#FFD700" }}>
              ₪ {item.productId.price * item.quantity}
            </Typography>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h5" sx={{ mt: 3, color: "#FFD700" }}>
        סה"כ: ₪ {total}
      </Typography>

      <Button
        variant="contained"
        sx={{ mt: 2, backgroundColor: "#FFC0CB", color: "black" }}
        onClick={handlePayment}
      >
        המשך לתשלום
      </Button>
    </div>
  );
}
