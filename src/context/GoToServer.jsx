import React, { useState, useEffect } from "react";
import axios from "axios";
import {Typography,Card,CardContent,Grid,Dialog,DialogTitle,DialogContent,
        Avatar,Grow,Button,IconButton,Box,TextField,InputLabel,DialogActions} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Collapse from "@mui/material/Collapse";

export default function GoToServer() {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingWorkerId, setEditingWorkerId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState(null);
  const [collapsedWorkers, setCollapsedWorkers] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    salary: "",
    age: "",
    image: null
  });

  const fetchWorkers = async () => {
    try {
      const res = await axios.get("https://restorunse.onrender.com/api/workers")
      setWorkers(res.data);
    } catch (err) {
      console.error(err);
      alert("אירעה שגיאה בעת שליפת העובדים");
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  useEffect(() => {
    const collapsedMap = {};
    workers.forEach(worker => {
      collapsedMap[worker._id] = true;
    });
    setCollapsedWorkers(collapsedMap);
  }, [workers]);

    const handleOpen = (worker) => {
    setSelectedWorker(worker);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWorker(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === "image" ? files[0] : value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post("https://restorunse.onrender.com/api/workers", data);
      alert("🟢 עובד נוסף בהצלחה!");
      setOpenAdd(false);
      setFormData({ name: "", role: "", salary: "", age: "", image: null });
      fetchWorkers();
    } catch (err) {
      console.error(err);
      alert("❌ שגיאה בהוספה");
    }
  };

  const handleDeleteConfirm = async () => {
    const id = workerToDelete._id;
    setCollapsedWorkers((prev) => ({ ...prev, [id]: false }));

    setTimeout(async () => {
      try {
        await axios.delete(`https://restorunse.onrender.com/api/workers/${id}`);
        setOpenDeleteDialog(false);
        setOpen(false);
        fetchWorkers();
      } catch (err) {
        alert("⚠️ שגיאה במחיקה");
      }
    }, 400);
  };

  const openDeleteConfirmation = (worker) => {
    setWorkerToDelete(worker);
    setOpenDeleteDialog(true);
  };

  const handleEditOpen = (worker) => {
    setEditingWorkerId(worker._id);
    setFormData({
      name: worker.name,
      role: worker.role,
      salary: worker.salary,
      age: worker.age,
      image: null
    });
    setOpenEdit(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await axios.put(`https://restorunse.onrender.com/api/workers/${editingWorkerId}`, data);
      alert("🟢 עובד עודכן בהצלחה!");
      setOpenEdit(false);
      setFormData({ name: "", role: "", salary: "", age: "", image: null });
      fetchWorkers();
    } catch (err) {
      console.error(err);
      alert("❌ שגיאה בעדכון");
    }
  };
  return (
    <div style={{ textAlign: "center", margin: "20px", minHeight: "100vh", backgroundColor: "#121212" }}>
      <Button
        onClick={fetchWorkers}
        sx={{
          padding: "10px 20px",
          backgroundColor: "#FFC0CB",
          color: "white",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          "&:hover": { backgroundColor: "#ff9bb0" }
        }}
      >
        show me
      </Button>

      <Box sx={{ textAlign: "right", margin: "10px 20px" }}>
        <AddBoxIcon
          onClick={() => setOpenAdd(true)}
          sx={{
            fontSize: 40,
            color: "#FFC0CB",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": { color: "#ff9bb0" }
          }}
        />
      </Box>

      {workers.length > 0 && (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 3, px: 2 }}>
          {workers.map((worker) => (
            <Grid item xs={12} sm={6} md={4} key={worker._id}>
              <Collapse in={collapsedWorkers[worker._id] !== false} timeout={400}>
                <Card sx={{ backgroundColor: "#1e1e1e", color: "white", borderRadius: "10px", padding: "10px" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        cursor: "pointer",
                        textDecoration: "underline",
                        color: "#FFC0CB"
                      }}
                      onClick={() => handleOpen(worker)}
                    >
                      👤 {worker.name}
                    </Typography>
                    <Typography variant="body2" color="gray">
                      {worker.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Collapse>
            </Grid>
          ))}
        </Grid>
      )}


      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Grow}
        PaperProps={{
          sx: {
            backgroundColor: "#2c2c2c",
            color: "white",
            padding: "20px",
            borderRadius: "12px"
          }
        }}
        BackdropProps={{
          sx: { backgroundColor: "rgba(0,0,0,0.6)" }
        }}
      >
        <DialogTitle sx={{ textAlign: "center", color: "#FFC0CB" }}>
          Details👩‍🍳
        </DialogTitle>

        <DialogContent>
          {selectedWorker && (
            <Box sx={{ textAlign: "left" }}>
              <Avatar
                src={
                  selectedWorker.image
                    ? `https://restorunse.onrender.com/api/${selectedWorker.image}`
                    : undefined
                }
                sx={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 20px",
                  bgcolor: "#FFC0CB",
                  color: "black",
                  fontSize: 32
                }}
              >
                {selectedWorker.name.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h6">{selectedWorker.name}</Typography>
              <Typography>{selectedWorker.role}</Typography>
              <Typography>age: {selectedWorker.age}</Typography>
              <Typography>salary: ₪ {selectedWorker.salary}</Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                <IconButton
                  onClick={() => {
                    handleEditOpen(selectedWorker);
                    setOpen(false);
                  }}
                  sx={{ color: "#FFC0CB" }}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  onClick={() => openDeleteConfirmation(selectedWorker)}
                  sx={{ color: "#FF6B6B" }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        TransitionComponent={Grow}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "12px"
          }
        }}
        BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.6)" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#FFC0CB"
          }}
        >
          Add Worker
          <IconButton onClick={() => setOpenAdd(false)}>
            <CloseIcon sx={{ color: "#FFC0CB" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleAddSubmit} encType="multipart/form-data">
            <TextField
              fullWidth
              label="שם"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <TextField
              fullWidth
              label="תפקיד"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <TextField
              fullWidth
              label="גיל"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <TextField
              fullWidth
              label="שכר"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <InputLabel sx={{ color: "#ccc", mt: 2 }}>תמונה</InputLabel>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ color: "white", marginTop: "7px" }}
            />

            <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#FFC0CB", color: "black", fontWeight: "bold" }}
              >
                Add
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        TransitionComponent={Grow}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "12px"
          }
        }}
        BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.6)" } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#FFC0CB"
          }}
        >
          Edit Worker
          <IconButton onClick={() => setOpenEdit(false)}>
            <CloseIcon sx={{ color: "#FFC0CB" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleEditSubmit} encType="multipart/form-data">
            <TextField
              fullWidth
              label="שם"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <TextField
              fullWidth
              label="תפקיד"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <TextField
              fullWidth
              label="גיל"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <TextField
              fullWidth
              label="שכר"
              name="salary"
              type="number"
              value={formData.salary}
              onChange={handleChange}
              required
              margin="normal"
              variant="outlined"
              sx={{ input: { color: "white" }, label: { color: "#ccc" } }}
            />
            <InputLabel sx={{ color: "#ccc", mt: 2 }}>תמונה חדשה (לא חובה)</InputLabel>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{ color: "white", marginTop: "7px" }}
            />

            <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "#FFC0CB", color: "black", fontWeight: "bold" }}
              >
                Update
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* דיאלוג אישור מחיקה */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        TransitionComponent={Grow}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: "12px"
          }
        }}
        BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.6)" } }}
      >
        <DialogTitle sx={{ color: "#FFC0CB", textAlign: "center" }}>
          ?האם אתה בטוח שברצונך למחוק
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", mt: 1 }}>
          <Typography>⚠️ פעולה זו לא ניתנת לביטול</Typography>
          <Typography sx={{ mt: 2, fontWeight: "bold", color: "#ffb3c6" }}>
            {workerToDelete?.name}
          
        </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
          <Button
            onClick={() => setOpenDeleteDialog(false)}
            sx={{ color: "#aaa", border: "1px solid #555" }}
          >
            ביטול
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{ backgroundColor: "#FF6B6B", color: "white", fontWeight: "bold" }}
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Typography, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent,
//   Avatar, Grow, Button, IconButton, Box, TextField, InputLabel, DialogActions
// } from "@mui/material";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import CloseIcon from "@mui/icons-material/Close";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Collapse from "@mui/material/Collapse";


// export default function GoToServer() {
//   const [workers, setWorkers] = useState([]);
//   const [selectedWorker, setSelectedWorker] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editingWorkerId, setEditingWorkerId] = useState(null);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [workerToDelete, setWorkerToDelete] = useState(null);
//   const [collapsedWorkers, setCollapsedWorkers] = useState({});



//   const [formData, setFormData] = useState({
//     name: "", role: "", salary: "", age: "", image: null
//   });

//   const fetchWorkers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/workers");
//       setWorkers(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("אירעה שגיאה בעת שליפת העובדים");
//     }
//   };

//   useEffect(() => {
//   fetchWorkers();
// }, []);

// useEffect(() => {
//   const collapsedMap = {};
//   workers.forEach(worker => {
//     collapsedMap[worker._id] = true;
//   });
//   setCollapsedWorkers(collapsedMap);
// }, [workers]);

//   const handleOpen = (worker) => {
//     setSelectedWorker(worker);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedWorker(null);
//   };

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: name === "image" ? files[0] : value });
//   };

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => data.append(key, formData[key]));

//     try {
//       await axios.post("http://localhost:5000/api/workers", data);
//       alert("🟢 עובד נוסף בהצלחה!");
//       setOpenAdd(false);
//       setFormData({ name: "", role: "", salary: "", age: "", image: null });
//       fetchWorkers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ שגיאה בהוספה");
//     }
//   };

// const handleDeleteConfirm = async () => {
//   const id = workerToDelete._id;

//   setCollapsedWorkers((prev) => ({ ...prev, [id]: false }));

//   setTimeout(async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/workers/${id}`);
//       setOpenDeleteDialog(false);
//       setOpen(false);
//       fetchWorkers();
//     } catch (err) {
//       alert("⚠️ שגיאה במחיקה");
//     }
//   }, 400);
// };


// const openDeleteConfirmation = (worker) => {
//   setWorkerToDelete(worker);
//   setOpenDeleteDialog(true);
// };


//     const handleEditOpen = (worker) => {
//     setEditingWorkerId(worker._id);
//     setFormData({
//       name: worker.name,
//       role: worker.role,
//       salary: worker.salary,
//       age: worker.age,
//       image: null
//     });
//     setOpenEdit(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (formData[key]) data.append(key, formData[key]);
//     });

//     try {
//       await axios.put(`http://localhost:5000/api/workers/${editingWorkerId}`, data);
//       alert("🟢 עובד עודכן בהצלחה!");
//       setOpenEdit(false);
//       setFormData({ name: "", role: "", salary: "", age: "", image: null });
//       fetchWorkers();
//     } catch (err) {
//       console.error(err);
//       alert("❌ שגיאה בעדכון");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", margin: "20px", minHeight: "100vh", backgroundColor: "#121212" }}>
//       <Button
//         onClick={fetchWorkers}
//         sx={{
//           padding: "10px 20px", backgroundColor: "#FFC0CB", color: "white", borderRadius: "5px",
//           fontWeight: "bold", fontSize: "16px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
//           "&:hover": { backgroundColor: "#ff9bb0" }
//         }}
//       >
//         show me
//       </Button>

//       <Box sx={{ textAlign: "right", margin: "10px 20px" }}>
//         <AddBoxIcon
//           onClick={() => setOpenAdd(true)}
//           sx={{ fontSize: 40, color: "#FFC0CB", cursor: "pointer", transition: "0.3s", "&:hover": { color: "#ff9bb0" } }}
//         />
//       </Box>

//       {workers.length > 0 && (
//   <Grid container spacing={2} justifyContent="center" sx={{ mt: 3, px: 2 }}>
//     {workers.map((worker) => (
//       // 👇 זה המקום הנכון להכניס את הקטע שהוביל לשגיאה
//       <Grid item xs={12} sm={6} md={4} key={worker._id}>
//         <Collapse in={collapsedWorkers[worker._id] !== false} timeout={400}>
//           <Card sx={{ backgroundColor: "#1e1e1e", color: "white", borderRadius: "10px", padding: "10px" }}>
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 sx={{ cursor: "pointer", textDecoration: "underline", color: "#FFC0CB" }}
//                 onClick={() => handleOpen(worker)}
//               >
//                 👤 {worker.name}
//               </Typography>
//               <Typography variant="body2" color="gray">
//                 {worker.role}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Collapse>
//       </Grid>
//     ))}
//   </Grid>
// )}


//       <Dialog
//   open={open}
//   onClose={handleClose}
//   TransitionComponent={Grow}
//   PaperProps={{ sx: { backgroundColor: "#2c2c2c", color: "white", padding: "20px", borderRadius: "12px" } }}
//   BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.6)" } }}
// >
//   <DialogTitle sx={{ textAlign: "center", color: "#FFC0CB" }}>
//     Details👩‍🍳
//   </DialogTitle>

//   <DialogContent>
//     {selectedWorker && (
//       <Box sx={{ textAlign: "left" }}>
//         <Avatar
//           src={selectedWorker.image ? `http://localhost:5000${selectedWorker.image}` : undefined}
//           sx={{ width: 80, height: 80, margin: "0 auto 20px", bgcolor: "#FFC0CB", color: "black", fontSize: 32 }}
//         >
//           {selectedWorker.name.charAt(0).toUpperCase()}
//         </Avatar>

//         <Typography variant="h6">{selectedWorker.name}</Typography>
//         <Typography>{selectedWorker.role}</Typography>
//         <Typography>age: {selectedWorker.age}</Typography>
//         <Typography>salary: ₪ {selectedWorker.salary}</Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
//           <IconButton
//             onClick={() => {
//               handleEditOpen(selectedWorker);
//               setOpen(false); 
//             }}
//             sx={{ color: "#FFC0CB" }}
//           >
//             <EditIcon />
//           </IconButton>

//           <IconButton
//             onClick={() => openDeleteConfirmation(selectedWorker)}
//             sx={{ color: "#FF6B6B" }}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//         </Box>
//         )}
//         </DialogContent>
//       </Dialog>


//       <Dialog
//         open={openAdd}
//         onClose={() => setOpenAdd(false)}
//         TransitionComponent={Grow}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { backgroundColor: "#1e1e1e", color: "white", borderRadius: "12px" } }}
//         BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.6)" } }}
//       >
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#FFC0CB" }}>
//           Add Worker
//           <IconButton onClick={() => setOpenAdd(false)}>
//             <CloseIcon sx={{ color: "#FFC0CB" }} />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent>
//           <Box component="form" onSubmit={handleAddSubmit} encType="multipart/form-data">
//             <TextField fullWidth label="שם" name="name" value={formData.name} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <TextField fullWidth label="תפקיד" name="role" value={formData.role} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <TextField fullWidth label="גיל" name="age" type="number" value={formData.age} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <TextField fullWidth label="שכר" name="salary" type="number" value={formData.salary} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <InputLabel sx={{ color: "#ccc", mt: 2 }}>תמונה</InputLabel>
//             <input type="file" name="image" accept="image/*" onChange={handleChange}
//               style={{ color: "white", marginTop: "7px" }} />

//             <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
//               <Button type="submit" variant="contained" sx={{ backgroundColor: "#FFC0CB", color: "black", fontWeight: "bold" }}>
//                 Add
//               </Button>
//             </DialogActions>
//           </Box>
//         </DialogContent>
//       </Dialog>

//       <Dialog
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         TransitionComponent={Grow}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { backgroundColor: "#1e1e1e", color: "white", borderRadius: "12px" } }}
//         BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.6)" } }}
//       >
//         <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#FFC0CB" }}>
//           Edit Worker
//           <IconButton onClick={() => setOpenEdit(false)}>
//             <CloseIcon sx={{ color: "#FFC0CB" }} />
//           </IconButton>
//         </DialogTitle>

//         <DialogContent>
//           <Box component="form" onSubmit={handleEditSubmit} encType="multipart/form-data">
//             <TextField fullWidth label="שם" name="name" value={formData.name} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <TextField fullWidth label="תפקיד" name="role" value={formData.role} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <TextField fullWidth label="גיל" name="age" type="number" value={formData.age} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <TextField fullWidth label="שכר" name="salary" type="number" value={formData.salary} onChange={handleChange} required margin="normal" variant="outlined"
//               sx={{ input: { color: "white" }, label: { color: "#ccc" } }} />
//             <InputLabel sx={{ color: "#ccc", mt: 2 }}>תמונה חדשה (לא חובה)</InputLabel>
//             <input type="file" name="image" accept="image/*" onChange={handleChange}
//               style={{ color: "white", marginTop: "7px" }} />

//             <DialogActions sx={{ justifyContent: "center", mt: 2 }}>
//               <Button type="submit" variant="contained" sx={{ backgroundColor: "#FFC0CB", color: "black", fontWeight: "bold" }}>
//                 Update
//               </Button>
//             </DialogActions>
//           </Box>
//         </DialogContent>
//       </Dialog>

//       <Dialog
//         open={openDeleteDialog}
//         onClose={() => setOpenDeleteDialog(false)}
//         TransitionComponent={Grow}
//         maxWidth="xs"
//         fullWidth
//         PaperProps={{ sx: { backgroundColor: "#1e1e1e", color: "white", borderRadius: "12px" } }}
//         BackdropProps={{ sx: { backgroundColor: "rgba(0,0,0,0.6)" } }}
//       >
//         <DialogTitle sx={{ color: "#FFC0CB", textAlign: "center" }}>
//           ?האם אתה בטוח שברצונך למחוק
//         </DialogTitle>
//         <DialogContent sx={{ textAlign: "center", mt: 1 }}>
//           <Typography>⚠️ פעולה זו לא ניתנת לביטול</Typography>
//           <Typography sx={{ mt: 2, fontWeight: "bold", color: "#ffb3c6" }}>
//             {workerToDelete?.name}
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
//           <Button
//             onClick={() => setOpenDeleteDialog(false)}
//             sx={{ color: "#aaa", border: "1px solid #555" }}
//           >
//             ביטול
//           </Button>
//           <Button
//             onClick={handleDeleteConfirm}
//             variant="contained"
//             sx={{ backgroundColor: "#FF6B6B", color: "white", fontWeight: "bold" }}
//           >
//             מחק
//           </Button>
//         </DialogActions>
//       </Dialog>

//     </div>
//   );
// }
