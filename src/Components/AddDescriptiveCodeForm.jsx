import { Button, Input } from 'antd';
import { useState } from 'react';
import axios from "axios";

function AddDescriptiveCodeForm({data, setData}){
    const[descriptiveCodeInput, setDescriptiveCodeInput] = useState("");

    const onDescriptiveCodeInputChange = (e) => {
        setDescriptiveCodeInput(e.target.value);
    }

    const addNewDescriptiveCode = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:51693/api/descriptivecodes", {descriptiveCodeName: descriptiveCodeInput});
        const newDescriptiveCodeName = response.data;
        const newData = data.concat(newDescriptiveCodeName);
        setData(newData);
        setDescriptiveCodeInput('');
    }

    return(
        <>
            <div>
                <Input size='small' placeholder="Descriptive code name"
                style = {{
                    width : 200,
                    height : 35
                }}
                    value={descriptiveCodeInput}
                    onChange={onDescriptiveCodeInputChange}
                />

                <Button type="primary" onClick={addNewDescriptiveCode}>Add New</Button>
            </div>
        </>
    )
}

export default AddDescriptiveCodeForm;