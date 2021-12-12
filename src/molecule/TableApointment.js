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
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://santer-server.herokuapp.com/doctor/getAppointments/${props.doctorId}`
      );
      if (response.data.status === 200) {
        setappointments(response.data.appointments);
      }
    })();
  }, [props.doctorId]);
  return (
    <TableContainer component={Paper}>
      <Text text={props.title} />
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />

            <TableCell align="left">Le patient</TableCell>
            <TableCell align="left">Rendez-vous</TableCell>
            <TableCell align="left">E-mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments ? (
            appointments.map((row) => (
              <Row key={row._id} doctorId={props.doctorId} row={row} />
            ))
          ) : (
            <div className="display-flex width-100 alignItems-center justifyContent-center">
              <h1>Pas de rendez-vous en attente</h1>
            </div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
