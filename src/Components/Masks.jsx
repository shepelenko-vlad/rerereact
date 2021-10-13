import React from "react";

import "./Masks.css";

function Masks({ vinNumber }) {
    const tableHeaders = ["Название", "Значение"];

    console.log('Masks', vinNumber)
    if (vinNumber.length === 0 && vinNumber.length < 16) {
        return (
        <div className="table-container">
            <p>Неверно набран VIN идентификатор</p>
        </div>
        );
    }

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