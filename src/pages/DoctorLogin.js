import React, { useState } from "react";
import Column from "../Containers/Column";
import Text from "../atome/Text";
import Button from "../atome/Button";
import Image from "../atome/Image";
import Row from "../Containers/Row";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import Loader from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [alertStatus, setalertStatus] = useState("");
  const [message, setmessage] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setloading(true);
      const response = await axios.post(
        "https://santer-server.herokuapp.com/doctor/auth/signin",
        values,
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      );

      if (response.data.status === 200) {
        localStorage.setItem("token", response.data.token);
        setloading(true);
        navigate(`/dashboard/${response.data.doctor._id}`);
      }
      if (response.data.status === 401) {
        setmessage("Échec de l'authentification, e-mail erroné");
        setalertStatus("error");
        setInterval(() => {
          setalertStatus("");
        }, 3000);
        setloading(false);
      }
      if (response.data.status === 402) {
        setmessage("Échec de l'authentification, mot de passe invalide");
        setalertStatus("error");
        setInterval(() => {
          setalertStatus("");
        }, 3000);
        setloading(false);
      }
    },
  });

  return (
    <div className="height-100vh overflow-hidden position-relative ">
      {/*
       */}
      {alertStatus === "error" ? (
        <Alert
          className="position-absolute width-300px top-10px left-10px"
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
      ) : null}
      <Column classes="height-100px alignItems-center width-40   height-400px  margin-top-500px margin-left-250px ">
        <div className="width-100 justifyContent-center height-100px  display-flex">
          {" "}
          <Text classes="font-weight-lighter" text="SignIn Doctor" />
        </div>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="email"
            name="email"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="e-mail"
            className="width-100 inputLogin emailInput "
            style={{ height: `40px`, marginBottom: `20px` }}
          />
          <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="text"
            placeholder="Mot de passe"
            className="width-100 inputLogin passwordInput  "
            style={{ height: `40px`, marginBottom: `20px` }}
          />
          <Column classes="width-100">
            {loading === false ? (
              <Button
                text="S'identifier"
                type="submit"
                width="200"
                height="40"
                classes="margin-top-20px  width-100  transition-0-3s default-Button"
              />
            ) : (
              <div className="margin-top-20px width-200px height-20px display-flex alignItemts-center justifyContent-center">
                <Loader
                  type="TailSpin"
                  color="#F26A1B
                  "
                  height={50}
                  width={50}
                  //3 secs
                />
              </div>
            )}
            <Link to="/doctorregister">
              <Button
                text="S'inscrire"
                width="200"
                height="40"
                classes="margin-top-20px  width-100  transition-0-3s patient-Button"
              />
            </Link>
          </Column>
        </form>
      </Column>
      <Column classes="position-absolute alignItems-center padding-10px  loginImagePos height-500px width-400px bgr-white">
        <Image
          classes="margin-top-50px"
          path={
            process.env.PUBLIC_URL + "/d3f913b8dd27fac04b26c2c9a903610d.png"
          }
          alt="Female-Doctor.jpg"
          width="300"
        />
        <Text
          text="Si vous voulez un docteur cliquez ici"
          classes=" textAlign-center font-weight-lighter fontSize-25px margin-top-50px "
        />
        <Link to="/patientform">
          <Button
            text="Trouver un médecin"
            width="200"
            height="40"
            classes="margin-top-20px   transition-0-3s default-Button"
          />
        </Link>
      </Column>
      <div className="height-1200px position-absolute  boxShadow-grey top0px width-1200px bgr-orange rotate35deg margin-left border-radius-60px "></div>{" "}
    </div>
  );
};

export default DoctorLogin;
