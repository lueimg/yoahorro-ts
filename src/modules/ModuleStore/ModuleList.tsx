import * as React from "react";
import ModuleCard from "./ModuleCard";
import { Divider } from '@material-ui/core';

class ModuleList extends React.Component {

  state = {
    modules: [
      {
        id: 'QVIkYcBZDlOaz4nzQccJ',
        name: "Gestion de Ahorro",
        description: "Ahorro Simple",
        path: "/expenses"
      },
      {
        id: 'JL8hsq0s0iSmv6UBe3Nd',
        name: "Gestion de Prestamos",
        description: "Controla tus prestamos",
        path: "/loans"
      }
    ]
  }

  render() {
    return (
      <div className="module-list">
        { this.state.modules.map(( module ) => (
         <React.Fragment key={module.path}>
          <ModuleCard {...module} />
          <Divider />
         </React.Fragment>
        ))}
      </div>
    );
  }
}

export default ModuleList;
