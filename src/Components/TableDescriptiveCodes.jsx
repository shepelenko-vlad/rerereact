import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';
import axios from "axios";
import AddDescriptiveCodeForm from './AddDescriptiveCodeForm';

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



const TableDescriptiveCodes = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        async function getData(){
            const response = await axios.get("http://localhost:51693/api/descriptivecodes");
            setData(response.data);
        };
        
        getData();
      }, []);

  const isEditing = (record) => record.descriptiveCodeID === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        descriptiveCodeID: '',  
        descriptiveCodeName: '',
      ...record,
    });
    setEditingKey(record.descriptiveCodeID);

  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (descriptiveCodeID) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => descriptiveCodeID === item.descriptiveCodeID);
      
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
      updateDB(descriptiveCodeID, newData[index].descriptiveCodeName);
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

   const handleDelete = async (key) => {
        const editData = data.find((i) => i.descriptiveCodeID === key.descriptiveCodeID);  
        await axios.delete(`http://localhost:51693/api/descriptivecodes/${editData.descriptiveCodeID}`); 

        const index = data.findIndex((i) => i.descriptiveCodeID === key.descriptiveCodeID); 
        const dataWithoutDeletedElement = [ 
        ...data.slice(0, index), 
        ...data.slice(index + 1) 
      ];      
        setData(dataWithoutDeletedElement);
   }
    

  const updateDB = async (descriptiveCodeID, descriptiveCodeName) => { 
    const response = await axios.put(`http://localhost:51693/api/descriptivecodes/${descriptiveCodeID}`, {descriptiveCodeID: descriptiveCodeID, descriptiveCodeName: descriptiveCodeName}); 
    if (response === 200)
    {
      const result = [
        data.find((i) => i.descriptiveCodeID = descriptiveCodeID),
        ...data
      ];
      setData(result);
    }
  }

  
  const columns = [
    {
        title: 'ID',
        dataIndex: 'descriptiveCodeID',
        width: '33%',
        editable: false,
    },
    {
      title: 'Название',
      dataIndex: 'descriptiveCodeName',
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
              onClick={() => save(record.descriptiveCodeID)}
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
        inputType: col.dataIndex === 'descriptiveCodeID' ? 'number' : 'text',
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
      <AddDescriptiveCodeForm data={data}
        setData={setData} />
    </Form>
    );
}
export default TableDescriptiveCodes;