import React from 'react';
import Designer from './componens/designer'
import Editor from './componens/editor'
import { tshirts } from './componens/tshirtcolor'

const initial = {
  direction: 'front',
  color: 'white',
  size: 'm',
  designs: {
    front: {
      asset: 'https://konvajs.org/assets/lion.png',
      preview: 'https://konvajs.org/assets/lion.png',
      positions: {
        isDragging: false,
        width: 144,
        height: 139,
        x: 0,
        y: 0
      }
    },
    back: {
      asset: 'https://i.ibb.co/sskfDr1/lover-4992877-640.png',
      preview: 'https://i.ibb.co/sskfDr1/lover-4992877-640.png',
      positions: {
        isDragging: false,
        width: 343 / 3,
        height: 329 / 3,
        x: 0,
        y: 0,
      }
    }
  }
}

function App() {
  const [appLoaded, setAppLoaded] = React.useState(false);
  const [tshirt, setTshirt] = React.useState(initial);
  const [selected, setSelected] = React.useState(false);
  const [modal, setModal] = React.useState({
    isOpen: false,
    message: 'anjay'
  })
  const elStage = React.useRef();

  // React.useEffect(() => {
  //   // console.log(tshirt)
  // }, [])

  const checkDeselect = e => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelected(false);
    }
  };

  function closeModal() {
    setModal({
      isOpen: false,
      message: null
    })
  }

  React.useEffect(() => {

  }, [])

  React.useEffect(() => {
    if (!appLoaded) {
      // preload images
      for (let i = 0; i < tshirts.length; i++) {
        const pic = tshirts[i];
        const image = new Image()
        image.src = pic
        image.onload = () => {
          // hide loading when the last image has been loaded
          if (i === (tshirts.length - 1)) {
            setAppLoaded(true)
            let fisrtLoad = document.getElementById("fisrtLoad")
            fisrtLoad.classList.add("fade-out")
            setTimeout(() => {
              fisrtLoad.style.display = "none"
            }, 500)
          }
        }

      }
    }
  }, [appLoaded, setAppLoaded])

  return (
    <React.Fragment>
      <div className="min-h-screen block lg:flex justify-center items-center" >
        {modal.isOpen && (
          <div className="modal z-10 absolute min-h-screen w-full flex justify-center items-center">
            <div className="z-20 w-1/3 container bg-white p-5 rounded-sm">
              <p className="mb-5">{modal.message}</p>
              <button onClick={() => closeModal()} className="bg-primary w-full rounded-sm text-white p-2 outline-none">ok</button>
            </div>
            <div onClick={() => closeModal()} className="bg-modal min-h-full absolute w-full"></div>
          </div>
        )}
        < Designer selected={selected} setSelected={setSelected} checkDeselect={checkDeselect} elStage={elStage} tshirt={tshirt} tshirtOnChange={setTshirt} />
        <Editor setModal={setModal} selected={selected} setSelected={setSelected} elStage={elStage} tshirt={tshirt} tshirtOnChange={setTshirt} />
      </div>
    </React.Fragment>
  );
}

export default App;
