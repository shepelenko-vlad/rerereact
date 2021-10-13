import React from "react";
import TableMasks from './TableMasks';
import TableDescriptiveCodes from "./TableDescriptiveCodes";
import 'antd/dist/antd.css';
import { Button } from 'antd';
import TableDescriptionParts from "./TableDescriptionParts";

const AdminPanel = () => {

return (
    <>
        <div>
          <h1 style={
              {
                  color: "black"
              }
            }>
              Table Masks
            </h1>
        </div>
        <TableMasks />
        <div>
            <Button type="primary">Primary Button</Button>
        </div>
        <TableDescriptiveCodes />
        <TableDescriptionParts />
    </>
  );
}

export default AdminPanel;