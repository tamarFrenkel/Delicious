import React from "react";
import { useUser } from "./UseContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const products = [
  {id: 1, name: "חציל מוקרם", title: "חציל חרוך בהקרמה", price: 98, img: "/images/chazil_mukram.png" },
  {id: 2, name: "קיש אפרסקים", title: "קומפוט אפרסקים אפוי", price: 65, img: "/images/Kish_afarsek.png" },
  {id: 3, name: "סלמון קריספי", title: "דג נע בציפוי אגוזים", price: 196, img: "/images/krispy_salmon.png" },
  {id: 4, name: "בלינצס תפוא", title: "בלינצס ותפוא בטיגון", price: 50, img: "/images/food (1).jpg" },
  {id: 5, name: "שטרודל תפוחים", title: "פרוסות תפחים בקינמון", price: 80, img: "/images/strudel_apple.png" },
  {id: 6, name: "סורבה מנגו", title: " 'מחית מנגו במלאנג ", price: 70, img: "/images/surve_mango.png" },
  {id: 7, name: "שקשוקה ושניצל", title: "מנת צהריים משפחתית", price: 40, img: "/images/food (17).jpg" },
  {id: 8, name: "תותים", title: "מחית תותים עשירה", price: 85, img: "/images/tutim.png" },
  {id: 9, name: "פרח הקינמון", title: "עוגית פרח במילוי קינמון", price: 45, img: "/images/food (15).jpg" },
  {id: 10, name: "ברסט", title: "חלה במילוי קצפת", price: 38, img: "/images/brest.jpg" },
  {id: 11, name: "סושי סלמון", title: "סושי במילוי סלמון נע", price: 65, img: "/images/Sushi.png" },
  {id: 12, name: "פיתה ירוקה", title: "פיתה במילוי ירקות", price: 16, img: "/images/pita_yeruka.webp" },
  {id: 13, name: "ירקות טריים", title: "ירקות טריים בשילוב", price: 30, img: "/images/food (1).png" },
  {id: 14, name: "סושי חברים", title: "סושי מנת חברים", price: 170, img: "/images/food (2).jpg" },
  {id: 15, name: "מוקפץ", title: "פטריות וגזר בהקפצה", price: 55, img: "/images/mukpaz.jpg" },
  {id: 16, name: "קישוא אדמדם", title: "קישואים בתיבול אדום", price: 65, img: "/images/food (2).png" },
  {id: 17, name: "אורז דביק", title: "אורז עגול עשוי מידי", price: 80, img: "/images/food (3).jpg" },
  {id: 18, name: "ניוקי", title: "ניוקי תפוחי אדמה", price: 87, img: "/images/food (14).jpg" },
  {id: 19, name: "עוגיות מקורמלות", title: "עוגיות בשכבות קרמל", price: 63, img: "/images/food (4).jpg" },
  {id: 20, name: "ארוחת בוקר", title: "נודלס וביצה זוגית", price: 67, img: "/images/food (8).jpg" },
  {id: 21, name: "מרק בשר", title: "מרק בשר וירקות", price: 120, img: "/images/food (7).jpg" },
  {id: 22, name: "פסטה אדומה", title: "פסטה ברוטב עגבניות", price: 40, img: "/images/food (9).jpg" },
  {id: 23, name: "חזה מוקפץ", title: "חזה עוף בהקפצה", price: 67, img: "/images/food (10).jpg" },
  {id: 24, name: "פנקייק בריא", title: "פנקייק במילוי גזר", price: 34, img: "/images/food (11).jpg" },
  {id: 25, name: "מקרוני אדום ירוק", title: "מקרוני עגבניות ותרד", price: 89, img: "/images/food (12).jpg" },
];

export default function HomePage() {
  const { addToCart, currentUser } = useUser();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("עליך להתחבר כדי להוסיף מוצרים לעגלה");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <>
      <Typography variant="h3" sx={{ textAlign: "center", color: "#FFC0CB"  }}>
        Bouty food
      </Typography>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {products.map((product, index) => (
          <Card key={index} sx={{ width: 200, borderRadius: "10px", boxShadow: 3, backgroundColor: "#000", border: "1.5px solid #FFD700" }}>
            <CardContent>
              <img src={product.img} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" }} />
              <Typography variant="h5" sx={{ color: "#FFC0CB" }}>{product.name}</Typography>
              <Typography variant="body" sx={{ color: "#FFC0CB" }}>{product.title}</Typography>
              <Typography color="text.secondary" sx={{ color: "#FFD700" }}>₪ {product.price}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddToCart(product)}
                sx={{ backgroundColor: "#FFC0CB", color: "black" }}
              >
              <ShoppingCartIcon />
               הוסף לעגלה
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};