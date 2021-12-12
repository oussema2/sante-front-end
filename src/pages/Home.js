import React from "react";
import Button from "../atome/Button";
import Row from "../Containers/Row";
import Column from "../Containers/Column";
import Text from "../atome/Text";
import Image from "../atome/Image";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="App bgr-dce0f5 height-100vh projectFont ">
      <Row>
        <Column classes="width-70 height-100vh">
          <div className="height-10">
            <Link to="/">
              <Image
                classes="marginLeft-50px "
                path={process.env.PUBLIC_URL + `/588hospital_100778.png`}
                width="100"
              />
            </Link>{" "}
          </div>

          <Column classes="height-100vh display-flex alignItems-center justifyContent-center">
            <Column classes="width-70">
              <Text
                text="meilleur site  pour trouver des médecins dans plusieurs spécialités"
                classes="fontSize-50px  "
              />
              <Text
                text="Patient ? , click sur la bouton pour trouver un médecin de votre besoin"
                classes="fontSize-20px   "
              />
              <Row>
                <Link to="/doctorlogin">
                  <Button
                    text="Medecin"
                    height="50"
                    width="200"
                    justifyContent-center="200"
                    classes="transition-0-3s scale-1-25 default-Button  "
                  />
                </Link>
                <Link to="/patientform">
                  <Button
                    text="Patient"
                    height="50"
                    width="200"
                    classes="transition-0-3s scale-1-25 patient-Button  "
                  />
                </Link>
              </Row>
            </Column>
          </Column>
        </Column>

        <Image
          classes="height-100vh width-40 "
          path={
            process.env.PUBLIC_URL +
            `/depositphotos_14779771-stock-photo-portrait-of-confident-young-doctor.jpg`
          }
        />
      </Row>
    </div>
  );
};

export default Home;
