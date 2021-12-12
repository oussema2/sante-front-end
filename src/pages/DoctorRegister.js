import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Alert, AlertTitle, OutlinedInput } from "@mui/material";
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

const DoctorRegister = () => {
  const [age, setAge] = React.useState("");
  const [image, setimage] = useState(null);
  const [alertStatus, setalertStatus] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

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
        setInterval(() => {
          setalertStatus("");
        }, 3000);
      } else {
        setalertStatus("success");
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
    <div className="height-100vh overflow-hidden position-relative ">
      <Link to="/">
        <Image
          classes="marginLeft-50px position-absolute right-50  "
          path={process.env.PUBLIC_URL + `/588hospital_100778.png`}
          width="100"
        />
      </Link>{" "}
      {alertStatus === "error" ? (
        <Alert
          className="position-absolute width-300px right-10px "
          severity="error"
        >
          <AlertTitle>Error</AlertTitle>
          Cet e-mail est déjà utilisé, essayez un autre e-mail{" "}
        </Alert>
      ) : null}
      {alertStatus === "success" ? (
        <Alert
          className="position-absolute width-300px right-10px "
          severity="success"
        >
          <AlertTitle>Success</AlertTitle>
          vous êtes enregistré avec succès
        </Alert>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <Column classes="height-100px alignItems-center width-40   height-800px margin-top-100px   margin-left70 ">
          <div className="width-100 justifyContent-center margin-bottom-50px   display-flex">
            {" "}
            <Text classes="font-weight-lighter" text="Inscrivez-Médecin" />
          </div>

          <input
            id="namePrename"
            name="namePrename"
            value={formik.values.namePrename}
            onChange={formik.handleChange}
            type="text"
            placeholder="Nom Prénom"
            className="width-75 inputLogin namePrenameInput "
            style={{ height: `40px`, marginBottom: `20px` }}
          />

          <input
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="text"
            placeholder="e-mail"
            className="width-75 inputLogin emailInput "
            style={{ height: `40px`, marginBottom: `20px` }}
          />
          <input
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="text"
            placeholder="mot de pass"
            className="width-75 inputLogin passwordInput  "
            style={{ height: `40px`, marginBottom: `20px` }}
          />
          <input
            type="text"
            placeholder="Confirmez le mot de passe"
            className="width-75 inputLogin passwordInput  "
            style={{ height: `40px`, marginBottom: `20px` }}
          />
          <input
            id="adress"
            name="adress"
            value={formik.values.adress}
            onChange={formik.handleChange}
            type="text"
            placeholder="Adresse de cabinet"
            className="width-75 inputLogin adressInput "
            style={{ height: `40px`, marginBottom: `20px` }}
          />
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            type="text"
            placeholder="numéro de téléphone"
            className="width-75 inputLogin telephoneInput "
            style={{ height: `40px`, marginBottom: `20px` }}
          />
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
              <MenuItem value="Médecine interne">Médecine interne</MenuItem>
              <MenuItem value="Maladies infectieuses">
                Maladies infectieuses
              </MenuItem>
              <MenuItem value="Réanimation médicale">
                Réanimation médicale
              </MenuItem>
              <MenuItem value="Cardiologie">Cardiologie</MenuItem>
              <MenuItem value="Pédiatrie">Pédiatrie</MenuItem>
              <MenuItem value="Psychiatrie">Psychiatrie</MenuItem>
              <MenuItem value="Dermatologie">Dermatologie</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            style={{ height: `40px`, marginBottom: `20px` }}
            sx={{ width: "25ch" }}
          >
            <OutlinedInput
              type="file"
              onChange={(e) => setimage(e.target.files[0])}
              placeholder="Ajouter une image pour votre compte"
            />
          </FormControl>
          <Column>
            {loading ? (
              <Loader
                type="TailSpin"
                color="#F26A1B
            "
                height={50}
                width={50}
                //3 secs
              />
            ) : (
              <Button
                type="submit"
                text="S'inscrire"
                width="200"
                height="40"
                classes="margin-top-80px scale-1-25  transition-0-3s default-Button"
              />
            )}

            <Link to="/doctorlogin">
              <Button
                text="déjà enregistré ?"
                width="200"
                height="40"
                classes="margin-top-20px  scale-1-25  transition-0-3s patient-Button"
              />
            </Link>
          </Column>
        </Column>
      </form>
      <Column classes="position-absolute alignItems-center padding-10px  registerImagePos height-500px width-400px bgr-white">
        <Image
          classes="margin-top-50px"
          path={
            process.env.PUBLIC_URL + "/d3f913b8dd27fac04b26c2c9a903610d.png"
          }
          alt="Female-Doctor.jpg"
          width="300"
        />
        <Text
          text="If You want a Doctor Click here"
          classes="font-weight-lighter fontSize-25px margin-top-50px "
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
      <div className="height-1200px position-absolute boxShadow-right top--npx width-1200px bgr-orange rotateRegister  margin-right border-radius-60px "></div>
    </div>
  );
};

export default DoctorRegister;
