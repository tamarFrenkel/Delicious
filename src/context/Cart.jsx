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

// //דף Cart
// import React from "react";
// import { useUser } from "./UseContext";
// import { Button, Card, CardContent, Typography } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function Cart() {
//   const { cartArr, currentUser, deleteProduct } = useUser();

//   if (!currentUser) return <Typography variant="h6" textAlign="center">יש להתחבר כדי לראות את עגלת הקניות</Typography>;

//   const userCart = cartArr.filter((item) => item.userId === currentUser.id);

//   return (
//     <>
//       <Typography variant="h3" sx={{ textAlign: "center", color: "#FF69B4" }}>
//         עגלת הקניות של {currentUser?.userName}
//       </Typography>
//       {userCart.length === 0 ? (
//         <Typography textAlign="center">העגלה ריקה</Typography>
//       ) : (
//         <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
//           {userCart.map((item, index) => (
//             <Card key={index} sx={{ width: 250, borderRadius: "15px", boxShadow: 3 }}>
//               <CardContent>
//                 <Typography variant="h5">{item.productName}</Typography>
//                 <Typography color="text.secondary">₪{item.price}</Typography>
//                 <Button 
//                   variant="outlined" 
//                   color="error" 
//                   startIcon={<DeleteIcon />} 
//                   onClick={() => deleteProduct(item.productName)}
//                 >
//                   הסר מוצר
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }

// // import React from "react";
// // import { useUser } from "./UseContext";
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import { Button } from "@mui/material";

// // //עמוד מעולה להגשה

// // export default function Cart(){

// //     const { cartArr, currentUser, deleteProduct } = useUser();

// //     if (!currentUser) return <p>יש להתחבר כדי לראות את עגלת הקניות</p>;

// //     const userCart = cartArr.filter((item) => item.userId === currentUser.id);

// //     return(<>
// //         <h1>עגלת הקניות של: {currentUser?.userName}</h1>
// //         {userCart.length === 0 ? <p>העגלה ריקה</p> : null}
// //         {userCart.map((item, index) => (
// //         <div key={index}>
// //           <h3>{item.productName}</h3>
// //           <p>₪{item.price}</p>
// //           <Button onClick={() => deleteProduct(item.productName)} variant="outlined" startIcon={<DeleteIcon />}>הסר מוצר</Button>
// //           </div>
// //       ))}
// //     </>);
// //     }
