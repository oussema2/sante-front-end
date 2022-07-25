import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Row from "../Containers/Row";

export default function DoctorCarte(props) {
  console.log(props);
  return (
    <Card
      className="boxShadowCarte margin-10px "
      style={{ width: `350px`, height: `450px` }}
      sx={{ maxWidth: 545, maxHeight: 900 }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="240"
        image={`http://localhost:5000/images/${props.detail.imagePath}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.detail.namePrename}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.detail.specialisation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.detail.adress}
        </Typography>
      </CardContent>
      <CardActions>
        <Row classes="width-100 justifyContent-spaceBetween alignItems-center padding-10px  ">
          <Button onClick={props.clickEvent}>Add an appointment</Button>
        </Row>
      </CardActions>
    </Card>
  );
}
