import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Text from "../atome/Text";
import axios from "axios";
import ReactLoading from "react-loading";
function Row(props) {
  const { row } = props;

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell />
        <TableCell component="th" scope="row">
          {row.patient.namePrename}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.patient.email}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.patient.phoneNumber}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function TableAppointments(props) {
  const [appointments, setappointments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/doctor/getAppointments/${props.doctorId}`
      );
      if (response) {
        setLoading(false);
      }
      if (response.data.status === 200) {
        setappointments(response.data.appointments);
      }
    })();
  }, [props.doctorId]);
  return (
    <TableContainer component={Paper}>
      <div style={{ zidth: "100%", textAlign: "center" }}>
        {" "}
        <Text text={props.title} />
      </div>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />

            <TableCell align="left">The Patient</TableCell>
            <TableCell align="left">Appointment</TableCell>
            <TableCell align="left">E-mail</TableCell>
            <TableCell align="left">Phone Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments ? (
            appointments.map((row) => (
              <Row key={row._id} doctorId={props.doctorId} row={row} />
            ))
          ) : (
            <div className="display-flex width-100 alignItems-center justifyContent-center">
              <h1>No appointment pendings</h1>
            </div>
          )}
        </TableBody>
      </Table>
      {loading ? (
        <div className="loaderContainer">
          <ReactLoading
            type={"bars"}
            color={"orange"}
            height={100}
            width={50}
          />{" "}
        </div>
      ) : null}
    </TableContainer>
  );
}
