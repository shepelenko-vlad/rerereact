import axios from "axios";
import { useState } from "react";
import VinInput from './VinInput';
import Masks from "./Masks";
import "./AppLayout.css";
import AdminPanel from "./AdminPanel";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

const AppLayout = () => {
  const [vinNumber, setVinNumber] = useState(null);
  const [vinValueInput, setVinValueInput] = useState("");

  var fullvin = require('./images/wherevin.jpg');
  var picvin = require('./images/picvin.jpg');
  
  const onVinInputSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:51693/api/decryptvin", { params: { vin: vinValueInput } });
    setVinNumber(response.data);
    setVinValueInput("");
  };

  return (
    <>
    <Route>
      <section className="bg-feature">
      <Link to="/admin"><h4 className="enter">Войти</h4></Link>
        <div id="top_content">
          <h1 style={{color: "white"}}>VIN Decoder</h1>
          <VinInput
            setVinValueInput={setVinValueInput}
            vinValueInput={vinValueInput}
            onVinInputSubmit={onVinInputSubmit}
          />
        </div>
        <svg
          className="CurvedBottom"
          width="1440"
          height="96"
          viewBox="0 0 1440 96"
          preserveAspectRatio="none"
          style={{
            bottom: -1,
            height: "auto",
            left: 0,
            maxHeight: 100,
            position: "absolute",
            width: "100%"
          }}>
          <path d="M1440 0v96H0V0c231.32 53.768 472.313 82.282 720 82.282S1208.68 53.768 1440 0z" fill="#FFF" />
        </svg>
    
      </section>
      <section id="where-is-my-vin">
        <div
          className="container"
          style={{
            paddingTop: 60
          }}
        >
          <div
            className="vin-number-info"
            style={{
              marginTop: -180,
              width: "50%",
              background: "#fff",
              position: "relative",
              top: 40,
              left: "50%",
              transform: "translateX(-50%)",
              borderRadius: "1.875rem",
              padding: "1em"
            }}
          >
              
            {!vinNumber && <p>Здесь отобразится таблица с результатом поиска</p>}
            {vinNumber && <Masks vinNumber={vinNumber} />}
              <h2  
                style={{
                  marginTop: 0
                  }}>
                  Что такое VIN-номер (идентификационный номер автомобиля)?
             </h2>
             <div id="divtbl" 
             style={{
                 paddingTop: 10,
                 paddingBottom: 10,
                 paddingLeft: 10,
                 marginBottom: 10,
                 marginLeft: 20,
                 float: "right",
                 background: "#f3f5f5",
                 borderRadius: "3px"
             }}
             >
                        <table>
                            <tbody>
                                <tr className="odd">
                                    <th>Количество символов:</th>
                                    <td 
                                    style = {{
                                        border: 0,
                                        paddingRight: 12,
                                        paddingLeft: 12
                                    }}
                                    >
                                        <span className="">17 (цифры и заглавные буквы)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Где находится:</th>
                                    <td style = {{
                                        border: 0,
                                        paddingRight: 12, 
                                        paddingLeft: 12
                                    }}
                                    >
                                        <span className="">Приборная панель со стороны водителя</span>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <th>Первая цифра обозначает:</th>
                                    <td style = {{
                                        border: 0,
                                        paddingRight: 12,
                                        paddingLeft: 12
                                    }}
                                    >
                                        <span className="">Страна-производитель</span>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <p>
                        Идентификационный номер автомобиля (VIN) - это уникальный код, присваиваемый каждому автомобилю при его производстве.
                        VIN представляет собой 17-символьную строку из букв и цифр без пробелов и букв Q (q), I (i) и O (o); они опущены, чтобы
                        избежать путаницы с цифрами 0 и 1. Каждый раздел VIN содержит определенную информацию об автомобиле, включая год, страну
                        и завод-изготовитель, марку и модель, а также серийный номер. VIN обычно печатается в одну строку.
                    </p>
                    <img src= {fullvin.default} alt='not found' />
                    <h2>Как найти VIN-номер автомобиля</h2>
                    <p>
                        На большинстве легковых автомобилей вы можете найти VIN-номер на передней части приборной панели со стороны водителя.
                        Лучший способ увидеть его - посмотреть на лобовом стекле снаружи автомобиля. Вы также можете найти VIN-номер на стойке
                        двери со стороны водителя. Откройте дверь и осмотрите место, где дверь крепится к автомобилю. VIN-код мотоцикла обычно
                        находится на рулевой шейке под рулем, хотя иногда он располагается на двигателе или на раме рядом с двигателем. VIN
                        полуприцепа расположен на передней части полуприцепа с левой стороны.
                    </p>
                    <p>
                        Если вы не смогли найти VIN-номер в указанных местах, то вы также можете найти его в паспорте транспортного средства,
                        свидетельстве о регистрации транспортного средства, гарантийном талоне/талоне технического осмотра или в страховом полисе на автомобиль.
                    </p>
                    <h2>Как использовать VIN-декодер для проверки VIN-номера</h2>
                    <p>
                        Введите 17-значный идентификационный номер автомобиля (VIN) в поле выше, чтобы найти и получить мгновенный отчет о его производителе, марке,
                        и модели, типе кузова, объеме двигателя, сборочном заводе и модельном годе. Информация предоставляется Национальной администрацией
                        безопасности дорожного движения (NHTSA) на основе данных, предоставленных производителями в NHTSA.
                    </p>
                    <h2>Как расшифровать идентификационный номер автомобиля</h2>
                    <p>
                        Интересно, что означают все символы в VIN-коде вашего автомобиля?
                    </p>
                    <img src= {picvin.default} alt='not found' />
                    <h2>Почему VIN-код важен</h2>
                    <p>
                        Бывают ситуации, когда необходимо проверить VIN-код автомобиля, поскольку многие реестры данных используют его для записи подробностей истории автомобиля.
                        Если вы заинтересованы в покупке подержанного автомобиля, вы можете выполнить поиск по VIN, чтобы получить отчет об истории автомобиля и найти записи о его
                        предыдущих владельцах, авариях и ремонтах. Вы также можете узнать, проводил ли производитель отзыв автомобиля и были ли проведены ремонтные работы. Наконец,
                        правоохранительные органы проверяют VIN для выявления угнанных автомобилей.
                    </p>
            </div>
          <div>
          </div>
        </div>
      </section>
      <footer>
            <div className="foot">
                <p style= {{
                    marginBottom: -2,
                    color: "white",
                     textAlign: 'right'
                    }}
                >
                    © 2021 Vlad Shepelenko
                </p>
            </div>
        </footer>
      </Route>
    </>
  );
};

export default AppLayout;