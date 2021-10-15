import { Menu, Dropdown, Button, Space } from 'antd'

const DropDownTables = ({setKey}) => {

    const menu = (

        <Menu>
            <Menu.Item key="1" onClick={() => setKey("1")}>
                Таблица "Маски"
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setKey("2")}>
                Таблица "Описательные коды"
            </Menu.Item>
            <Menu.Item key="3" onClick={() => setKey("3")}>
                Таблица "Вин части"
            </Menu.Item>
        </Menu>
    );

    return(
        <Space wrap>
            <Dropdown overlay={menu}>
                <Button>
                    Список таблиц
                </Button>
            </Dropdown>
        </Space>
    )
};

export default DropDownTables;