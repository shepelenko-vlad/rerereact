import { useState, useEffect } from "react";
import { Table } from 'antd';
import axios from "axios";
import { useDispatch } from "react-redux";
import { getDescriptiveCodeID } from "../Services/descriptiveCodeIDSlice";
import { getDescriptiveCodeName } from "../Services/descriptiveCodeNameSlice";

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

const TblDescriptiveCodesWithRadBtn = () => {
    const [data, setData] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        async function getData() {
            const response = await axios.get("http://localhost:51693/api/descriptivecodes");
            setData(response.data);
        };

        getData();
    }, []);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            dispatch(getDescriptiveCodeID(selectedRowKeys));
            dispatch(getDescriptiveCodeName(selectedRows[0].descriptiveCodeName));
        },
    }


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