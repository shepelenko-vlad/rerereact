import react, { useState } from 'react';
import {Modal, Button} from 'antd';
import TblMasksWithRadBut from './TblMasksWithRadBut';

const ModalForDescriptionPart = ({maskID, maskContent}, {selectedRow, setSelectedRow}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        console.log('child1', selectedRow)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return(
        <>
            <Button type="link" onClick={showModal}>
                {maskContent}
            </Button>
            <Modal title="Изменение маски" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <TblMasksWithRadBut selectedRow={selectedRow} setSelectedRow={setSelectedRow}/>
            </Modal>
        </>
    )
}

export default ModalForDescriptionPart;