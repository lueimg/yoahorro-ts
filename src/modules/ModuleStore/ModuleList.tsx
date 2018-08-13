import * as React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from '@material-ui/core/Typography';
import CardActions from "@material-ui/core/CardActions";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Divider } from "@material-ui/core";

export class ModuleList extends React.Component {
  render() {
    return (
      <div className="module-list">
        <Card className="module-card">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Gestion de Ahorro simple
            </Typography>
            <Typography component="p">
             Ahorro Simple
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
                <Link to="/expenses">Entrar</Link>
            </Button>
          </CardActions>
        </Card>
        <Divider />
        <Card className="module-card">
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              Gestion de Ahorro avanzado
            </Typography>
            <Typography component="p">
             Ahorro Avanzado
            </Typography>
          </CardContent>
          <CardActions>
           
            <Button size="small" color="primary">
                <Link to="/transactions">Entrar</Link>
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default ModuleList;
