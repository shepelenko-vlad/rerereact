import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from "axios";
import ModalForDescriptionPart from "./ModalForDescriptionParts";
import ModalFordDescriptiveCodes from "./ModalFordDescriptiveCodes";

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
    const [selectedRow, setSelectedRow] = useState(null);

    <ModalForDescriptionPart selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
    console.log('parent', selectedRow);
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
            const row = await form.validateFields();
            const newData = [...data];
            const  index = newData.findIndex((item) => descriptionPartID === item.descriptionPartID);

            if (index > -1){
                const item = newData[index];
                newData.slice(index, 1, {...item, ...row});
                setData(newData);
                setEditingKey('');
            }
            else{
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
            console.log('aaaaaaaaaaaaaaaaaaa', selectedRow);
            updateDB(descriptionPartID, selectedRow, newData[index].descriptionPartSymbols, newData[index].characteristicDescriptionPartSymbols);
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

    const updateDB = async (descriptionPartID, descriptionPartSymbols, characteristicDescriptionPartSymbols) => {
        const response = await axios.put(`http://localhost:51693/api/descriptionparts/${descriptionPartID}`, 
        {descriptionPartID: descriptionPartID, 
         descriptionPartSymbols: descriptionPartSymbols, 
         characteristicDescriptionPartSymbols: characteristicDescriptionPartSymbols});
        
        if(response.status === 200)
        {
            const result = [
                data.find((i) => i.descriptionPartID = descriptionPartID),
                ...data
            ];
            setData(result);
        }
    }


const columns = [
    {
        title: 'ID',
        dataIndex: 'descriptionPartID',
        width: '20%',
        editable: false,
    },
    {
        title: 'Mask',
        dataIndex: 'maskContent',
        width: '20%',
        editable: true,
    },
    {
        title: 'Descriptive Code',
        dataIndex: 'descriptiveCodeName',
        width: '20%',
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

        </Form>
    );
}
export default TableDescriptionParts;