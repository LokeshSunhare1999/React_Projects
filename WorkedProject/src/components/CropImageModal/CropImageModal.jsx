import { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './CropImageModal.scss'
import AvatarEditor from 'react-avatar-editor';
import { Slider } from '@mui/material';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import { app } from '../../firebase';
import ZoomIn from '../../assets/images/CommonComponent/ZoomIn.svg'
import ZoomOut from '../../assets/images/CommonComponent/ZoomOut.svg'

function CropImageModal({imgURL, fileName, setFileName, show, setShow, setFileForThumbNail, type, setShowLoaderUpload}) {
  const [slideValue, setSlideValue] = useState(10);
  const [aspectRatio, setAspectRatio] = useState(1);
  const aspectRatioData = [
    {label: "1 : 1", value: 1},
    {label: "3 : 4", value: 3/4},
    {label: "4 : 3", value: 4/3},
    {label: "16 : 9", value: 16/9},
    {label: "9 : 16", value: 9/16},
    {label: "2 : 3", value: 2/3},
    {label: "3 : 2", value: 3/2},
    {label: "2 : 1", value: 2},
    {label: "1 : 2", value: 1/2}
  ]

  const cropRef = useRef(null);

  const handleClose = () => {
        setShowLoaderUpload(false)
        setShow(false); 
        setFileForThumbNail("")
        setFileName('')
        setSlideValue(10)
    };

  const handleSave = async() => {
    if (cropRef) {
        const dataUrl = cropRef.current.getImage().toDataURL();
        const result = await fetch(dataUrl);
        const blob = await result.blob();

        const storage = getStorage(app);
        const metadata = { cacheControl: 'public, no-cache' };
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);
        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            if (type === "blogs & articles") {
            }
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
              if (type === "blogs & articles") {
                setFileForThumbNail(downloadURLs);
                setShowLoaderUpload(false)
              }
            });
          }
        );
        setShow(false)
        setSlideValue(10)
    }
  };

  return (
    <>
      <Modal show={show} 
        // onHide={handleClose} 
        centered
        backdrop="static"
        keyboard={false}
    >
        <div className='crop-image-modal p-3 py-4'>
            <div className="heading">
                Adjust Image
            </div>
            <div className='py-3 text-center'>
              <div className="crop-box mb-4">
                <AvatarEditor 
                  ref={cropRef}
                  image={imgURL}
                  width={200 * aspectRatio}
                  height={200 }
                  border={5}
                  color={[0, 0, 0, 0.5]} // RGBA
                  scale={slideValue / 10}
                  rotate={0}
                />
              </div>

                <div className="feature">
                  <span className="text">Aspect Ratio</span>
                  <div className="radio-box-input">
                    {
                      aspectRatioData?.map((item, index)=>(
                        <div className="radio-box" key={index}>
                          <input type="radio" name='aspect-ratio' value={item.value} 
                              onChange={(e)=>{setAspectRatio(item.value)}}
                              checked={aspectRatio === item.value}
                          />
                          <label htmlFor={item.label}> {item.label}</label>
                        </div>
                      ))
                    }
                  </div>
              </div>

              <div className="feature">
                  <span className="text">Zoom</span>
                  <div className="slider">
                      <img className='indicators' src={ZoomOut} alt="" onClick={()=>{setSlideValue(prev=> prev-2 <10? 10: prev-2)}}/>
                      <Slider
                          min={10}
                          max={50}
                          size="small"
                          aria-label="Small"
                          defaultValue={slideValue}
                          value={slideValue}
                          onChange={(e) => setSlideValue(e.target.value)}
                      />
                      <img className='indicators' src={ZoomIn} alt="" onClick={()=>{setSlideValue(prev=> prev+2 > 50? 50: prev+2)}}/>
                  </div>
              </div>
            </div>
            <div className='d-flex justify-content-between'>
                <button variant="secondary" className='redButton' onClick={handleClose}>
                    CANCEL
                </button>
                <button variant="primary" className='greenButton' onClick={handleSave}>
                    SAVE
                </button>
            </div>
        </div>
      </Modal>
    </>
  );
}

export default CropImageModal;
