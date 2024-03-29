import * as React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
// web.cjs is required for IE11 support
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useSpring, animated } from "react-spring/dist/react-spring.cjs";
import { useState } from "react";
import axios from "axios";
import Button from "../atome/Button";
import Column from "../Containers/Column";
import { useFormik } from "formik";
import ReactLoading from "react-loading";

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SpringModal(props) {
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");

  const formik = useFormik({
    initialValues: {
      namePrename: "",
      phoneNumber: "",
      email: "",
      _id: "",
    },
    onSubmit: async (values) => {
      setloading(true);
      values["_id"] = props.idDoctor;

      const response = await axios.post(
        "http://localhost:5000/doctor/addPending",
        values,
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      );
      console.log(response);
      if (response.data.status === 400) {
        setloading(false);
        setmessage("Erreur dans l'enregistrement du rendez-vous");
      } else {
        setloading(false);
        setmessage("  Votre rendez-vous enregistré avec succès ");
      }
    },
  });
  return (
    <div className="position-relative ">
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography
              className="alignItems-center margin-bottom-20px textAlign-center jusitfyContent-center display-flex"
              id="spring-modal-title"
              variant="h6"
              component="h2"
            >
              Add your credentials
            </Typography>
            <Column classes="alignItems-center jusitfyContent-center">
              <form
                style={{ position: "relative", width: "100%" }}
                onSubmit={formik.handleSubmit}
              >
                <div style={{ position: "relative", width: "100%" }}>
                  {" "}
                  <input
                    id="namePrename"
                    name="namePrename"
                    value={formik.values.namePrename}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="Nom Prénom"
                    className="width-90 inputLogin namePrenameInput "
                    style={{
                      height: `40px`,
                      marginBottom: `20px`,
                      paddingLeft: 35,
                    }}
                  />
                  <PermIdentityOutlinedIcon
                    style={{
                      position: "absolute",
                      left: 5,
                      top: 8,
                      // top: 32,
                      color: "gray",
                    }}
                  />
                </div>
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="e-mail"
                    className="width-90 inputLogin emailInput "
                    style={{
                      height: `40px`,
                      marginBottom: `20px`,
                      paddingLeft: 35,
                    }}
                  />
                  <EmailOutlinedIcon
                    style={{
                      position: "absolute",
                      left: 5,
                      top: 8,
                      color: "gray",
                    }}
                  />
                </div>
                <div style={{ position: "relative", width: "100%" }}>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    type="text"
                    placeholder="numéro de téléphone"
                    className="width-90 inputLogin  "
                    style={{
                      paddingLeft: 35,
                      height: `40px`,
                      marginBottom: `20px`,
                    }}
                  />
                  <PhoneOutlinedIcon
                    style={{
                      position: "absolute",
                      left: 5,
                      top: 8,
                      // top: 32,
                      color: "gray",
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
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
                      text="Add an appointment"
                      width="400"
                      height="40"
                      classes="margin-top-20px    transition-0-3s default-Button"
                    />
                  )}
                </div>
              </form>
            </Column>

            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              {message}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
