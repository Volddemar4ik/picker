import React, { useState } from 'react'
import './App.css';
import './style.css'
import Modal from './modal';


function App() {
  const [showModal, setShowModal] = useState(false)
  const [selectColor, setSelectColor] = useState({ name: '', colorNumber: '', RGB: '' })

  return (
    <React.Fragment>
      <div className="wrapper">
        <div className="container">
          <div className="main-block custom-grout-color-block">
            <div className="main-block__title main-block__title_flex-start main-block__title_flex-between title">
              Custom Grout Color
              <div className="custom-grout-color-block__add-color-icon" onClick={() => setShowModal(true)}>
                <span className="icon-add"></span>
              </div>
            </div>

            <Modal active={showModal} setActive={setShowModal} setColor={setSelectColor} />

            <div className="custom-grout-color-block__selected-color">
              <div className="main-block__select-color-item" style={{ backgroundColor: `rgb(${selectColor.RGB})` }}></div>

              <div className="custom-grout-color-block__selected-color-text" id='main-selected-color'>{`${selectColor.colorNumber} ${selectColor.name}`}</div>
            </div>
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
