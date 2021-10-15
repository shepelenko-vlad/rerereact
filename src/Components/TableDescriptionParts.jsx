import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Button, Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from "axios";
import ModalForDescriptionPart from "./ModalForDescriptionParts";
import ModalFordDescriptiveCodes from "./ModalFordDescriptiveCodes";
import { useSelector} from "react-redux";
import AddDescPartsForm from "./AddDescPartsForm";

const EditableCell = ({
    editing, 
    dataIndex, 
    title, 
    inputType,
    record,
    index,
    children, 
    ...restProps
}) => {
    let inputNode = <Input /> ;
    if (dataIndex === 'maskContent')
    {
        inputNode = <ModalForDescriptionPart maskContent={record.maskContent} />
    }
    else if (dataIndex === 'descriptiveCodeName')
    {
        inputNode = <ModalFordDescriptiveCodes descriptiveCodeName={record.descriptiveCodeName} />
    }
    else if (inputType === 'number')
    {
        inputNode = <InputNumber />
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item 
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}>
                    {inputNode}
                    </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const TableDescriptionParts = () => {
    const[form] = Form.useForm();
    const[data, setData] = useState(null);
    const[editingKey, setEditingKey] = useState('');

    const maskID = useSelector((state) => state.maskID.value);
    const maskContent = useSelector((state) => state.maskContent.value)
    const descriptiveCodeID = useSelector((state) => state.descriptiveCodeID.value);
    const descriptiveCodeName = useSelector((state) => state.descriptiveCodeName.value);

    useEffect(() => {
        async function getData(){
            const response = await axios.get("http://localhost:51693/api/descriptionparts");
            setData(response.data);
        };

        getData();
    }, []);

    const isEditing = (record) => record.descriptionPartID === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            descriptionPartID: '',
            maskID:'',
            descriptiveCodeID: '',
            descriptionPartSymbols: '',
            characteristicDescriptionPartSymbols: '',
            ...record,
        });
        setEditingKey(record.descriptionPartID);
    };

    const cancel = () => {
        setEditingKey('');
    };
    
    const save = async (descriptionPartID) => {
        try{
            let row = await form.validateFields();
            console.log('seks', row);
            row.maskID = maskID[0];
            row.maskContent = maskContent;
            row.descriptiveCodeID = descriptiveCodeID[0];
            row.descriptiveCodeName = descriptiveCodeName;
            console.log('stroka', row);
            const newData = [...data];
            const  index = newData.findIndex((item) => descriptionPartID === item.descriptionPartID);
            if (index > -1){
                const item = newData[index];
                console.log('item', item);
                newData.slice(index, 1, {...item, ...row});
                setData(newData);
                setEditingKey('');
            }
            else{
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
            console.log(data);

            updateDB(descriptionPartID, maskID, descriptiveCodeID, row.descriptionPartSymbols, row.characteristicDescriptionPartSymbols);
        }
        catch(errInfo){
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = async (key) => {
        const editData = data.find((i) => i.descriptionPartID === key.descriptionPartID);
        await axios.delete(`http://localhost:51693/api/descriptionparts/${editData.descriptionPartID}`);

        const index = data.findIndex((i) => i.descriptionPartID === key.descriptionPartID);
        const dataWithoutDeletedElement = [
            ...data.slice(0, index),
            ...data.slice(index + 1)
        ];
        setData(dataWithoutDeletedElement);
    }

    const updateDB = async (descPart, mask, descCode, descPartSymbols, charDescPartSymb) => {
        const response = await axios.put(`http://localhost:51693/api/descriptionparts/${descPart}`, {descriptionPartID : descPart, maskID: mask[0], descriptiveCodeID: descCode[0], descriptionPartSymbols: descPartSymbols, characteristicDescriptionPartSymbols: charDescPartSymb});
        
        if(response.status === 200)
        {
            const result = [
                data.find((i) => i.descPart = descPart),
                ...data
            ];
            setData(result);
        }
    }


const columns = [
    {
        title: 'ID',
        dataIndex: 'descriptionPartID',
        width: '-20%',
        editable: false,
    },
    {
        title: '',
        dataIndex: 'maskID',
        width: '-20%',
        editable: true,
    },
    {
        title: 'Mask',
        dataIndex: 'maskContent',
        width: '20%',
        editable: true,
    },
    {
        title: '',
        dataIndex: 'descriptiveCodeID',
        width: '20%',
        editable: true,
    },
    {
        title: 'Descriptive Code',
        dataIndex: 'descriptiveCodeName',
        width: '-20%',
        editable: true,
    },
    {
        title: 'Symbols',
        dataIndex: 'descriptionPartSymbols',
        width: '20%',
        editable: true,
    },
    {
        title: 'Characteristic',
        dataIndex: 'characteristicDescriptionPartSymbols',
        width: '20%',
        editable: true,
    },
    {
        title: 'update',
        dataIndex: 'update',
        render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
                <span>
                    <a
                      href="javascript:;"
                      onClick={() => save(record.descriptionPartID)}
                      style={{
                          marginRight: 8,
                      }}
                    >
                        Save
                    </a>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                        <a>Cancel</a>
                    </Popconfirm>
                </span>
            ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={()=> edit(record)}>
                    Edit
                </Typography.Link>
            );
        },
    },
    {
        title: 'delete',
        dataIndex: 'delete',
        render: (_, record) =>
            data.length >= 1 ? (
                <Popconfirm title="Sure to delete?" onConfirm={()=> handleDelete(record)}>
                    <a>Delete</a>
                </Popconfirm>
        ) : null,
    }
    ];

    const mergedColumns = columns.map((col) => {
        if(!col.editable) {
            return col;
        }

        return{
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'descriptionPartID' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return(
        <Form form={form} component={false}>
            <Table
            components={{
                body: {
                    cell: EditableCell,
                },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
                onChange:cancel,
            }}
            />
            <AddDescPartsForm />
        </Form>
    );
}
export default TableDescriptionParts;