import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [
      { id: 1, userName: "תמר", password: "123" }
    ]
  );

  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUser) {
      setCurrentUser(savedUser);
      const savedCart = JSON.parse(localStorage.getItem(`cart_${savedUser.id}`)) || [];
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    if (currentUser) {
      localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
    }
  }, [currentUser, cart]);

  const login = (userName, password, rememberMe) => {
    const user = users.find((u) => u.userName === userName && u.password === password);
    if (user) {
      setCurrentUser(user);
      if (rememberMe) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
      setCart(JSON.parse(localStorage.getItem(`cart_${user.id}`)) || []);
      return true;
    }
    return false;
  };

  const register = (userName, password) => {
    if (users.some((u) => u.userName === userName)) {
      alert("שם המשתמש כבר קיים");
      return false;
    }
    const newUser = { id: users.length + 1, userName, password };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCart([]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCart([]);
    localStorage.removeItem("currentUser");
  };

  const addToCart = (product) => {
    if (!currentUser) {
      alert("יש להתחבר כדי להוסיף מוצרים לעגלה");
      return;
    }
    setCart([...cart, { ...product, userId: currentUser.id }]);
  };

  const removeFromCart = (productName) => {
    if (!currentUser) return;
    setCart(cart.filter((item) => item.productName !== productName || item.userId !== currentUser.id));
  };

  return (
<<<<<<< HEAD
    <UserContext.Provider value={{ currentUser, users, setCurrentUser, login, register, logout, cart, setCart, addToCart, removeFromCart }}>
=======
    <UserContext.Provider value={{ currentUser, users, removeFromCart, setCurrentUser, login, register, logout, cart, setCart, addToCart, removeFromCart }}>
>>>>>>> c71a1de (2)
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

<<<<<<< HEAD

// import React, { createContext, useState, useContext, useEffect } from "react";

// const UseContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("currentUser")) || null
//   );
//   const [users, setUsers] = useState(
//     JSON.parse(localStorage.getItem("users")) || []
//   );
//   const [cart, setCart] = useState(
//     JSON.parse(localStorage.getItem("cart")) || []
//   );

//   useEffect(() => {
//     localStorage.setItem("currentUser", JSON.stringify(currentUser));
//   }, [currentUser]);

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   const register = (user) => {
//     setUsers((prevUsers) => {
//       const updatedUsers = [...prevUsers, user];
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//       return updatedUsers;
//     });
//     if (user.rememberMe) {
//       setCurrentUser(user);
//     }
//   };

//   const login = (email, password, rememberMe) => {
//     const user = users.find((u) => u.email === email && u.password === password);
=======
// import React, { createContext, useState, useContext, useEffect } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [users, setUsers] = useState(
//     JSON.parse(localStorage.getItem("users")) || [
//       { id: 1, userName: "תמר", password: "123" }
//     ]
//   );

//   const [currentUser, setCurrentUser] = useState(null);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const savedUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (savedUser) {
//       setCurrentUser(savedUser);
//       const savedCart = JSON.parse(localStorage.getItem(`cart_${savedUser.id}`)) || [];
//       setCart(savedCart);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("users", JSON.stringify(users));
//   }, [users]);

//   useEffect(() => {
//     localStorage.setItem("currentUser", JSON.stringify(currentUser));
//     if (currentUser) {
//       localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
//     }
//   }, [currentUser, cart]);

//   const login = (userName, password, rememberMe) => {
//     const user = users.find((u) => u.userName === userName && u.password === password);
>>>>>>> c71a1de (2)
//     if (user) {
//       setCurrentUser(user);
//       if (rememberMe) {
//         localStorage.setItem("currentUser", JSON.stringify(user));
//       }
<<<<<<< HEAD
//     }
=======
//       setCart(JSON.parse(localStorage.getItem(`cart_${user.id}`)) || []);
//       return true;
//     }
//     return false;
//   };

//   const register = (userName, password) => {
//     if (users.some((u) => u.userName === userName)) {
//       alert("שם המשתמש כבר קיים");
//       return false;
//     }
//     const newUser = { id: users.length + 1, userName, password };
//     setUsers([...users, newUser]);
//     setCurrentUser(newUser);
//     setCart([]);
//     localStorage.setItem("users", JSON.stringify([...users, newUser]));
//     localStorage.setItem("currentUser", JSON.stringify(newUser));
//     return true;
>>>>>>> c71a1de (2)
//   };

//   const logout = () => {
//     setCurrentUser(null);
<<<<<<< HEAD
=======
//     setCart([]);
>>>>>>> c71a1de (2)
//     localStorage.removeItem("currentUser");
//   };

//   const addToCart = (product) => {
<<<<<<< HEAD
//     setCart((prevCart) => [...prevCart, product]);
//   };

//   const removeFromCart = (productId) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
//   };

//   return (
//     <UseContext.Provider value={{
//       currentUser,
//       users,
//       login,
//       register,
//       logout,
//       cart,
//       addToCart,
//       removeFromCart
//     }}>
//       {children}
//     </UseContext.Provider>
//   );
// };

// export const useUser = () => useContext(UseContext);
=======
//     if (!currentUser) {
//       alert("יש להתחבר כדי להוסיף מוצרים לעגלה");
//       return;
//     }
//     setCart([...cart, { ...product, userId: currentUser.id }]);
//   };

//   const removeFromCart = (productName) => {
//     if (!currentUser) return;
//     setCart(cart.filter((item) => item.productName !== productName || item.userId !== currentUser.id));
//   };

//   return (
//     <UserContext.Provider value={{ currentUser, users, setCurrentUser, login, register, logout, cart, setCart, addToCart, removeFromCart }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


// // import React, { createContext, useState, useContext, useEffect } from "react";

// // const UseContext = createContext();

// // export const UserProvider = ({ children }) => {
// //   const [currentUser, setCurrentUser] = useState(
// //     JSON.parse(localStorage.getItem("currentUser")) || null
// //   );
// //   const [users, setUsers] = useState(
// //     JSON.parse(localStorage.getItem("users")) || []
// //   );
// //   const [cart, setCart] = useState(
// //     JSON.parse(localStorage.getItem("cart")) || []
// //   );

// //   useEffect(() => {
// //     localStorage.setItem("currentUser", JSON.stringify(currentUser));
// //   }, [currentUser]);

// //   useEffect(() => {
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //   }, [cart]);

// //   const register = (user) => {
// //     setUsers((prevUsers) => {
// //       const updatedUsers = [...prevUsers, user];
// //       localStorage.setItem("users", JSON.stringify(updatedUsers));
// //       return updatedUsers;
// //     });
// //     if (user.rememberMe) {
// //       setCurrentUser(user);
// //     }
// //   };

// //   const login = (email, password, rememberMe) => {
// //     const user = users.find((u) => u.email === email && u.password === password);
// //     if (user) {
// //       setCurrentUser(user);
// //       if (rememberMe) {
// //         localStorage.setItem("currentUser", JSON.stringify(user));
// //       }
// //     }
// //   };

// //   const logout = () => {
// //     setCurrentUser(null);
// //     localStorage.removeItem("currentUser");
// //   };

// //   const addToCart = (product) => {
// //     setCart((prevCart) => [...prevCart, product]);
// //   };

// //   const removeFromCart = (productId) => {
// //     setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
// //   };

// //   return (
// //     <UseContext.Provider value={{
// //       currentUser,
// //       users,
// //       login,
// //       register,
// //       logout,
// //       cart,
// //       addToCart,
// //       removeFromCart
// //     }}>
// //       {children}
// //     </UseContext.Provider>
// //   );
// // };

// // export const useUser = () => useContext(UseContext);
>>>>>>> c71a1de (2)


 

<<<<<<< HEAD
// // //דף UseContext:
// // import { createContext, useState, useContext } from "react";
// // // import { UserContext } from "../pages/UserContext";

// // //עמוד מעולה להגשה

// // export const UseContext = createContext();

// // //לייצא - export
// // export const UserProvider = ({ children }) => {

// //     //מערך משתמשים
// //     const [usersArr, setUsersArr] = useState([
// //         { code: 1, userName: "הלל", userId: 1, password: "12345" },
// //         { code: "", userName: "", userId: "", password: "" },
// //     ]);
    
// //     //מערך מוצרים
// //     const [cartArr, setCartArr] = useState([
// //         { userId: 1, productName: "pasta", price: 25.8 }
// //     ]);
// //     //בחירת משתמש
// //     const [currentUser, setCurrentUser] = useState();
// //     //1
// //     const Login = (userName, password) => {
// //         {const foundUser = usersArr.find((u)=> u.password===password && u.userName === userName);
// //             if(foundUser)
// //                 {
// //                     setCurrentUser(foundUser);
// //                     return true;
// //                 }  
// //                 return false;}
// //     };

// //     //2
// //     const addUser = (user) => {
// //         const newUser = { id: usersArr.length + 1, ...user };
// //         setUsersArr([...usersArr, newUser]);
// //         setCurrentUser(newUser);
// //     };

// //     //3
// //     const logout = () => {
// //         setCurrentUser(null); 
// //     };

// //     //4
// //     const addProduct = (product) => {
// //         if (!currentUser) {
// //             alert("יש להתחבר כדי להוסיף מוצר לעגלה");
// //             return;
// //         }
// //             setCartArr([...cartArr, { ...product, userId: currentUser.id }]);
// //     };

// //     //5
// //     const deleteProduct = (product) =>{
// //         setCartArr(cartArr.filter((item) => item.productName !== product.productName || item.userId !== currentUser?.id));
// //         // להבין את ההבדלים ביניהם.
// //         // cartArr.splice(cartArr.find((u) => u.productName == product.productName), 1);
// //     };
    

// //     return (
// //         //מגדירה לאיזה פרמטרים ניתן לגשת במערך
// //         <UseContext.Provider value={{ cartArr, usersArr, addUser, Login, logout, deleteProduct, addProduct }}>
// //             {children}
// //         </UseContext.Provider>
// //     );
// // };

// // export const useUser = () => useContext(UseContext);
=======
// // // //דף UseContext:
// // // import { createContext, useState, useContext } from "react";
// // // // import { UserContext } from "../pages/UserContext";

// // // //עמוד מעולה להגשה

// // // export const UseContext = createContext();

// // // //לייצא - export
// // // export const UserProvider = ({ children }) => {

// // //     //מערך משתמשים
// // //     const [usersArr, setUsersArr] = useState([
// // //         { code: 1, userName: "הלל", userId: 1, password: "12345" },
// // //         { code: "", userName: "", userId: "", password: "" },
// // //     ]);
    
// // //     //מערך מוצרים
// // //     const [cartArr, setCartArr] = useState([
// // //         { userId: 1, productName: "pasta", price: 25.8 }
// // //     ]);
// // //     //בחירת משתמש
// // //     const [currentUser, setCurrentUser] = useState();
// // //     //1
// // //     const Login = (userName, password) => {
// // //         {const foundUser = usersArr.find((u)=> u.password===password && u.userName === userName);
// // //             if(foundUser)
// // //                 {
// // //                     setCurrentUser(foundUser);
// // //                     return true;
// // //                 }  
// // //                 return false;}
// // //     };

// // //     //2
// // //     const addUser = (user) => {
// // //         const newUser = { id: usersArr.length + 1, ...user };
// // //         setUsersArr([...usersArr, newUser]);
// // //         setCurrentUser(newUser);
// // //     };

// // //     //3
// // //     const logout = () => {
// // //         setCurrentUser(null); 
// // //     };

// // //     //4
// // //     const addProduct = (product) => {
// // //         if (!currentUser) {
// // //             alert("יש להתחבר כדי להוסיף מוצר לעגלה");
// // //             return;
// // //         }
// // //             setCartArr([...cartArr, { ...product, userId: currentUser.id }]);
// // //     };

// // //     //5
// // //     const deleteProduct = (product) =>{
// // //         setCartArr(cartArr.filter((item) => item.productName !== product.productName || item.userId !== currentUser?.id));
// // //         // להבין את ההבדלים ביניהם.
// // //         // cartArr.splice(cartArr.find((u) => u.productName == product.productName), 1);
// // //     };
    

// // //     return (
// // //         //מגדירה לאיזה פרמטרים ניתן לגשת במערך
// // //         <UseContext.Provider value={{ cartArr, usersArr, addUser, Login, logout, deleteProduct, addProduct }}>
// // //             {children}
// // //         </UseContext.Provider>
// // //     );
// // // };

// // // export const useUser = () => useContext(UseContext);
>>>>>>> c71a1de (2)
