import React, { useState } from "react";
import TableMasks from "./TableMasks";
import TableDescriptiveCodes from "./TableDescriptiveCodes";
import 'antd/dist/antd.css';
import TableDescriptionParts from "./TableDescriptionParts";
import DropDownTables from "./dropDownTables";

const returnTables = (key) => {
  if (key === "2")
  {
    return(
        <TableDescriptiveCodes />
    )
  }
  if(key === "3")
  {
    return(
        <TableDescriptionParts />
    )
  }

  return(
    <TableMasks />
  )
};

const AdminPanel = () => {
  const[key, setKey] = useState("1");

return (
      <div>
        <h1 style={{color: "black"}}>Admin panel</h1>
        <DropDownTables style={{marginLeft: "50%"}} setKey={setKey} />
        {returnTables(key)}
      </div>
  );
}

export default AdminPanel;