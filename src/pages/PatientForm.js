import axios from "axios";
import React, { useEffect, useState } from "react";
import Text from "../atome/Text";
import Column from "../Containers/Column";
import Row from "../Containers/Row";
import DoctorCarte from "../molecule/DoctorCatre";
import SpringModal from "../molecule/Modal";
import Image from "../atome/Image";
import { Link } from "react-router-dom";
const PatientForm = () => {
  const [open, setOpen] = React.useState(false);
  const [idDoctor, setidDoctor] = useState("");
  const handleClose = () => setOpen(false);
  const [data, setdata] = useState([]);
  const handleOpen = (id) => {
    setidDoctor(id);
    setOpen(true);
  };

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://santer-server.herokuapp.com/doctor/getAll"
      );
      setdata(response.data.doctors);
    })();
  }, []);
  return (
    <Column classes="alignItems-center justifyContent-center">
      <Link to="/">
        <div className="height-10">
          <Image
            classes="marginLeft-50px "
            path={process.env.PUBLIC_URL + `/588hospital_100778.png`}
            width="100"
          />
        </div>
      </Link>

      <div className=" display-flex alignItems-center justifyContent-center height-150px width-100">
        <Text text="Liste des médecins" classes="fontSize-50px " />
      </div>

      <Row classes="flexWrap-wrap alignItems-center justifyContent-center paddingLeft-50px paddingRight-50px  ">
        {data
          ? data.map((item) => (
              <DoctorCarte
                detail={item}
                clickEvent={() => handleOpen(item._id)}
              />
            ))
          : null}
      </Row>

      <SpringModal open={open} idDoctor={idDoctor} handleClose={handleClose} />
    </Column>
  );
};

export default PatientForm;
