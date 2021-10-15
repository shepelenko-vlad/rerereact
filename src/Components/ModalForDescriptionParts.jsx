import { useState } from 'react';
import {Modal, Button} from 'antd';
import TblMasksWithRadBut from './TblMasksWithRadBut';

const ModalForDescriptionPart = ({maskContent}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [row, setRow] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const rowSelection = {
        onOk: () => {
            setIsModalVisible(false);
        },

        onCancel: () =>{
            setIsModalVisible(false);
        }
    }
    
    return(
        <>
            <Button type="link" onClick={showModal}>
                {maskContent}
            </Button>
            <Modal title="Изменение маски" visible={isModalVisible} onOk={rowSelection.onOk} onCancel={rowSelection.onCancel}>
                <TblMasksWithRadBut setSelectedRow={setRow}/>
            </Modal>
        </>
    )
}

export default ModalForDescriptionPart;