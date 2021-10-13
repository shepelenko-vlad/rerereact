import { useState } from "react";
import { Modal, Button } from 'antd';
import TblDescriptiveCodesWithRadBtn from "./TblDescriptiveCodesWithRadBtn";

const ModalFordDescriptiveCodes = ({descriptiveCodeName}) => {
    const[isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleOk = () => {
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return(
        <>
            <Button type="link" onClick={showModal}>
                {descriptiveCodeName}
            </Button>
            <Modal title="Изменение описания" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <TblDescriptiveCodesWithRadBtn />
            </Modal>
        </>
    )
}

export default ModalFordDescriptiveCodes;