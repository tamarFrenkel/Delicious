import React, { useEffect, useState } from "react";
import { useUser } from "./UseContext";
import {
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartPage() {
  const { currentUser } = useUser();
  const [cart, setCart] = useState([]);

  // --- שליפת העגלה מהשרת ---
  useEffect(() => {
    if (!currentUser) return;
    fetch(`http://localhost:5000/api/cart/${currentUser.id}`)
      .then((res) => res.json())
      .then((data) => setCart(data.items || []));
  }, [currentUser]);

  // --- עדכון כמות ---
  const updateQuantity = async (productId, change) => {
    await fetch(`http://localhost:5000/api/cart/${currentUser.id}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: change }),
    });

    setCart((prev) =>
      prev.map((item) =>
        item.productId._id === productId
          ? { ...item, quantity: item.quantity + change }
          : item
      )
    );
  };

  // --- מחיקה ---
  const removeFromCart = async (productId) => {
    await fetch(`http://localhost:5000/api/cart/${currentUser.id}/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    setCart((prev) => prev.filter((item) => item.productId._id !== productId));
  };

  // --- סה"כ ---
  const total = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" sx={{ mb: 3, color: "#FFC0CB" }}>
        העגלה שלי
      </Typography>

      {cart.length === 0 ? (
        <Typography>העגלה ריקה</Typography>
      ) : (
        cart.map((item) => (
          <Card
            key={item.productId._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              backgroundColor: "#000",
              border: "1.5px solid #FFD700",
              borderRadius: "10px",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={item.productId.img}
                alt={item.productId.name}
                style={{ width: "80px", height: "80px", borderRadius: "8px" }}
              />
              <div>
                <Typography sx={{ color: "#FFC0CB" }}>
                  {item.productId.name}
                </Typography>
                <Typography sx={{ color: "#FFD700" }}>
                  ₪ {item.productId.price}
                </Typography>
              </div>
            </CardContent>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton
                onClick={() => updateQuantity(item.productId._id, -1)}
                disabled={item.quantity <= 1}
              >
                <RemoveIcon sx={{ color: "#FFC0CB" }} />
              </IconButton>
              <Typography sx={{ color: "#FFD700" }}>{item.quantity}</Typography>
              <IconButton
                onClick={() => updateQuantity(item.productId._id, 1)}
              >
                <AddIcon sx={{ color: "#FFC0CB" }} />
              </IconButton>
              <IconButton onClick={() => removeFromCart(item.productId._id)}>
                <DeleteIcon sx={{ color: "#FF0000" }} />
              </IconButton>
            </div>
          </Card>
        ))
      )}

      <Typography variant="h5" sx={{ mt: 3, color: "#FFD700" }}>
        סה"כ לתשלום: ₪ {total}
      </Typography>

      {cart.length > 0 && (
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#FFC0CB",
            color: "black",
            "&:hover": { backgroundColor: "#ff85a2" },
          }}
          onClick={() => alert("מעבר לתשלום... (כאן יבוא Checkout)")}
        >
          לתשלום
        </Button>
      )}
    </div>
  );
}

// import React from "react";
// import { useUser, setCart } from "../context/UseContext";
// import { Card, CardContent, Typography, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function Cart() {
//   const { cart, setCart } = useUser();

//   const handleRemove = (product) => {
//     setCart((prevCart) => {
//       const index = prevCart.findIndex((item) => item.id === product.id);
//       if (index !== -1) {
//         const updatedCart = [...prevCart];
//         updatedCart.splice(index, 1);
//         return updatedCart;
//       }
//       return prevCart;
//     });
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <Typography variant="h3" sx={{ color: "#FFC0CB" }}>העגלה שלי</Typography>
//       {cart.length === 0 ? (
//         <Typography variant="h5" sx={{ color: "#FFD700" }}>העגלה ריקה</Typography>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
//           {cart.map((product, index) => (
//             <Card key={index} sx={{ display: "flex", alignItems: "center", width: 350, backgroundColor: "#000", border: "1.5px solid #FFD700", padding: "10px" }}>
//               <img src={product.img} alt={product.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <Typography variant="h6" sx={{ color: "#FFC0CB" }}>{product.name}</Typography>
//                 <Typography sx={{ color: "#FFD700" }}>₪ {product.price}</Typography>
//               </CardContent>
//               <IconButton onClick={() => handleRemove(product)} sx={{ color: "red" }}>
//                 <DeleteIcon />
//               </IconButton>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // //דף Cart
// // import React from "react";
// // import { useUser } from "./UseContext";
// // import { Button, Card, CardContent, Typography } from "@mui/material";
// // import DeleteIcon from "@mui/icons-material/Delete";

// // export default function Cart() {
// //   const { cartArr, currentUser, deleteProduct } = useUser();

// //   if (!currentUser) return <Typography variant="h6" textAlign="center">יש להתחבר כדי לראות את עגלת הקניות</Typography>;

// //   const userCart = cartArr.filter((item) => item.userId === currentUser.id);

// //   return (
// //     <>
// //       <Typography variant="h3" sx={{ textAlign: "center", color: "#FF69B4" }}>
// //         עגלת הקניות של {currentUser?.userName}
// //       </Typography>
// //       {userCart.length === 0 ? (
// //         <Typography textAlign="center">העגלה ריקה</Typography>
// //       ) : (
// //         <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
// //           {userCart.map((item, index) => (
// //             <Card key={index} sx={{ width: 250, borderRadius: "15px", boxShadow: 3 }}>
// //               <CardContent>
// //                 <Typography variant="h5">{item.productName}</Typography>
// //                 <Typography color="text.secondary">₪{item.price}</Typography>
// //                 <Button 
// //                   variant="outlined" 
// //                   color="error" 
// //                   startIcon={<DeleteIcon />} 
// //                   onClick={() => deleteProduct(item.productName)}
// //                 >
// //                   הסר מוצר
// //                 </Button>
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // // import React from "react";
// // // import { useUser } from "./UseContext";
// // // import DeleteIcon from '@mui/icons-material/Delete';
// // // import { Button } from "@mui/material";

// // // //עמוד מעולה להגשה

// // // export default function Cart(){

// // //     const { cartArr, currentUser, deleteProduct } = useUser();

// // //     if (!currentUser) return <p>יש להתחבר כדי לראות את עגלת הקניות</p>;

// // //     const userCart = cartArr.filter((item) => item.userId === currentUser.id);

// // //     return(<>
// // //         <h1>עגלת הקניות של: {currentUser?.userName}</h1>
// // //         {userCart.length === 0 ? <p>העגלה ריקה</p> : null}
// // //         {userCart.map((item, index) => (
// // //         <div key={index}>
// // //           <h3>{item.productName}</h3>
// // //           <p>₪{item.price}</p>
// // //           <Button onClick={() => deleteProduct(item.productName)} variant="outlined" startIcon={<DeleteIcon />}>הסר מוצר</Button>
// // //           </div>
// // //       ))}
// // //     </>);
// // //     }
>>>>>>> c71a1de (2)
