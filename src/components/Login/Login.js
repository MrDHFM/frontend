import React, { useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Cookies from "js-cookie";
import {
  Button,
  CardActions,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [apiResult, setApiResult] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitLogin = () => {
    axios
      .post("http://localhost:3535/auth/signin", formik.values)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          const jwtToken = res.data.jwt;
          Cookies.set("jwtToken", jwtToken);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);

        if (err.response.status === 404 || err.response.status === 401)
          setApiResult(err.response.data.message);
      });
  };
  console.log(apiResult);

  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const basicSchema = yup.object().shape({
    email: yup.string().email("Please enter valid email").required("Required"),
    password: yup
      .string()
      .min(8, "Password must be 8 characters.")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter ")
      .matches(/[A-Z]/, "Password requires a uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmitLogin,
    validationSchema: basicSchema,
  });

  return (
    <div className=" h-screen flex justify-center items-center">
      <Card sx={{ maxWidth: 345 }}>
        .
        <div className=" flex flex-col items-center justify-center mt-3">
          <SupervisedUserCircleIcon sx={{ width: "80px", height: "80px" }} />
          <h1 className=" text-lg font-bold">Login</h1>
          <p className=" text-red-600">{apiResult}</p>
        </div>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-3">
            <TextField
              fullWidth
              multiline
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              //  error={formik.errors.email}
            />
            {<p></p>}
            <FormControl fullWidth sx={{}} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                name="password"
                label="Password"
                id="outlined-adornment-password password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // error={formik.errors.password}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <CardActions className=" flex justify-center">
              <Button size="small" type="submit">
                Login
              </Button>
              <Button size="small" onClick={() => navigate("/signup")}>
                Sign UP
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
