import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from "axios";
import AddMaskForm from './AddMaskForm';

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
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
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
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



const TableMasks = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        async function getData(){
            const response = await axios.get("http://localhost:51693/api/masks");
            setData(response.data);
        };
        
        getData();
      }, []);

  const isEditing = (record) => record.maskID === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
    maskID: '',  
    maskContent: '',
      ...record,
    });
    setEditingKey(record.maskID);

  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (maskID) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => maskID === item.maskID);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
      console.log('data', data);
      updateDB(maskID, newData[index].maskContent);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

   const handleDelete = async (key) => {
        const editData = data.find((i) => i.maskID === key.maskID);  
        await axios.delete(`http://localhost:51693/api/masks/${editData.maskID}`); 

        const index = data.findIndex((i) => i.maskID === key.maskID); 
        const dataWithoutDeletedElement = [ 
        ...data.slice(0, index), 
        ...data.slice(index + 1) 
      ];      
        setData(dataWithoutDeletedElement);
   }
    

  const updateDB = async (maskID, maskContent) => { 
    const response = await axios.put(`http://localhost:51693/api/masks/${maskID}`, {maskID: maskID, maskContent: maskContent}); 
    if (response === 200)
    {
      const result = [
        data.find((i) => i.maskID = maskID),
        ...data
      ];
      setData(result);
    }
  }

  
  const columns = [
    {
        title: 'maskID',
        dataIndex: 'maskID',
        width: '33%',
        editable: false,
    },
    {
      title: 'maskContent',
      dataIndex: 'maskContent',
      width: '33%',
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
              onClick={() => save(record.maskID)}
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
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record)}>
              <a>Delete</a>
            </Popconfirm>
          ) : null,
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'maskID' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
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
          onChange: cancel,
        }}
      />
      <AddMaskForm  data = {data}
      setData = {setData}/>
    </Form>
    );
}
export default TableMasks;