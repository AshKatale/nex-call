import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Authentication.css";
import { AuthContext } from "../contexts/AuthContext";
import { Snackbar } from "@mui/material";

export default function Authenticationj() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState();
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [formstate, setFormstate] = React.useState(0);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  let handleAuth = async () => {
    // Validate required fields before making the request
    if (!username || !password) {
      setError("Username and Password are required.");
      return;
    }
  
    if (formstate === 1 && !name) {
      setError("Name is required for registration.");
      return;
    }
  
    try {
      if (formstate === 0) {
        let result = await handleLogin(username, password);
      } 
      else if (formstate === 1) {
        let result = await handleRegister(name, username, password);
        setUsername("");
        setMessage(result);
        setOpen(true);
        setError("");
        setFormstate(0);
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      let message = err.response?.data?.message || "An error occurred.";
      setError(message);
    }
  };
  


  return (
    <div
      style={{
        textAlign: "center",
        padding: 20,
        display: "flex",
        flexDirection: "row",
        margin: 60,
      }}
    >
      <div style={{ marginLeft: "20%" }}>
        <img src="/login-anime.gif"></img>
      </div>
      <div style={{ width: "50%", marginRight: "10%" }}>
        <img style={{ width: 50 }} src="/login-avatar.png"></img>
        <div style={{}}>
          <Button
            style={{ margin: 8, border: "1px solid black" }}
            variant={formstate === 0 ? "contained" : ""}
            onClick={() => {
              setFormstate(0);
            }}
          >
            Sign In
          </Button>
          <Button
            style={{ margin: 8, border: "1px solid black" }}
            variant={formstate === 1 ? "contained" : ""}
            onClick={() => {
              setFormstate(1);
            }}
          >
            Sign Up
          </Button>
        </div>
        
        {formstate === 1 ? (
          <Box
            component="form"
            sx={{ "& > :not(style)": { m: 1, width: "80%" } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Box>
        ) : (
          <></>
        )}

        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "80%" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
           
            value={username}
          />
        </Box>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "80%" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </Box>
       
        <button style={{ marginTop: 20 }} className="login-button" onClick={handleAuth}>
          {formstate===0 ? "Sign In" : "Sign Up" }
        </button>
      </div>
      <Snackbar open={open} autoHideDuration={4000} message={message  || error} onClose={() => setOpen(false)} />
    </div>
  );
}
