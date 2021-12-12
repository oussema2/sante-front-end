import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Text from "../atome/Text";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StaticTimePicker from "@mui/lab/StaticTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Button from "../atome/Button";
import axios from "axios";
import Loader from "react-loader-spinner";

function Row(props) {
  const { row } = props;

  const [open, setOpen] = useState(false);
  const [timeValue, settimeValue] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [loading, setloading] = useState(false);
  const addAppointment = async () => {
    setloading(true);
    const timeString = timeValue.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const dateString = date.toLocaleDateString("en-US", {
      day: "numeric",
      year: "numeric",
      month: "numeric",
    });
    const dataAPI = {
      _id: props.doctorId,
      _idPatient: row._id,
      dateAppointment: dateString + " " + timeString,
    };

    const response = await axios.post(
      "https://santer-server.herokuapp.com/doctor/addAppointment",
      dataAPI,
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );
    if (response.data.status === 200) {
      (async () => {
        const response = await axios.get(
          `https://santer-server.herokuapp.com/doctor/getPendings/${props.doctorId}`
        );
        if (response.data.status === 200) {
          props.setpendings(response.data.pendings);
        }
      })();
    }
  };
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.namePrename}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.phoneNumber}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.email}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Add Appointment
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Temps</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableCell align="left">
                    {" "}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Exemple de base"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell align="left">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <StaticTimePicker
                        displayStaticWrapperAs="mobile"
                        value={timeValue}
                        onChange={(newValue) => {
                          settimeValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </TableCell>
                  <TableCell align="left">
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
                        text="Ajouter un rendez-vous"
                        type="submit"
                        width="200"
                        height="40"
                        clickEvent={addAppointment}
                        classes="margin-top-20px   transition-0-3s default-Button"
                      />
                    )}
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
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

export default function TableData(props) {
  const [pendings, setpendings] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://santer-server.herokuapp.com/doctor/getPendings/${props.doctorId}`
      );
      if (response.data.status === 200) {
        setpendings(response.data.pendings);
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
            <TableCell align="left">Date D'inscription</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pendings ? (
            pendings.map((row) => (
              <Row
                key={row._id}
                doctorId={props.doctorId}
                setpendings={setpendings}
                row={row}
              />
            ))
          ) : (
            <div className="display-flex width-100 alignItems-center justifyContent-center">
              <h1>No Pending available</h1>
            </div>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
