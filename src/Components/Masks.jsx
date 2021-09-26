import React from "react";

import "./Masks.css";

function Masks({ vinNumber }) {
    const tableHeaders = ["Название", "Значение"];

    console.log('Masks', vinNumber)
    return (
        <div className="table-container">
            <table id="decryptedvin-table">
                <tr>
                    {tableHeaders.map(
                        i => <th>{i}</th>
                    )}
                </tr>
                {vinNumber.map(i => (
                    <tr key={i.descriptiveCodeName}>
                        <td>{i.descriptiveCodeName}</td>
                        <td>{i.characteristicDescriptionPartSymbols}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default Masks;