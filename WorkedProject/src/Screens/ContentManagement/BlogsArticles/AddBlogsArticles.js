import React, { useCallback, useEffect, useState } from 'react'
import * as routes from "../../../Router/RoutesURL";
import { useNavigate } from 'react-router-dom';
import redCross from "../../../assets/images/CommonComponent/redCross.svg"
import greenPlus from "../../../assets/images/CommonComponent/greenPlus.svg"
import Select from "react-select";
import AppContainer from '../../../components/AppContainer/AppContainer';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
    viewContentDetails,
    updateVideoPodcast,
    addVideoPodcast,
    getProgramsList,
    getCategoryList
} from '../../../redux/actions/ContentManagementAction/VideoPodcasts/VideoPodcastsAction';
import {
    getStorage,
    ref,
    deleteObject
} from 'firebase/storage';
import { app } from '../../../firebase';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { instance } from "../../../redux/auth/axiosInstance";
import UploadFileComponent from "../../UploadFileComponent";
import loaderImag from '../../../assets/images/CommonComponent/PepperyMedium.gif';
import { createNotification } from '../../../Config/NotificationToast';
import '../VideosPodcasts/AddVideoPodcasts.scss';
import CropImageModal from '../../../components/CropImageModal/CropImageModal';

const AddBlogsArticles = (props) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [programsListData, setProgramsListData] = useState('');
    const [categoriesListData, setCategoriesListData] = useState('');
    const [contentData, setContentData] = useState(null);
    const [contentDescription, setContentDescription] = useState('');
    const [contentTitle, setContentTitle] = useState('');
    const [publishedBy, setPublishedBy] = useState('');
    const [showBtns, setShowBtns] = useState();
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [fileName, setFileName] = useState('');
    const [showLoaderUpload, setShowLoaderUpload] = useState(false);
    const [fileForThumbNail, setFileForThumbNail] = useState("")
    const [file, setFile] = useState();
    const [show, setShow] =useState(false)

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
        { value: 'blog', label: 'Blog' },
        { value: 'article', label: 'Article' },
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
        }
    }, [])

    useEffect(() => {
        if (getViewProgramsRes && getViewProgramsRes.length > 0) {
            setProgramsListData(getViewProgramsRes);
        }
    }, [getViewProgramsRes])

    useEffect(() => {
        if (selectionType === "edit" && viewContentDetailsError.error !== "No data found") {
            setContentData(viewContentDetailsRes && viewContentDetailsRes[0]);

        } else {
            setContentData("");
        }
    }, [viewContentDetailsRes, viewContentDetailsError])


    useEffect(() => {
        if (getViewCategoryRes && getViewCategoryRes.length > 0) {
            setCategoriesListData(getViewCategoryRes);
        }
    }, [getViewCategoryRes])

    useEffect(() => {
        if (selectionType === "edit" && viewContentDetailsError.error !== "No data found" && contentData) {
            const selectedPro = programsListData && programsListData?.find(item => item.id === contentData.related_program_id);
            const selectedCat = categoriesListData && categoriesListData?.find(item => item.id === contentData.content_category_id);
            setSelectedOption({ label: contentData.content_type, value: contentData.content_type });
            setContentDescription(contentData.description);
            setFileName(contentData.media);
            setFileForThumbNail(contentData.media);
            setContentTitle(contentData.title);
            setPublishedBy(contentData.publish_by)
            setSelectedProgram({ label: selectedPro?.title, value: selectedPro, key: selectedPro?.id });
            setSelectedCategory({ label: selectedCat?.category_name, value: selectedCat, key: selectedCat?.id });
        }

    }, [viewContentDetailsRes && viewContentDetailsRes[0] && contentData])

    useEffect(() => {
        if (selectionType === "edit" && viewContentDetailsRes && viewContentDetailsRes?.[0] && contentData && contentDescription !== "") {
            if (
                contentDescription !== viewContentDetailsRes[0]?.description
                || contentTitle !== viewContentDetailsRes[0]?.title
                || publishedBy !== viewContentDetailsRes[0]?.publish_by
                || selectedOption.value !== viewContentDetailsRes[0]?.content_type
                // || selectedProgram.key !== viewContentDetailsRes[0]?.related_program_id
                || selectedCategory.key !== viewContentDetailsRes[0]?.content_category_id
            ) {
                setShowBtns(true);
            } else {
                setShowBtns(false);
            }
        } else if (selectionType === "add") {
            if (
                selectedOption !== "" &&
                contentDescription !== "" &&
                contentTitle !== "" &&
                publishedBy !== "" &&
                // selectedProgram !== "" &&
                selectedCategory !== ""
            ) {
                setShowBtns(true);

            } else {
                setShowBtns(false);
            }
        }
    }, [

        publishedBy,
        contentDescription,
        contentTitle,
        selectedOption, selectedProgram, selectedCategory])

    const handleChange = (e) => {
        setSelectedOption(e)
    }

    const cancelPublish = (e) => {
        if (selectionType === "edit") {
            setShowBtns(false);
            const selectedPro = programsListData && programsListData?.find(item => item.id === contentData.related_program_id);
            const selectedCat = categoriesListData && categoriesListData?.find(item => item.id === contentData.content_category_id);
            setSelectedOption({ label: contentData.content_type, value: contentData.content_type });
            setContentDescription(contentData.description);
            setContentTitle(contentData.title);
            setPublishedBy(contentData.publish_by)
            setSelectedProgram({ label: selectedPro?.title, value: selectedPro, key: selectedPro?.id });
            setSelectedCategory({ label: selectedCat?.category_name, value: selectedCat, key: selectedCat?.id });
        } else {
            setSelectedOption("");
            setContentDescription("");
            setContentTitle("");
            setPublishedBy("");
            setSelectedProgram("");
            setSelectedCategory("");
            setShowBtns(false);
        }
        navigate("/content-management");
    }
    const handlePublish = (e) => {
        if (selectionType === "edit") {
            const sendRequest = {
                "content_id": contentId,
                "content_type": selectedOption.value,
                "program_id": selectedProgram.key ? (selectedProgram.key).toString() : "",
                "category_id": selectedCategory.key,
                "title": contentTitle,
                "description": contentDescription,
                "duration": "00:30:05",
                "media_type": "image",
                "publish_by": publishedBy,
                "amount": "",
                "content_version": "free",
            };
            if (fileName.includes("https") === true) {
                let media = decodeURIComponent(fileName.substring(fileName.indexOf('o/') + 2, fileName.indexOf('?')));
                const sendRequestData = { ...sendRequest, "content_id": contentId, "media": media };
                dispatch(updateVideoPodcast(sendRequestData));
            } else {
                let media = fileName;
                const sendRequestData = { ...sendRequest, "content_id": contentId, "media": media };
                dispatch(updateVideoPodcast(sendRequestData));
            }



        } else {
            const sendRequest = {
                "content_type": selectedOption.value,
                "program_id": selectedProgram.key ? (selectedProgram.key).toString() : "",
                "category_id": selectedCategory.key,
                "title": contentTitle,
                "description": contentDescription,
                "media": fileName,
                "duration": "00:30:05",
                "media_type": "image",
                "publish_by": publishedBy,
                "amount": "",
                "content_version": "free",
            };
            dispatch(addVideoPodcast(sendRequest));
        }
        navigate(routes.CONTENT_MANAGEMENT, { state: { selectedTab: "BlogsArticles" } })
    }

    const handleChangeProgram = (e) => {
        setSelectedProgram({ label: e.value.title, value: e, key: e.value.id });
    }
    const handleChangeCategory = (e) => {
        setSelectedCategory({ label: e.value.category_name, value: e, key: e.value.id });
    }


    const handleFileChange = (e) => {
        setFileForThumbNail(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0]);
        handleSubmit2(e)
    }

    const handleSubmit2 = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        instance.put(`https://dev-api-wa62jalpha-el.a.run.app/api/upload/file/content/${selectedCategory.label}`, formData, {
        })
            .then(res => {
                createNotification('success', "File upload successfully");
                res?.statusCode == 200 ? setFileName(res?.data[0]?.file_name) : console.log(res)
            })
            .catch(err => console.error(err));
    }


    const handleChangeCarb = () => {
            const storage = getStorage(app);
            console.log(fileName.slice(fileName.substring(fileName.indexOf('o/') + 2, fileName.indexOf('?'))))
            const fileNameVideo = decodeURIComponent(fileName.slice(fileName.substring(fileName.indexOf('o/') + 2, fileName.indexOf('?'))));
            const fileRef = ref(storage, fileNameVideo);
            setShowLoaderUpload(false);
            deleteObject(fileRef)
              .then(() => {
                setShowLoaderUpload(false);
                setFileName("");
                setFileForThumbNail("");
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

    };


    const handleBlur = useCallback(() => {
        setContentDescription((prevText) => prevText);
    }, [contentDescription]);



    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='AddVideoPodcasts'>
                    <div className="card">
                        <div className="card-header">
                            <h4>Add Blog Or Article</h4>
                            {showBtns && <div className='d-flex'>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelPublish} >
                                    <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL
                                    </button>
                                <button type="button" className="btn btn-success greenButton " onClick={handlePublish} >
                                    <img className="mainIcon mr-2" src={greenPlus} alt="" width="16px" height="16px" />
                                    PUBLISH</button>
                            </div>}
                        </div>
                        <div className="separator"></div>
                        <div className="card-body p-4">
                            <div className='row cardDiv'>
                                <div className='col'>
                                    <div className="form-floating col mb-3 dropDownsDiv">
                                        <div>
                                            <label htmlFor="floatingSelect" className="form-label Label">Select Type</label>
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
                                    <div className="form-floating col  dropDownsDiv 'd-flex '">

                                        <div>
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
                                        <div className="mb-3 pr-0 ml-4">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Title</label>
                                            <input type="text" className="form-control Title" id="exampleFormControlInput1" placeholder="Enter title"
                                                value={contentTitle}
                                                onChange={(e) => { setContentTitle(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex '>
                                        <div className="mb-3 pr-0">
                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Published By</label>
                                            <input type="text" className="form-control Title" id="exampleFormControlInput1" placeholder="Enter title"
                                                value={publishedBy}
                                                onChange={(e) => { setPublishedBy(e.target.value) }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label Label" >Description</label>
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
                                    <div className="mb-3 d-flex flex-column">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label Label" >Add Attachment</label>
                                        {/* ------------dummy condition of view only--------------- */}
                                        <div className="d-flex">
                                            {selectionType === "edit" && showLoaderUpload && !(fileForThumbNail.includes("https") === true) ? <img src={loaderImag} alt='' className='loaderIconCss imgPreview mb-2' width="100px" height="100%" />
                                                : ""
                                            }
                                            {selectionType === "edit" && !showLoaderUpload && (fileForThumbNail.includes("https") === true) ?
                                                <img className={fileForThumbNail === "" ? "mb-2 " : "imgPreview mb-2"} src={fileForThumbNail} width="100px" height="100%" /> : ""
                                            }
                                            {selectionType !== "edit" && showLoaderUpload && !(fileForThumbNail.includes("https") === true) ? <img src={loaderImag} alt='' className='loaderIconCss imgPreview mb-2' width="100px" height="100%" />
                                                : ""
                                            }

                                            {selectionType !== "edit" && !showLoaderUpload && (fileForThumbNail.includes("https") === true) ?
                                                <img className={fileForThumbNail === "" ? "mb-2 " : "imgPreview mb-2"} src={fileForThumbNail} width="100px" height="100%" /> : ""
                                            }
                                            {fileForThumbNail == "" && !showLoaderUpload ?
                                                <div>
                                                    <UploadFileComponent
                                                        filePath={`contents/${selectedCategory.label}`}
                                                        fileForThumbNail={fileForThumbNail}
                                                        fileNameIncludeHTTPS={fileName.includes("https")}
                                                        setFileForThumbNail={setFileForThumbNail}
                                                        setFileName={setFileName}
                                                        acceptFileType={"image/png, image/jpeg, image/svg"}
                                                        selectedOption={selectedOption}
                                                        selectedProgram={selectedProgram}
                                                        type={"blogs & articles"}
                                                        setShowLoaderUpload={setShowLoaderUpload}
                                                        setShow={setShow}
                                                    />
                                                </div>
                                                :
                                                <div className='ml-3 d-flex RemoveDiv align-items-center'>
                                                    <img className="mainIcon mr-1 " src={redCross} alt="" width="22px" height="22px" /> <p className='Remove mt-0 mb-0' onClick={handleChangeCarb}>Remove</p>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
                <CropImageModal
                    show={show}
                    setShow={setShow}
                    imgURL={fileForThumbNail}
                    setFileForThumbNail={setFileForThumbNail}
                    fileName={fileName}
                    setFileName={setFileName}
                    type={"blogs & articles"}
                    setShowLoaderUpload={setShowLoaderUpload}
                />
            </div >
        </AppContainer >
    )
}

AddBlogsArticles.modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link"],
        ["clean"],

    ],
};

AddBlogsArticles.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "list",
    "bullet",
    "list",
    "link",
    "image",
    "video",
    "code-block",
];

export default AddBlogsArticles
