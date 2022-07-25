import React, { useState } from "react";

import Row from "../Containers/Row";
import Column from "../Containers/Column";
import TableData from "../molecule/Table";
import Button from "../atome/Button";
import { useNavigate, useParams } from "react-router";
import TableApointment from "../molecule/TableApointment";

const DoctorDashboard = () => {
  const { _id } = useParams();
  const [table, settable] = useState("app");
  const changeTable = (type) => {
    settable(type);
  };

  const navigate = useNavigate();
  return (
    <Column classes="padding-top-70px padding-left-20px padding-right-20px">
      {/* <Row classes="width-100  flexWrap-wrap   ">
        <Carte
          classes="width-400px height-100px margin-10px transition-0-5s scale-1-25  bgr-orange color-white  "
          imagePath={process.env.PUBLIC_URL + "/588hospital_100778.png"}
          imageWidth="40"
          titleText="Doctor :"
          valueText="10"
          titleClasses="fontSize-40px"
          valueClasses="fontSize-25px"
        />
        <Carte
          classes="width-400px height-100px margin-10px transition-0-5s scale-1-25 bgr-orange  color-white "
          imagePath={process.env.PUBLIC_URL + "/588hospital_100778.png"}
          imageWidth="40"
          titleText="Doctor :"
          valueText="10"
          titleClasses="fontSize-40px"
          valueClasses="fontSize-25px"
        />
        <Carte
          classes="width-400px height-100px margin-10px transition-0-5s scale-1-25 bgr-orange color-white  "
          imagePath={process.env.PUBLIC_URL + "/588hospital_100778.png"}
          imageWidth="40"
          titleText="Doctor :"
          valueText="10"
          titleClasses="fontSize-40px"
          valueClasses="fontSize-25px"
        />
        <Carte
          classes="width-400px height-100px margin-10px transition-0-5s scale-1-25 bgr-orange  color-white "
          imagePath={process.env.PUBLIC_URL + "/588hospital_100778.png"}
          imageWidth="40"
          titleText="Doctor :"
          valueText="10"
          titleClasses="fontSize-40px"
          valueClasses="fontSize-25px"
        />
      </Row> */}
      <Column>
        <Row classes="width-100 alignItems-center  justifyContent-center margin-top-50px ">
          <Button
            clickEvent={() => changeTable("pend")}
            text="Pending Appointments"
            height="50"
            width="200"
            classes="transition-0-3s scale-1-25 default-Button  "
          />

          <Button
            clickEvent={() => changeTable("app")}
            text="Checked Appointments"
            height="50"
            width="200"
            classes="transition-0-3s scale-1-25 patient-Button  "
          />
        </Row>
        <Row classes="alignItems-center justifyContent-center margin-top-50px">
          <div className="  width-1400px  ">
            {table === "pend" ? (
              <TableData
                doctorId={_id}
                title="Pending Apointments"
                isPending={false}
              />
            ) : (
              <TableApointment
                doctorId={_id}
                title="Checked Appointment list "
                isPending={true}
              />
            )}
          </div>
        </Row>
      </Column>
      <div style={{ marginTop: 50 }} className="logout-container-btn-style">
        <Button
          clickEvent={() => navigate("/")}
          text="Logout"
          height="50"
          width="200"
          classes="transition-0-3s scale-1-25 patient-Button  "
        />
      </div>
    </Column>
  );
};

export default DoctorDashboard;
