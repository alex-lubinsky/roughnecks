import React from "react";

const MissionColumn = ({ id, name, episode }) => (
  <th>{`Ep. ${episode}: ${name}`}</th>
);

export default MissionColumn;
