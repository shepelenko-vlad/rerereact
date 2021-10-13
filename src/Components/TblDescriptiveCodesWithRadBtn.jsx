import { useState, useEffect } from "react";
import { Table } from 'antd';
import axios from "axios";

const columns = [
    {
        title: 'ID',
        dataIndex: 'descriptiveCodeID',
    },
    {
        title: 'Описание',
        dataIndex: 'descriptiveCodeName',
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
}

const TblDescriptiveCodesWithRadBtn = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function getData() {
            const response = await axios.get("http://localhost:51693/api/descriptivecodes");
            setData(response.data);
        };

        getData();
    }, []);

    return(
        <div>
            <Table rowKey={'descriptiveCodeID'}
                rowSelection={{
                type: 'radio',
                ...rowSelection,
                }}
                columns={columns}
                dataSource={data} />
        </div>
    );
};

export default TblDescriptiveCodesWithRadBtn;