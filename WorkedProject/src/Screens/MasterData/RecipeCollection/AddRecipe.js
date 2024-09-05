import React, { useEffect, useState } from 'react'
import * as routes from "../../../Router/RoutesURL";
import * as textMessage from "../../../Config/Constant";
import redCross from "../../../assets/images/CommonComponent/redCross.svg"
import greenPlus from "../../../assets/images/CommonComponent/greenPlus.svg"
import delCriteria from "../../../assets/images/CommonComponent/trash.svg"
import AppContainer from '../../../components/AppContainer/AppContainer';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Select from "react-select";
import {
    getStorage,
    ref,
    deleteObject
} from 'firebase/storage';
import { app } from '../../../firebase';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { addRecipeCollection, addRecipe } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import { useDispatch, useSelector } from 'react-redux';
import UploadFileComponent from "../../UploadFileComponent";
import { useLocation, useNavigate } from 'react-router-dom';
import { createNotification } from '../../../Config/NotificationToast';
import { instance } from "../../../redux/auth/axiosInstance";
import './AddRecipe.scss';

const AddRecipe = (props) => {
    const [state, setState] = useState({
        title: "",
        vegNonVeg: "",
        calories: "",
        dosha: "",
        cal: "",
        protein: "",
        fat: "",
        carb: "",
        portion: "",
    })

    const { history } = props;
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { title, vegNonVeg, calories, dosha, cal, protein, fat, carb, portion } = state;
    const selectionType = location?.state?.selectionType
    const collectionID = location?.state?.recipeCollectionId;
    const recipeCollectionName = location?.state?.recipeCollectionName;
    const recipeTitle = location?.state?.title;
    const recipeDecs = location?.state?.description;
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [collectionName, setCollectionName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [min, setMin] = useState("");
    const [somChange, setSomChange] = useState(false);
    const [fileName, setFileName] = useState('');
    const [file2, setFile2] = useState();
    const [showLoaderUpload, setShowLoaderUpload] = useState(false);
    const [fileForThumbNail, setFileForThumbNail] = useState("")
    const [preparations, setPreparations] = useState([{ title: '', value: [{ key: '', value: '' }] }]);
    const viewRecipeCollectionData = useSelector(state => state?.viewEditRecipeCollection?.viewEditRecipeCollection);
    const viewRecipeCollectionDataRes = viewRecipeCollectionData?.data;
    const uploadFileResData = useSelector(state => state?.uploadFile);


    useEffect(() => {
        if (viewRecipeCollectionDataRes && selectionType === "edit") {
            setCollectionName(viewRecipeCollectionData?.data?.collection_name)
            setNewDescription(viewRecipeCollectionData?.data?.description)
        }
    }, [viewRecipeCollectionDataRes]);

    const options = [
        { value: 5, label: '5' },
        { value: 10, label: '10' },
        { value: 15, label: '15' },
        { value: 20, label: '20' },
        { value: 25, label: '25' },
        { value: 30, label: '30' },
        { value: 35, label: '35' },
        { value: 45, label: '45' },
        { value: 50, label: '50' },
        { value: 55, label: '55' },
        { value: 60, label: '60' },
    ];

    const handleChangeOption = (e) => {
        setMin(e)
    }

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        setIsSubmit(true);
    };

    const handleSubmit = (e) => {
        setIsSubmit(true);
        e.preventDefault();

        if (state.title !== "" || state.vegNonVeg !== "" || state.calories !== "" || state.dosha !== "" || state.cal !== "" || state.protein !== "" || state.fat !== "" || state.portion !== "" || min !== "") {
            setFormErrors(validate(state));
        }

        if (selectionType === "addRecipeWithCollection") {
            e.preventDefault();
            setFormErrors(validate(state));
            setIsSubmit(true);
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                const sendRequest = {
                    "title": recipeTitle,
                    "description": recipeDecs,
                    "add_recipe": [{
                        "recipe_title": state.title,
                        "media_thumbnail": fileName,
                        "veg_nonveg": state.vegNonVeg,
                        "minutes": min.value,
                        "calories": Number(state.calories),
                        "dosha": state.dosha,
                        "portion_size": state.portion,
                        "ingredients": JSON.stringify(preparations),
                        "nutritions": JSON.stringify({ "cal": state.cal, "protein": state.protein, "fat": state.fat, "carb": state.carb })
                    }]
                };
                dispatch(addRecipeCollection(sendRequest));
                navigate(routes.ADD_RECIPE_COLLECTION, { state: { selectionType: "addRecipeWithCollection" } })
            }
            if (!title || !vegNonVeg || !calories || !dosha || !cal || !protein || !fat || !portion) {
                return;
            }
        }

        if (selectionType === "add") {
            e.preventDefault();
            setFormErrors(validate(state));
            setIsSubmit(true);
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                const sendRequest = {
                    "collection_id": collectionID,
                    "recipe_title": state.title,
                    "media_thumbnail": fileName,
                    "veg_nonveg": state.vegNonVeg,
                    "minutes": min.value,
                    "calories": Number(state.calories),
                    "dosha": state.dosha,
                    "portion_size": state.portion,
                    "ingredients": preparations,
                    "nutritions": { "cal": state.cal, "protein": state.protein, "fat": state.fat, "carb": state.carb },
                };
                dispatch(addRecipe(sendRequest));


                setState(state.title = "");
                setState(state.vegNonVeg = "");
                setState(state.calories = "");
                setState(state.dosha = "");
                setState(state.cal = "");
                setState(state.protein = "");
                setState(state.fat = "");
                setState(state.carb = "");
                setState(state.portion = "");
                setFileForThumbNail("")

                setMin("")
                setState({ ...state, "title": "" });
                setState({ ...state, "vegNonVeg": "" });
                setState({ ...state, "calories": "" });
                setState({ ...state, "dosha": "" });
                setState({ ...state, "cal": "" });
                setState({ ...state, "protein": "" });
                setState({ ...state, "fat": "" });
                setState({ ...state, "carb": "" });
                setState({ ...state, "portion": "" });
                setPreparations([{ title: '', value: [{ key: '', value: '' }] }]);

            }
            if (!title || !vegNonVeg || !calories || !dosha || !cal || !protein || !fat || !portion) {
                return;
            }
        }
    }

    const handleChangeCalories = (val) => {
        const PhoneRegex = textMessage.PHONE_REGEX;
        const nameFormat = PhoneRegex.test(val);
        if (val === "") {
            setState({ ...state, "calories": val });
        } else if (nameFormat && val.length < 12) {
            setState({ ...state, "calories": val });
        }
    }

    const handleChangeCal = (val) => {
        const PhoneRegex = textMessage.PHONE_REGEX;
        const nameFormat = PhoneRegex.test(val);
        if (val === "") {
            setState({ ...state, "cal": val });
        } else if (nameFormat && val.length < 12) {
            setState({ ...state, "cal": val });
        }
    }

    const handleChangeProtein = (val) => {
        const PhoneRegex = textMessage.PHONE_REGEX;
        const nameFormat = PhoneRegex.test(val);
        if (val === "") {
            setState({ ...state, "protein": val });
        } else if (nameFormat && val.length < 12) {
            setState({ ...state, "protein": val });
        }
    }

    const handleChangeFat = (val) => {
        const PhoneRegex = textMessage.PHONE_REGEX;
        const nameFormat = PhoneRegex.test(val);
        if (val === "") {
            setState({ ...state, "fat": val });
        } else if (nameFormat && val.length < 12) {
            setState({ ...state, "fat": val });
        }
    }

    const handleChangeCarb = (val) => {
        const PhoneRegex = textMessage.PHONE_REGEX;
        const nameFormat = PhoneRegex.test(val);
        if (val === "") {
            setState({ ...state, "carb": val });
        } else if (nameFormat && val.length < 12) {
            setState({ ...state, "carb": val });
        }
    }

    const validate = (values) => {
        const errors = {};
        const PhoneRegex = textMessage.PHONE_REGEX;
        if (!values.title) {
            errors.title = textMessage.TITLE_IS_REQUIRED;
        }
        if (!values.vegNonVeg) {
            errors.vegNonVeg = textMessage.TYPE_IS_REQUIRED;
        }
        if (!values.calories) {
            errors.calories = textMessage.CALORIES_IS_REQUIRED;
        } else if (!PhoneRegex.test(values.calories)) {
            errors.calories = textMessage.ENTER_CALORIES_IN_NUMBER;
        }
        if (!values.dosha) {
            errors.dosha = textMessage.DOSHA_IS_REQUIRED;
        }
        if (!values.cal) {
            errors.cal = textMessage.CAL_IS_REQUIRED;
        }
        if (!values.protein) {
            errors.protein = textMessage.PROTEIN_IS_REQUIRED;
        }
        if (!values.fat) {
            errors.fat = textMessage.FAT_IS_REQUIRED;
        }
        if (!values.portion) {
            errors.portion = textMessage.PORTION_IS_REQUIRED;
        }
        if (!min) {
            errors.min = textMessage.MINUTES_IS_REQUIRED;
        }
        return errors;
    };

    const goBack = (e) => {
        if (selectionType == "addRecipeWithCollection") {

            navigate(-1)
        }
        else {
            navigate(-1)

        }
    };

    const handleAddPreparation = () => {
        setPreparations([...preparations, { title: '', value: [{ key: '', value: '' }] }]);
    };

    const handleDeletePreparation = (e, preparationIndex) => {
        var dltdprep = [...preparations]
        dltdprep.splice(preparationIndex, 1)
        setPreparations(dltdprep)
    };

    const handleDeleteItem = (e, preparationIndex, itemIndex) => {
        const dltdItem = [...preparations];
        const indEX = itemIndex
        dltdItem[preparationIndex].value.splice(itemIndex, 1)
        setPreparations(dltdItem)

    };

    const handleAddItem = (preparationIndex) => {
        const preparationCopy = [...preparations];
        preparationCopy[preparationIndex].value.push({ key: '', value: '' });
        setPreparations(preparationCopy);
    };

    const handleTitleChange = (e, preparationIndex) => {
        const preparationCopy = [...preparations];
        preparationCopy[preparationIndex].title = e.target.value;
        setPreparations(preparationCopy);

    };

    const handleItemChange = (e, preparationIndex, itemIndex, field) => {
        const preparationCopy = [...preparations];
        preparationCopy[preparationIndex].value[itemIndex][field] = e.target.value;
        setPreparations(preparationCopy);
    };


    const handleFileChange = (e) => {

        setFileForThumbNail(URL.createObjectURL(e.target.files[0]))
        setFile2(e.target.files[0]);
    }

    const handleSubmit2 = (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('UserData'));

        const formData = new FormData();
        formData.append('file', e.target.files[0]);

        instance.put(`https://dev-api-wa62jalpha-el.a.run.app/api/upload/file/recipe/${recipeCollectionName}`, formData, {
        })
            .then(res => {
                createNotification('success', "File upload successfully");
                res?.statusCode == 200 ? setFileName(res?.data[0]?.file_name) : console.log(res)
            })
            .catch(err => {
                console.error(err)
            });

    }

    const handleDeleteFile = () => {
        const storage = getStorage(app);
        const fileRef = ref(storage, fileName);
        setShowLoaderUpload(false);
        deleteObject(fileRef)
          .then(() => {
            setFileName("");
            setFileForThumbNail("");
            createNotification('success', "File deleted successfully");
          })
          .catch((error) => {
            createNotification('error', "Error in deleting file");
          });
    }

    return (
        <>
            <AppContainer history={history}>
                <div className="event-content">

                    <>
                        <div className='AddRecipe'>
                            <form className="" onSubmit={handleSubmit} >
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="p-0 mb-0">
                                            <span className='recipeTitle p-0 m-0'> Add Recipe</span>
                                            <span className='recipeDecs p-0 m-0'> - {recipeCollectionName || recipeTitle}</span> </h4>
                                        {state.title !== "" && state.vegNonVeg !== "" && state.calories !== "" && state.dosha !== "" && state.cal !== "" && state.protein !== "" && state.fat !== "" && state.portion !== "" && min !== "" && preparations[0].title !== "" && preparations[0].value[0].key !== "" ? <div className=''>
                                            <button type="button" className="btn btn-danger redButton mr-3" onClick={goBack}>
                                                <img className="mainIcon mr-1 mb-1" src={redCross} alt="" width="22px" height="22px" />
                                                CANCEL</button>
                                            <button type="submit" className="btn btn-success greenButton ">
                                                <img className="mainIcon mr-2 mb-1" src={greenPlus} alt="" width="16px" height="16px" />
                                                ADD</button>
                                        </div> : ""}
                                    </div>
                                    <div className="separator"></div>
                                    <div className="card-body p-4">
                                        <div className='row cardDiv'>
                                            <div className='row d-flex'>
                                                <div className='col-6 col-sm-6 col-md-6 col-lg-8 col-xl-9 col-xxl-8 pr-0'>
                                                    <div className='d-flex'>
                                                        <div className='d-flex'>
                                                            <div className="">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Recipe Title</label>
                                                                <input
                                                                    placeholder="Enter recipe title"
                                                                    className="form-control Title"
                                                                    type="text"
                                                                    value={title}
                                                                    name='title'
                                                                    onChange={handleChange}
                                                                />
                                                                <div id='emailError' className='small'>{formErrors.title}</div>
                                                            </div>
                                                            <div className="mb-3 d-flex ml-4">
                                                                <div className='mb-2 d-flex'>
                                                                    <FormControl>
                                                                        <label htmlFor="exampleFormControlInput1" className="form-label Label">Type</label>
                                                                        <RadioGroup
                                                                            sx={{ display: 'flow-root' }}
                                                                            className="mt-1"
                                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                                            name="radio-buttons-group" onChange={handleChange}>
                                                                            <FormControlLabel
                                                                                checked={state.vegNonVeg === "veg"}
                                                                                value="veg" name="vegNonVeg" className="mr-4" control={<Radio />} label="Veg" />
                                                                            <FormControlLabel checked={state.vegNonVeg === "nonveg"} value="nonveg" name="vegNonVeg" control={<Radio />} label="Non Veg" />
                                                                        </RadioGroup>
                                                                        <div id='emailError' className='small'>{formErrors.vegNonVeg}</div>
                                                                    </FormControl>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className="">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Total Minutes</label>
                                                            <Select
                                                                placeholder="Active"
                                                                className="react-select-total-min"
                                                                classNamePrefix="react-select"
                                                                onChange={handleChangeOption}
                                                                value={min}
                                                                options={options}
                                                                theme={(theme) => ({
                                                                    ...theme,
                                                                    colors: {
                                                                        ...theme.colors,
                                                                        primary25: '#F5F5F5',
                                                                        primary: '#74613C',
                                                                    },
                                                                })}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.min}</div>
                                                        </div>
                                                        <div className="">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label caloriesLabel">Calories</label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Calories"
                                                                type="text"
                                                                autocomplete="off"
                                                                name='calories'
                                                                value={calories}

                                                                onChange={(event) => handleChangeCalories(event.target.value)}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.calories}</div>
                                                        </div>
                                                        <div className="mb-3 d-flex ml-4">
                                                            <div className='mb-2 d-flex'>
                                                                <FormControl>
                                                                    <label htmlFor="exampleFormControlInput1" className="form-label Label">Dosha</label>
                                                                    <FormGroup sx={{ display: 'flow-root', }} className="mt-1" onChange={handleChange}>
                                                                        <FormControlLabel checked={state.dosha === "Pitta"} control={<Checkbox />} name='dosha' label="Pitta" value="Pitta" />
                                                                        <FormControlLabel checked={state.dosha === "Vatta"} control={<Checkbox />} name='dosha' label="Vatta" value="Vatta" />
                                                                        <FormControlLabel checked={state.dosha === "Kapha"} control={<Checkbox />} name='dosha' label="Kapha" value="Kapha" />
                                                                    </FormGroup>
                                                                    <div id='emailError' className='small'>{formErrors.dosha}</div>
                                                                </FormControl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <label htmlFor="exampleFormControlInput1" className="form-label Label">Nutrition Per Serving</label>
                                                    <div className='d-flex mb-3'>
                                                        <div className="">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label TitleForNutrition">Cal<small className='nutritionProperty'> (In kcal)</small></label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Nutrition"
                                                                type="text"
                                                                name='cal'
                                                                autocomplete="off"
                                                                value={cal}

                                                                onChange={(event) => handleChangeCal(event.target.value)}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.cal}</div>
                                                        </div>
                                                        <div className=" ProteinDiv" >
                                                            <label htmlFor="exampleFormControlInput1" className="form-label TitleForNutrition">Protein<small className='nutritionProperty'> (In %)</small></label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Nutrition"
                                                                type="text"
                                                                name='protein'
                                                                autocomplete="off"
                                                                value={protein}

                                                                onChange={(event) => handleChangeProtein(event.target.value)}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.protein}</div>
                                                        </div>
                                                        <div className="ProteinDiv">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label TitleForNutrition">Fat<small className='nutritionProperty'> (In %)</small></label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Nutrition"
                                                                type="text"
                                                                name='fat'
                                                                autocomplete="off"
                                                                value={fat}

                                                                onChange={(event) => handleChangeFat(event.target.value)}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.fat}</div>
                                                        </div>
                                                        <div className="ProteinDiv" >
                                                            <label htmlFor="exampleFormControlInput1" className="form-label TitleForNutrition">Carb<small className='nutritionProperty'> (In %)</small></label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Nutrition"
                                                                type="text"
                                                                name='carb'
                                                                autocomplete="off"
                                                                value={carb}

                                                                onChange={(event) => handleChangeCarb(event.target.value)}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.carb}</div>
                                                        </div>
                                                    </div>
                                                    <div className='mb-2'>
                                                        <FormControl>
                                                            <RadioGroup sx={{ display: 'flow-root', }} className="mt-2" aria-labelledby="demo-radio-buttons-group-label"

                                                                name="radio-buttons-group" onChange={handleChange}>
                                                                <label htmlFor="exampleFormControlInput1" className="form-label Label mr-3">Portion Size</label>
                                                                <FormControlLabel checked={state.portion === "1"} value="1" name="portion" className="mr-3" control={<Radio />} label="1" />
                                                                <FormControlLabel checked={state.portion === "2"} value="2" name="portion" control={<Radio />} label="2" />
                                                                <FormControlLabel checked={state.portion === "3"} value="3" name="portion" className="mr-3" control={<Radio />} label="3" />
                                                                <FormControlLabel checked={state.portion === "4"} value="4" name="portion" control={<Radio />} label="4" />
                                                                <FormControlLabel checked={state.portion === "5"} value="5" name="portion" className="mr-3" control={<Radio />} label="5" />
                                                                <FormControlLabel checked={state.portion === "6"} value="6" name="portion" control={<Radio />} label="6" />
                                                                <FormControlLabel checked={state.portion === "7"} value="7" name="portion" className="mr-3" control={<Radio />} label="7" />
                                                                <FormControlLabel checked={state.portion === "8"} value="8" name="portion" control={<Radio />} label="8" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <div id='emailError' className='small'>{formErrors.portion}</div>
                                                    </div>
                                                </div>
                                                <div className='col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-4 pr-0 pl-0'>
                                                    <label htmlFor="exampleFormControlTextarea1" className="form-label Label" >Add Cover Image</label>
                                                    {fileForThumbNail == "" ? "" :
                                                        <img className={fileForThumbNail == "" ? "mb-2 " : "mainIcon mb-2"} src={fileForThumbNail} alt="" width="80%" height="120spx" />
                                                    }
                                                    <div className='' >
                                                        { fileForThumbNail ===""? <div>
                                                            <UploadFileComponent
                                                                filePath={`recipes/${recipeCollectionName}`}
                                                                setFileForThumbNail={setFileForThumbNail}
                                                                setFileName={setFileName}
                                                                setSomChange={setSomChange}
                                                                acceptFileType={"image/png, image/jpeg, image/svg"}
                                                                selectedOption={{ label: "" }}
                                                                selectedProgram={{ label: "" }}
                                                                type={"recipe"}
                                                                setShowLoaderUpload={setShowLoaderUpload} />
                                                        </div>:
                                                <div className='ml-3 d-flex RemoveDiv align-items-center'>
                                                    <img className="mainIcon mr-1 " src={redCross} alt="" width="22px" height="22px" /> <p className='Remove mt-0 mb-0' onClick={handleDeleteFile}>Remove</p>
                                                </div>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex '>
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Ingredients</label>
                                                <label className="rationalSubTitle" onClick={handleAddPreparation}><span className='preparationBtn' >+</span> Preparation</label>
                                            </div>

                                            <div className='rationalInputBox d-flex'>
                                                {preparations?.map((preparation, preparationIndex) => (
                                                    <div className="" key={preparationIndex}>
                                                        <div className=" rationalInputTextDiv">
                                                            <div className='d-flex align-items-center'>
                                                                <input
                                                                    name="message"
                                                                    type="text"
                                                                    autocomplete="off"
                                                                    className="form-control rationalInputTexts"
                                                                    value={preparation.title}
                                                                    onChange={(e) => handleTitleChange(e, preparationIndex)}
                                                                    placeholder="Preparation title"
                                                                />
                                                                {preparations.length > 1 && <img className="mainIcon ml-2" onClick={(e) => handleDeletePreparation(e, preparationIndex)} src={delCriteria} alt="" width="14px" height="16px" />}
                                                            </div>
                                                            <div className='mt-2 ItemQtyTitle'>
                                                                <span className='innerItemQtyDiv'> Item</span> <span> Quantity</span>
                                                            </div>
                                                            {preparation?.value?.map((item, itemIndex) => (
                                                                <div className="rationalInputTextsDiv d-flex align-items-center" key={itemIndex}>
                                                                    <div className="CombineDiv d-flex align-items-center mt-1 mb-2">
                                                                        <div className="ItemDiv">
                                                                            <input
                                                                                name="key"
                                                                                type="text"
                                                                                autocomplete="off"
                                                                                className="form-control ItemTexts"
                                                                                value={item.key}
                                                                                onChange={(e) => handleItemChange(e, preparationIndex, itemIndex, 'key')}
                                                                                placeholder="Item"
                                                                            />
                                                                        </div>
                                                                        <div className="QtyDiv">
                                                                            <input
                                                                                name="value"
                                                                                type="text"
                                                                                autocomplete="off"
                                                                                className="form-control QtyTexts"
                                                                                value={item.value}
                                                                                onChange={(e) => handleItemChange(e, preparationIndex, itemIndex, 'value')}
                                                                                placeholder="Enter quantity"
                                                                            />
                                                                        </div>
                                                                        {preparation?.value?.length > 1 && <img className="mainIcon ml-2" onClick={(e) => handleDeleteItem(e, preparationIndex, itemIndex)} src={delCriteria} alt="" width="14px" height="16px" />}
                                                                    </div>
                                                                </div>
                                                            ))}

                                                            <label className="rationalItembtn align-items-center" onClick={() => handleAddItem(preparationIndex)}>
                                                                <span className='plusIcon'>+</span> <span className='mb-1'>Item</span></label>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div >
                            </form >
                        </div >
                    </>
                </div >
            </AppContainer >

        </>
    )
}
export default AddRecipe
