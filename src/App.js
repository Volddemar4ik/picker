// import React, { useState } from 'react'
// import './App.css';
// import Modal from './components/modal';


// function App() {
//   const [showModal, setShowModal] = useState(false)
//   const [selectColor, setSelectColor] = useState({ name: '', colorNumber: 'Default', RGB: '0,0,0' })

//   return (
//     <React.Fragment>
//       <div className="wrapper">
//         <div className="container">
//           <div className="main-block custom-grout-color-block">
//             <h1>Тут будет заголовок</h1>
//             <div>тут будут цвета</div>
//             <div className="main-block__title main-block__title_flex-start main-block__title_flex-between title">
//               <div className="custom-grout-color-block__selected-color">
//                 <div className="main-block__select-color-item" style={{ backgroundColor: `rgb(${selectColor.RGB})` }}></div>

//                 <div className="custom-grout-color-block__selected-color-text" id='main-selected-color'>{`${selectColor.colorNumber} ${selectColor.name}`}</div>
//               </div>

//               <div className="custom-grout-color-block__add-color-icon" onClick={() => setShowModal(true)}>
//                 <span className="icon-add"></span>
//               </div>
//             </div>

//             <Modal active={showModal} setActive={setShowModal} setColor={setSelectColor} />
//           </div>
//         </div>
//       </div>



//       <div className='container'>
//         <div className='grout-color'>
//           <div className='grout-color__title title'>
//             Grout Color
//           </div>
//           <div className='grout-color__user-palitra'>
//             <div className='grout-color__user-palitra-block'>
//               это блок кадратика, таких нужно 7 штук
//             </div>
//           </div>
//           <div className='grout-color__user-custom-color-block'>
//             <div className='grout-color__user-selected-color'>квадратик с цветом последнего выбора</div>
//             <div className='grout-color__user-selected-color-name'>название цвета</div>
//             <div className=''>+</div>
//           </div>

//           {/* <Modal /> */}

//         </div>
//       </div>
//     </React.Fragment>
//   );
// }

// export default App;


import './App.css';
import Modal from './components/modal';
import React, { createContext, useState } from 'react'

export const ModalWindow = createContext()

function App() {
  const [handleModalWindow, setHandleModalWindow] = useState(false)
  console.log(handleModalWindow)

  function openModalWindow() {
    setHandleModalWindow(true)
  }

  return (
    <div className='container'>
      <div className='grout-color'>
        <div className='grout-color__title title'>
          Grout Color
        </div>
        <div className='grout-color__user-palitra'>
          <div className='grout-color__user-palitra-block grout-color__user-palitra-block_active' />
          <div className='grout-color__user-palitra-block' />
          <div className='grout-color__user-palitra-block' />
          <div className='grout-color__user-palitra-block' />
          <div className='grout-color__user-palitra-block' />
          <div className='grout-color__user-palitra-block' />
          <div className='grout-color__user-palitra-block' />
        </div>
        <div className='grout-color__user-custom-color-block'>
          <div className='grout-color__user-palitra-block' />
          <div className='grout-color__user-selected-color-name'>название цвета</div>
          <div className='grout-color__open-modal-window icon-button' onClick={openModalWindow}>
            <button className='grout-color__button-open-modal-window icon-button'>
              <i className='icon-open_modal icon'></i>
            </button>
          </div>
        </div>

        {handleModalWindow && <ModalWindow.Provider value={setHandleModalWindow}>
          <Modal />
        </ModalWindow.Provider>}

      </div>
    </div>
  );
}

export default App;