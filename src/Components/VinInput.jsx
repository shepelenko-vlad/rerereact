import axios from "axios";
import React, { Fragment, useState } from "react";
import Masks from "./Masks";

import "./VinInput.css";

function VinInput() {
    const [vinNumber, setVinNumber] = useState(null);
    const [vinValueInput, setVinValueInput] = useState("");

    const onVinInputChange = (e) => {
        setVinValueInput(e.target.value);
    };

    const onVinInputSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.get("http://localhost:51693/api/decryptvin", { params: { vin: vinValueInput } });
        // console.log("response", response);
        // console.log("vinNumber", response.data);
        // console.log("vin", inputVinNum);
        setVinNumber(response.data);
        setVinValueInput("");
    };

    return (
        <>
            <div className="vin-input-wrapper">
                <form onSubmit={onVinInputSubmit}>
                    <input
                        type='text'
                        placeholder='Enter Your VIN'
                        value={vinValueInput}
                        onChange={onVinInputChange}
                    />
                    <input type='submit' value='Decrypt' />
                </form>
            </div>
            {vinNumber && <Masks vinNumber={vinNumber} />}
        </>
    )
}

export default VinInput