// import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import {
  Alert,
  AlertTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Button from "../atome/Button";
import Image from "../atome/Image";
import Text from "../atome/Text";
import Column from "../Containers/Column";
import { useNavigate } from "react-router-dom";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { LockOpenOutlined } from "@mui/icons-material";
import ReactLoading from "react-loading";
const DoctorRegister = () => {
  const [age, setAge] = React.useState("");
  const [image, setimage] = useState(null);
  const [alertStatus, setalertStatus] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const [snack, setSnack] = useState({ open: false, message: "" });
  const handleClose = () => {
    setSnack({ ...snack, open: false });
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      namePrename: "",
      password: "",
      adress: "",
      phoneNumber: "",
      specialisation: "",
    },
    onSubmit: async (values) => {
      setloading(true);
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("namePrename", values.namePrename);
      formData.append("password", values.password);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("specialisation", values.specialisation);
      formData.append("adress", values.adress);
      formData.append("imagePath", image);

      const response = await axios.post(
        "http://localhost:5000/doctor/auth/register",
        formData,
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      );
      if (response.data.status === 400) {
        setalertStatus("error");
        setSnack({ ...snack, open: true });
        setInterval(() => {
          setalertStatus("");
          setSnack({ ...snack, open: false });
        }, 3000);
      } else {
        setalertStatus("success");
        setSnack({ ...snack, open: true });
        setInterval(() => {
          setalertStatus("");
          navigate("/dashboard/" + response.data.doctor._id);
        }, 3000);
      }
    },
  });

  const handleSelectChange = (event) => {
    setAge(event.target.value);
    formik.handleChange(event);
  };

  return (
    <div className="overflow-hidden position-relative ">
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Link to="/">
          <Image
            classes="  "
            path={process.env.PUBLIC_URL + `/588hospital_100778.png`}
            width="100"
          />
        </Link>{" "}
      </div>
      {alertStatus === "error" ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snack.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Error check data you pass
          </Alert>
        </Snackbar>
      ) : null}
      {alertStatus === "success" ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snack.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            vous êtes enregistré avec succès
          </Alert>
        </Snackbar>
      ) : null}
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={formik.handleSubmit}
      >
        <Column classes=" alignItems-center width-40">
          <div className="width-100 justifyContent-center margin-bottom-50px   display-flex">
            {" "}
            <Text classes="font-weight-lighter" text="Doctor Register" />
          </div>
          <div style={{ marginRight: 50, position: "relative", width: "100%" }}>
            <input
              id="namePrename"
              name="namePrename"
              value={formik.values.namePrename}
              onChange={formik.handleChange}
              type="text"
              placeholder="Nom Prénom"
              className="width-100 inputLogin namePrenameInput "
              style={{ paddingLeft: 40, height: `40px`, marginBottom: `20px` }}
            />
            <PersonOutlineIcon
              style={{ position: "absolute", left: 5, top: 32, color: "gray" }}
            />
          </div>
          <div style={{ marginRight: 50, position: "relative", width: "100%" }}>
            <input
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              type="text"
              placeholder="e-mail"
              className="width-100 inputLogin emailInput "
              style={{ paddingLeft: 40, height: `40px`, marginBottom: `20px` }}
            />{" "}
            <AlternateEmailIcon
              style={{ position: "absolute", left: 5, top: 32, color: "gray" }}
            />
          </div>
          <div style={{ marginRight: 50, position: "relative", width: "100%" }}>
            <input
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              placeholder="mot de pass"
              className="width-100 inputLogin passwordInput  "
              style={{ paddingLeft: 40, height: `40px`, marginBottom: `20px` }}
            />{" "}
            <LockOpenOutlined
              style={{ position: "absolute", left: 5, top: 32, color: "gray" }}
            />
          </div>
          <div style={{ marginRight: 50, position: "relative", width: "100%" }}>
            <input
              type="password"
              placeholder="Confirmez le mot de passe"
              className="width-100 inputLogin passwordInput  "
              style={{ paddingLeft: 40, height: `40px`, marginBottom: `20px` }}
            />{" "}
            <LockOpenOutlined
              style={{ position: "absolute", left: 5, top: 32, color: "gray" }}
            />
          </div>
          <div style={{ marginRight: 50, position: "relative", width: "100%" }}>
            <input
              id="adress"
              name="adress"
              value={formik.values.adress}
              onChange={formik.handleChange}
              type="text"
              placeholder="Adresse de cabinet"
              className="width-100 inputLogin adressInput "
              style={{ paddingLeft: 40, height: `40px`, marginBottom: `20px` }}
            />
            <LocationOnOutlinedIcon
              style={{ position: "absolute", left: 5, top: 32, color: "gray" }}
            />
          </div>
          <div style={{ marginRight: 50, position: "relative", width: "100%" }}>
            <input
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              type="text"
              placeholder="numéro de téléphone"
              className="width-100 inputLogin telephoneInput "
              style={{ paddingLeft: 40, height: `40px`, marginBottom: `20px` }}
            />
            <LocalPhoneOutlinedIcon
              style={{ position: "absolute", left: 5, top: 32, color: "gray" }}
            />
          </div>
          <FormControl
            style={{ height: `40px`, marginBottom: `20px` }}
            variant="standard"
            className="width-75"
          >
            <InputLabel id="demo-simple-select-standard-label">
              specialization
            </InputLabel>
            <Select
              value={age}
              id="specialisation"
              name="specialisation"
              onChange={(e) => handleSelectChange(e)}
              label="Âge"
            >
              <MenuItem value="">
                <em>Rien</em>
              </MenuItem>
              <MenuItem value="Internal Medicine">Internal Medicine</MenuItem>
              <MenuItem value="Infectious diseases">
                Infectious diseases
              </MenuItem>
              <MenuItem value="Podiatrist">Podiatrist</MenuItem>
              <MenuItem value="General Practitioner">
                General Practitioner
              </MenuItem>
              <MenuItem value="Pediatrician">Pediatrician</MenuItem>
              <MenuItem value="Endocrinologist">Endocrinologist</MenuItem>
              <MenuItem value="Neurologist">Neurologist</MenuItem>
              <MenuItem value="Rheumatologist">Rheumatologist</MenuItem>
              <MenuItem value="Allergist/Immunologist">
                Allergist/Immunologist
              </MenuItem>
              <MenuItem value="Psychiatrist">Psychiatrist</MenuItem>
              <MenuItem value="Nephrologist">Nephrologist</MenuItem>
              <MenuItem value="Pulmonologist">Pulmonologist</MenuItem>
              <MenuItem value="Surgeon">Surgeon</MenuItem>
              <MenuItem value="Emergency Physician">
                Emergency Physician
              </MenuItem>
              <MenuItem value="Ophthalmologist">Ophthalmologist</MenuItem>
              <MenuItem value="Oncologist">Oncologist</MenuItem>
              <MenuItem value="Urologist">Urologist</MenuItem>
              <MenuItem value="Otolaryngologist">Otolaryngologist</MenuItem>
              <MenuItem value="Anesthesiologist">Anesthesiologist</MenuItem>
              <MenuItem value="Dermatologist">Dermatologist</MenuItem>
              <MenuItem value="Radiologist">Radiologist</MenuItem>
              <MenuItem value="Gastroenterologist">Gastroenterologist</MenuItem>
              <MenuItem value="Cardiologist">Cardiologist</MenuItem>
              <MenuItem value="Orthopedist">Orthopedist</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ height: `40px`, marginBottom: `20px` }}
            sx={{ width: "25ch" }}
          >
            <OutlinedInput
              type="file"
              onChange={(e) => setimage(e.target.files[0])}
              placeholder="Add an image for your account"
            />
          </FormControl>
          <Column>
            {loading ? (
              <div className="loaderContainer">
                <ReactLoading
                  type={"bars"}
                  color={"orange"}
                  height={100}
                  width={50}
                />
              </div>
            ) : (
              <Button
                type="submit"
                text="Register"
                width="200"
                height="40"
                classes="margin-top-80px scale-1-25  transition-0-3s default-Button"
              />
            )}

            <Link to="/doctorlogin">
              <Button
                text="Already Have Account"
                width="200"
                classes="margin-top-20px  scale-1-25  transition-0-3s patient-Button"
              />
            </Link>
          </Column>
        </Column>
      </form>
    </div>
  );
};

export default DoctorRegister;
