import { useState, useEffect } from "react";
import {Table} from 'antd';
import axios from "axios";

const columns = [
    {
        title: 'ID',
        dataIndex: 'maskID',
    },
    {
        title: 'Маска',
        dataIndex: 'maskContent',
    },
];

const TblMasksWithRadBut = (selectedRow, setSelectedRow) => {
    const [data, setData] = useState(null);
    const [aaaa, setAaaa] = useState(null);

    useEffect(() => {
        async function getData(){
            const response = await axios.get("http://localhost:51693/api/masks");
            setData(response.data);
        };

        getData();
      }, []);
    
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          setAaaa(selectedRowKeys);
        },
    }
    const onAaaChange = (e) => {
        setSelectedRow(aaaa);
    }
    console.log('chlen', selectedRow);
    console.log('aaaaaaaaaa', aaaa);
    return (
        <div>
            <Table rowKey={'maskID'}
                rowSelection={{
                type: 'radio',
                ...rowSelection,
                }}
                columns={columns}
                dataSource={data} 
                onRow={onAaaChange}
                />
        </div>
    );
};

export default TblMasksWithRadBut;