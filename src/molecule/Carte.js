import React from "react";
import Row from "../Containers/Row";
import Image from "../atome/Image";
import Text from "../atome/Text";

const Carte = (props) => {
  return (
    <Row
      classes={`alignItems-center justifyContent-evenly  floatingCarte ${props.classes}`}
    >
      <Row classes="flex-1 alignItems-center justifyContent-center  ">
        <Image path={props.imagePath} width={props.imageWidth} />
      </Row>

      <Row classes="alignItems-center justifyContent-around flex-3 ">
        <Text text={props.titleText} classes={props.titleClasses} />

        <Text text={props.valueText} classes={props.valueClasses} />
      </Row>
    </Row>
  );
};

export default Carte;
