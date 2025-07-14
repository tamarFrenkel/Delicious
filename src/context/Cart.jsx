import React from "react";
import { useUser, setCart } from "../context/UseContext";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Cart() {
  const { cart, setCart } = useUser();

  const handleRemove = (product) => {
    setCart((prevCart) => {
      const index = prevCart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart.splice(index, 1);
        return updatedCart;
      }
      return prevCart;
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h3" sx={{ color: "#FFC0CB" }}>העגלה שלי</Typography>
      {cart.length === 0 ? (
        <Typography variant="h5" sx={{ color: "#FFD700" }}>העגלה ריקה</Typography>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
          {cart.map((product, index) => (
            <Card key={index} sx={{ display: "flex", alignItems: "center", width: 350, backgroundColor: "#000", border: "1.5px solid #FFD700", padding: "10px" }}>
              <img src={product.img} alt={product.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ color: "#FFC0CB" }}>{product.name}</Typography>
                <Typography sx={{ color: "#FFD700" }}>₪ {product.price}</Typography>
              </CardContent>
              <IconButton onClick={() => handleRemove(product)} sx={{ color: "red" }}>
                <DeleteIcon />
              </IconButton>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
