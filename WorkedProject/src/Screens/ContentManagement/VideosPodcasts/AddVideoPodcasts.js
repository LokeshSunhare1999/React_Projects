import React, { useEffect, useState, useCallback } from 'react'
import * as routes from "../../../Router/RoutesURL";
import { useNavigate } from 'react-router-dom';
import redCross from "../../../assets/images/CommonComponent/redCross.svg"
import greenPlus from "../../../assets/images/CommonComponent/greenPlus.svg"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Select from "react-select";
import ReactQuill from 'react-quill';
import {
    generateVideoThumbnails,
} from "@rajesh896/video-thumbnails-generator";
import {
    getStorage,
    getDownloadURL,
    ref,
    uploadBytesResumable,
    deleteObject
} from 'firebase/storage';
import { app } from '../../../firebase';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-bootstrap/Modal';
import loaderImag from '../../../assets/images/CommonComponent/PepperyMedium.gif';
import AppContainer from '../../../components/AppContainer/AppContainer';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import EditorToolbar, { modules, formats } from "../BlogsArticles/EditorToolbar";
import { viewContentDetails, updateVideoPodcast, addVideoPodcast, getProgramsList, getCategoryList } from '../../../redux/actions/ContentManagementAction/VideoPodcasts/VideoPodcastsAction';
import UploadFileComponent from "../../UploadFileComponent";
import { createNotification } from '../../../Config/NotificationToast';
import { instance } from "../../../redux/auth/axiosInstance";
import './AddVideoPodcasts.scss';

const AddVideoPodcasts = (props) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [subscription, setSubscription] = useState('');
    const [programsListData, setProgramsListData] = useState('');
    const [categoriesListData, setCategoriesListData] = useState('');
    const [contentData, setContentData] = useState('');
    const [contentAmount, setContentAmount] = useState('');
    const [contentDescription, setContentDescription] = useState('');
    const [contentTitle, setContentTitle] = useState('');
    const [showBtns, setShowBtns] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [fileName, setFileName] = useState('');
    const [showWarningCancel, setShowWarningCancel] = useState(false);
    const [thumbFileName, setThumbFileName] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [videoForThumbNail, setVideoForThumbNail] = useState("")
    const [file2, setFile2] = useState();
    const [mediaThumbNail, setMediaThumbNail] = useState('');
    const [videoDuration, setVideoDuration] = useState('');
    const [showLoaderUpload, setShowLoaderUpload] = useState(false);
    const [formattedVideoDuration, setFormattedVideoDuration] = useState('');
    const { history } = props;
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectionType = location?.state?.selection;
    const contentId = location?.state?.contentId;
    const viewContentDetailsRes = useSelector(state => state.viewContentDetails?.viewContent?.data);
    const getViewProgramsRes = useSelector(state => state.getProgramsList.programsList.data);
    const getViewCategoryRes = useSelector(state => state.getCategoryList.categoryList.data);
    const viewContentDetailsError = useSelector(state => state.viewContentDetails);

    const options = [
        { value: 'video', label: 'Video' },
        { value: 'podcast', label: 'Podcast' },
    ];

    useEffect(() => {
        const sendRequest = {
            "filter_text": ""
        };
        dispatch(getProgramsList(sendRequest));
    }, [])

    useEffect(() => {
        dispatch(getCategoryList("val"));
    }, [])

    useEffect(() => {
        if (selectionType === "edit" && contentId) {
            const sendRequest = {
                "content_id": contentId
            };
            dispatch(viewContentDetails(sendRequest));
        } else {
            setSubscription("free")
        }
    }, [])

    useEffect(() => {
        if (getViewProgramsRes && getViewProgramsRes.length > 0) {
            setProgramsListData(getViewProgramsRes);
        }
    }, [getViewProgramsRes])
    useEffect(() => {
        if (getViewCategoryRes && getViewCategoryRes.length > 0) {
            setCategoriesListData(getViewCategoryRes);
        }
    }, [getViewCategoryRes])

    useEffect(() => {
        if (selectionType === "edit" && viewContentDetailsError.error !== "No data found") {
            setContentData(viewContentDetailsRes && viewContentDetailsRes[0]);
        } else {
            setContentData("");
        }
    }, [viewContentDetailsRes, viewContentDetailsError])

    useEffect(() => {

        if (selectionType === "edit" && viewContentDetailsError.error !== "No data found" && contentData) {
            const selectedPro = programsListData && programsListData?.find(item => item.id === contentData.related_program_id);
            const selectedCat = categoriesListData && categoriesListData?.find(item => item.id === contentData.content_category_id);
            setSelectedOption({ label: contentData.content_type, value: contentData.content_type });
            setSubscription(contentData.content_version);
            setContentAmount(contentData.amount);
            setMediaThumbNail(contentData.media)
            setContentDescription(contentData.description);
            setContentTitle(contentData.title);
            setSelectedProgram({ label: selectedPro?.title, value: selectedPro, key: selectedPro?.id });
            setSelectedCategory({ label: selectedCat?.category_name, value: selectedCat, key: selectedCat?.id });
            setVideoForThumbNail(contentData.media_thumbnail)
            setFormattedVideoDuration(contentData.duration);
            setFileName(contentData.media);
            setThumbnails(contentData.media_thumbnail);
        }

    }, [viewContentDetailsRes && viewContentDetailsRes[0] && contentData])

    useEffect(() => {
        if (selectionType === "edit" && contentData) {
            if (subscription !== contentData?.content_version
                || contentAmount !== contentData?.amount
                || contentDescription !== contentData?.description
                || contentTitle !== contentData?.title
                || selectedOption.value !== contentData?.content_type
                // || selectedProgram.key !== contentData.related_program_id
                || videoForThumbNail !== contentData.media_thumbnail
                || selectedCategory.key !== viewContentDetailsRes[0]?.content_category_id
            ) {
                setShowBtns(true);
            } else {
                setShowBtns(false);
            }
        } else {
            if (subscription !== "free" && contentAmount === "") {
                setShowBtns(false);
            } else if (
                selectedOption !== "" &&
                subscription !== "" &&
                contentDescription !== "" &&
                contentTitle !== "" &&
                // selectedProgram !== "" &&
                selectedCategory !== ""

            ) {
                setShowBtns(true);

            } else {
                setShowBtns(false);
            }
        }
    }, [subscription,
        contentData,
        contentAmount,
        contentDescription,
        contentTitle,
        selectedOption, selectedProgram, selectedCategory, videoForThumbNail])

    const handleChange = (val) => {
        setSelectedOption(val)
    }
    const handleShowWarningCancel = (val) => {
        setShowWarningCancel(true);
    }
    const handleHideWarningCancel = (val) => {
        setShowWarningCancel(false);
    }

    const cancelPublish = () => {
        if (selectionType === "edit") {
            setSelectedOption({ label: contentData.content_type, value: contentData.content_type });
            setSubscription(contentData.content_version);
            setContentAmount(contentData.amount);
            setContentDescription(contentData.description);
            setContentTitle(contentData.title);
            setShowBtns(false);
            const selectedPro = programsListData.find(item => item.id === contentData.related_program_id);
            setSelectedProgram({ label: selectedPro?.title, value: selectedPro, key: selectedPro?.id });
            const selectedCat = categoriesListData && categoriesListData?.find(item => item.id === contentData.content_category_id);
            setSelectedCategory({ label: selectedCat?.category_name, value: selectedCat, key: selectedCat?.id });
        } else {
            setSelectedOption("");
            setSubscription("");
            setContentAmount("");
            setContentDescription("");
            setContentTitle("");
            setSelectedProgram("");
            setSelectedCategory("");
            setShowBtns(false);
        }
        navigate("/content-management");
    }
    const handlePublish = () => {
        let sendRequest = {
            "content_type": selectedOption.value,
            "program_id": selectedProgram.key ? (selectedProgram.key).toString() : "",
            "category_id": selectedCategory.key,
            "title": contentTitle,
            "description": contentDescription,
            "media_type": "video",
            "duration": formattedVideoDuration,
            "content_version": subscription,
            "amount": contentAmount,
            "publish_by": ""
        };
        if (selectionType === "edit") {
            let fileNameVideo = fileName;
            let  imageForThumbNail = videoForThumbNail;
            if(fileName.includes("https") === true ){
                 fileNameVideo = decodeURIComponent(fileName.substring(fileName.indexOf('o/') + 2, fileName.indexOf('?')));
            }
            if(videoForThumbNail.includes("https") === true){
                 imageForThumbNail = decodeURIComponent(videoForThumbNail.substring(videoForThumbNail.indexOf('o/') + 2, videoForThumbNail.indexOf('?')))
            }
            const sendRequestData = { ...sendRequest, "content_id": contentId, "media": fileNameVideo, "media_thumbnail": imageForThumbNail };
            dispatch(updateVideoPodcast(sendRequestData));
        } else {
            let fileNameVideo = fileName;
            let  imageForThumbNail = videoForThumbNail;
            if(fileName.includes("https") === true ){
                 fileNameVideo = decodeURIComponent(fileName.substring(fileName.indexOf('o/') + 2, fileName.indexOf('?')));
            }
            if(videoForThumbNail.includes("https") === true){
                 imageForThumbNail = decodeURIComponent(videoForThumbNail.substring(videoForThumbNail.indexOf('o/') + 2, videoForThumbNail.indexOf('?')))
            }
            const sendRequestData = { ...sendRequest, "content_id": contentId, "media": fileNameVideo, "media_thumbnail": imageForThumbNail };
            dispatch(addVideoPodcast(sendRequestData));
        }
        navigate(routes.CONTENT_MANAGEMENT, { state: { selectedTab: "VideoPodcasts" } })
    }

    const handleChangeProgram = (e) => {
        setSelectedProgram({ label: e.value.title, value: e, key: e.value.id });
    }
    const handleChangeCategory = (e) => {
        setSelectedCategory({ label: e.value.category_name, value: e, key: e.value.id });
    }

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
        const seconds = totalSeconds - hours * 3600 - minutes * 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function getFileObjectFromBase64(base64String, fileName) {
        const base64Data = base64String[0].replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        const contentType = base64String[0].match(/^data:(.*);base64,/)[1];
        const sliceSize = 512;
        const byteCharacters = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const file = new File(byteArrays, fileName, { type: contentType });
        return file;
    }




    async function fileChangeVideo(e) {
        const videoFile = e;
        setFile2(videoFile);
        const storage = getStorage(app);
        const filePath = `/contents/${selectedCategory.label}/${videoFile.name.slice(0, videoFile.name.lastIndexOf("."))}.jpg`;
        const fileRef = ref(storage, filePath);
        getDownloadURL(fileRef)
          .then((url) => {
            setShowLoaderUpload(false);
            setVideoForThumbNail(url);
          })
          .catch((error) => {
            generateVideoThumbnails(videoFile, 0).then((thumbs) => {
                setThumbnails(thumbs);
                const file = getFileObjectFromBase64(thumbs, `${videoFile.name.slice(0, videoFile.name.lastIndexOf("."))}.jpg`);
                const formDataThumb = new FormData();
                formDataThumb.append('file', file);
                setThumbnails(file);
                setThumbFileName(`contents/${selectedCategory.label}/${file.name}`);
                const storage = getStorage(app);
                const path = `/contents/${selectedCategory.label}/${file.name}`;
                const metadata = { cacheControl: 'public, no-cache' };
                const storageRef = ref(storage, path);
                const uploadTask = uploadBytesResumable(storageRef, file, metadata);
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error) => {
                        setShowLoaderUpload(false);
                    },
                    async () => {
                        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURLs) => {
                            setShowLoaderUpload(false);
                            setVideoForThumbNail(downloadURLs);
                        });
                    }
                );
            });
            const reader = new FileReader();
            reader.onload = (e) => {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(new Blob([e.target.result]));
                video.onloadedmetadata = () => {
                    setVideoDuration(Math.round(video.duration));
                    video.addEventListener('loadeddata', handleVideoLoaded);
                };
                async function handleVideoLoaded() {
                    const video = this;
                    video.removeEventListener('loadeddata', handleVideoLoaded);
                }
            };
            reader.readAsArrayBuffer(videoFile);
        });
    }
    useEffect(() => {
        setFormattedVideoDuration(formatTime(videoDuration))
    }, [videoDuration])


    const handleChangeCarb = () => {
        const storage = getStorage(app);
        const fileNameVideo = decodeURIComponent(fileName.substring(fileName.indexOf('o/') + 2, fileName.indexOf('?')));
        const imageForThumbNail = decodeURIComponent(videoForThumbNail.substring(videoForThumbNail.indexOf('o/') + 2, videoForThumbNail.indexOf('?')))
        const fileRefThumb = ref(storage, imageForThumbNail);
        const fileRef = ref(storage, fileNameVideo);
        setShowLoaderUpload(false);
        deleteObject(fileRef)
          .then(() => {
            setFileName("");
            createNotification('success', "File deleted successfully");
          })
          .catch((error) => {
            createNotification('error', "Error in deleting file");
          });
        deleteObject(fileRefThumb)
          .then(() => {
            setVideoForThumbNail("");
            createNotification('success', "File deleted successfully");
          })
          .catch((error) => {
            createNotification('error', "Error in deleting file");
          });
    }

    const handleProcedureContentChange = (content, delta, source, editor) => {
        editor.getHTML(); // rich text
        editor.getText(); // plain text
        editor.getLength(); // number of characters
        setContentDescription(content);
    }

    const handleBlur = useCallback(() => {
        setContentDescription((prevText) => prevText);
    }, [contentDescription]);

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='AddVideoPodcasts'>
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Video Or Podcast</h4>
                            {showBtns && <div className='d-flex'>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={handleShowWarningCancel} >
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="button" className="btn btn-success greenButton" onClick={handlePublish} >
                                    <img className="mainIcon mr-2" src={greenPlus} alt="" width="16px" height="16px" />
                                    UPDATE</button>
                            </div>}
                        </div>
                        <div className="separator"></div>
                        <div className="card-body p-4">
                            <div className='row cardDiv'>
                                <div className='col'>
                                    <div className="form-floating col mb-3 dropDownsDiv">
                                        <div>
                                            <label for="floatingSelect" className="form-label Label">Select Type</label>
                                            <Select
                                                placeholder="Select Type"
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                onChange={handleChange}
                                                value={selectedOption}
                                                options={options}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    isFocused: "#74613C",
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#F5F5F5',
                                                        primary: '#74613C',
                                                    },
                                                })}
                                            />
                                        </div>
                                        <div className='ml-4'>
                                            <label htmlFor="floatingSelect" className="form-label Label">Select Category</label>
                                            <Select
                                                placeholder="Select Category"
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                value={selectedCategory}
                                                options={categoriesListData && categoriesListData?.map((categories) => {
                                                    return {
                                                        label: categories.category_name,
                                                        value: categories,
                                                        key: categories.id
                                                    };
                                                })}

                                                onChange={handleChangeCategory}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#F5F5F5',
                                                        primary: '#74613C',
                                                    },
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="mb-3 pr-0">
                                            <label for="exampleFormControlInput1" className="form-label Label">Title</label>
                                            <input type="text" className="form-control Title" id="exampleFormControlInput1" placeholder="Enter title"
                                                value={contentTitle}
                                                onChange={(e) => { setContentTitle(e.target.value) }}
                                            />
                                        </div>
                                        <div className='ml-4'>
                                            <label htmlFor="floatingSelect" className="form-label Label">Select Program</label>
                                            <Select
                                                placeholder="Select Program"
                                                className="react-select"
                                                classNamePrefix="react-select"
                                                value={selectedProgram}
                                                options={programsListData && programsListData?.map((programs, index) => {
                                                    return {
                                                        label: programs.title,
                                                        value: programs,
                                                        key: programs.id
                                                    };
                                                })}

                                                onChange={handleChangeProgram}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary25: '#F5F5F5',
                                                        primary: '#74613C',
                                                    },
                                                })}
                                            />
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className=" d-flex">
                                            <div className='mb-3 d-flex'>
                                                <FormControl>
                                                    <FormLabel id="demo-radio-buttons-group-label" sx={{ flexDirection: 'row' }} className="Label">Version</FormLabel>
                                                    <RadioGroup sx={{ display: 'flow-root', }} className="mt-2 pt-1" aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        value={subscription}
                                                        onChange={(e) => { setSubscription(e.target.value) }}
                                                    >
                                                        <FormControlLabel value="free" className="mr-4" control={<Radio />} label="Free" />
                                                        <FormControlLabel value="paid" control={<Radio />} label="Paid" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            {subscription === "paid" && <div className='mb-3 ml-4'>
                                                <label for="exampleFormControlInput1" className="form-label Label">Enter Amount</label>
                                                <input type="number" className="form-control Amount" id="exampleFormControlInput1" placeholder="XXX" value={contentAmount}
                                                    onChange={(e) => { setContentAmount(Number((e.target.value))) }}
                                                />
                                            </div>}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label for="exampleFormControlTextarea1" className="form-label Label" >Description</label>
                                        <EditorToolbar />
                                        <ReactQuill
                                            theme="snow"
                                            value={contentDescription}
                                            onChange={handleProcedureContentChange}
                                            onBlur={handleBlur}
                                            placeholder='Enter Description'
                                            formats={formats}
                                            modules={modules}
                                        />
                                    </div>

                                    <div className="mb-3 d-flex flex-column ">
                                        <label for="exampleFormControlTextarea1" className="form-label Label" >Add File</label>
                                        <div className=' d-flex'>
                                            {selectionType === "edit" && showLoaderUpload && !(videoForThumbNail.includes("https") === true) ? <img src={loaderImag} alt='' className='loaderIconCss imgPreview mb-2' width="100px" height="100%" />
                                                : ""
                                            }

                                            {selectionType === "edit" && !showLoaderUpload && (videoForThumbNail.includes("https") === true) ?
                                                <img className={videoForThumbNail === "" ? "mb-2 " : "imgPreview mb-2"} src={videoForThumbNail} width="100px" height="100%" /> : ""
                                            }
                                            {selectionType !== "edit" && showLoaderUpload && !(videoForThumbNail.includes("https") === true) ? <img src={loaderImag} alt='' className='loaderIconCss imgPreview mb-2' width="100px" height="100%" />
                                                : ""
                                            }
                                            {selectionType !== "edit" && !showLoaderUpload && (videoForThumbNail.includes("https") === true) ?
                                                <img className={videoForThumbNail === "" ? "mb-2 " : "imgPreview mb-2"} src={videoForThumbNail} width="100px" height="100%" /> : ""
                                            }
                                            {videoForThumbNail == "" ? <div>
                                                <UploadFileComponent
                                                    filePath={`contents/${selectedCategory.label}`}
                                                    acceptFileType={"video/mp4, video/ogg"}
                                                    selectedOption={selectedOption}
                                                    type={"video & podcast"}
                                                    selectedProgram={selectedProgram}
                                                    fileChangeVideo={fileChangeVideo}
                                                    setFileName={setFileName}
                                                    setFileForThumbNail={setVideoForThumbNail}
                                                    setShowLoaderUpload={setShowLoaderUpload}
                                                    setFormattedVideoDuration={setVideoDuration} />
                                            </div>
                                                :
                                                <div className='ml-3 d-flex RemoveDiv align-items-center'>
                                                    <img className="mainIcon mr-1 " src={redCross} alt="" width="22px" height="22px" /> <p className='Remove mt-0 mb-0' onClick={handleChangeCarb}>Remove</p>
                                                </div>
                                            }
                                        </div>
                                        {videoForThumbNail == "" ? "" : <div className='ml-1 videoDur'>{formattedVideoDuration}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal centered className="TeamMember-modal-warning br-8" show={showWarningCancel} onHide={() => { setShowWarningCancel(false) }}>
                    <Modal.Header>
                        <div className="modalText pb-4">Are you sure?</div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="">
                            <label htmlFor="exampleFormControlInput1" className="form-label DeleteDesc">You want to cancel?</label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-success greenButton mr-3" onClick={handleHideWarningCancel}>
                            Cancel</button>
                        <button type="button" className="btn btn-danger redButton " onClick={cancelPublish}>
                            Go Back</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </AppContainer >
    )
}
export default AddVideoPodcasts
