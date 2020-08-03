import React from "react";
import { NavLink } from "react-router-dom";

const MissionColumn = (props) => (
  <th className="width-4">
    <NavLink
      to={`/missions/${props.mission.id}`}
      activeClassName="is-active"
    >
      {`Ep. ${props.mission.episode}`}
    </NavLink>
  </th>
);

export default MissionColumn;
