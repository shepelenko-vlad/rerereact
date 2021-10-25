import { useState } from 'react';
import { Form, Modal, Button, Input } from 'antd';
import TblMasksWithRadBut from './TblMasksWithRadBut';
import "./Components.css"
import TblDescriptiveCodesWithRadBtn from './TblDescriptiveCodesWithRadBtn';

const AddDescPartsForm = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalMaskVisible, setIsModalMaskVisible] = useState(false);
    const [isModalDescVisible, setIsModalDescVisible] = useState(false); 
    const [symbols, setSymbols] = useState(null);
    const [characteristic, setCharacteristic] = useState(null);

    const onSymbolsChange = (e) => {
        setSymbols(e.target.value);
        console.log('symbols', symbols);
    }

    const onCharacteristicChange = (e) => {
        setCharacteristic(e.target.value);
        console.log('characteristic', characteristic);
    }

    const showParentModal = () => {
        setIsModalVisible(true);
    }

    const showModalMask = () => {
        setIsModalMaskVisible(true);
    }

    const showModalDesc = () => {
        setIsModalDescVisible(true);
    }

    const onOk = () => {
        console.log('symbols', symbols);
        console.log('characteristic', characteristic);
        setIsModalVisible(false);
    }
    
    return(
        <div>
            <Button type="primary" onClick={showParentModal}>
                Добавить запись
            </Button>
            <div className="AddModal">
                <Modal visible={isModalVisible} onOk={onOk} onCancel={() => setIsModalVisible(false)}>
                    <p>Маска</p>
                    <Button type="link" onClick={showModalMask}>Маска</Button>
                    <Modal title="Добавление маски" visible={isModalMaskVisible} onOk={() => setIsModalMaskVisible(false)} onCancel={() => setIsModalMaskVisible(false)}>
                        <TblMasksWithRadBut/>
                    </Modal>
                    <p>Описание маски</p>
                    <Button type="link" onClick={showModalDesc}>Описание маски</Button>
                    <Modal title="Добавление описания" visible={isModalDescVisible} onOk={() => setIsModalDescVisible(false)} onCancel={() => setIsModalDescVisible(false)}>
                        <TblDescriptiveCodesWithRadBtn />
                    </Modal>
                    <p>Символы</p>
                    <Input className="AddInput" placeholder="Символы" 
                    value = {symbols}
                    onChange = {onSymbolsChange} />
                    <p>Характеристика</p>
                    <Input className="AddInput" placeholder="Характеристика"
                    value = {characteristic}
                    onChange = {onCharacteristicChange} />
                </Modal>
            </div>
        </div>
    )
}

export default AddDescPartsForm;