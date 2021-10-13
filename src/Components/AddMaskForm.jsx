import { Button, Input  } from 'antd';
import { useState } from 'react';
import axios from "axios";

function AddMaskForm({data, setData}) {
    const[maskValueInput, setMaskValueInput] = useState("");

    const onMaskValueChange = (e) => {
        setMaskValueInput(e.target.value);
    };

    const addNewMask = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:51693/api/masks", {maskContent: maskValueInput});
        const newMaskContent = response.data;
        const newData = data.concat(newMaskContent);
        setData(newData);
        setMaskValueInput('');
    }

    return (
        <>
            <div>
                <form>
                    <Input size='small' placeholder="Mask"  
                        style = {{
                            width : 200,
                            height: 35  
                        }} 
                        
                        value={maskValueInput}
                        onChange={onMaskValueChange}
                    />

                    <Button type="primary" onClick={addNewMask}>Add New</Button>
                </form>
            </div>
        </>
    )
}
export default AddMaskForm;