import React, { useEffect, useState } from 'react'
import redCross from "../../../assets/images/CommonComponent/redCross.svg"
import greenPlus from "../../../assets/images/CommonComponent/greenPlus.svg"
import delCriteria from "../../../assets/images/CommonComponent/trash.svg"
import * as textMessage from "../../../Config/Constant";
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
import UploadFileComponent from "../../UploadFileComponent";
import { editRecipe } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { viewRecipe } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import { createNotification } from '../../../Config/NotificationToast';
import { instance } from "../../../redux/auth/axiosInstance";
import './EditRecipe.scss';

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
    const { recipeId, recipeCollectionName, selectionType } = location?.state;
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [somChange, setSomChange] = useState(false);
    const [showLoaderUpload, setShowLoaderUpload] = useState(false);
    const [recipeTitle, setRecipeTitle] = useState('');
    const [mediaThumnail, setMediaThumnail] = useState('');
    const [veganType, setVeganType] = useState('');
    const [newCalories, setNewCalories] = useState('');
    const [newDosha, setNewDosha] = useState('');
    const [newCal, setNewcal] = useState('');
    const [newProtien, setNewProtien] = useState('');
    const [newFat, setNewFat] = useState('');
    const [newCarb, setNewCarb] = useState('');
    const [newMinutes, setNewMinutes] = useState('');
    const [newPortion, setNewPortion] = useState('');
    const [titlee, settitlee] = useState()
    const [item, setItem] = useState()
    const [file2, setFile2] = useState();
    const [fileForThumbNail, setFileForThumbNail] = useState("")
    const [fileName, setFileName] = useState('');
    const [viewRecipeDataRes, SetViewRecipeDataRes] = useState();
    const [newPreparations, setNewPreparations] = useState([]);

    const viewRecipeData = useSelector(state => state?.viewRecipe?.viewRecipe);

    useEffect(() => {
        SetViewRecipeDataRes(viewRecipeData)
        if (viewRecipeDataRes && viewRecipeData && viewRecipeDataRes?.data) {
            setTimeout(() => {
                setRecipeTitle(viewRecipeDataRes?.data?.getRecipeDetail?.recipe_title)
                setVeganType(viewRecipeDataRes?.data?.getRecipeDetail?.veg_nonveg)
                setMediaThumnail(viewRecipeDataRes?.data?.getRecipeDetail?.media_thumbnail)
                setNewCalories(viewRecipeDataRes?.data?.getRecipeDetail?.calories)
                setNewMinutes(viewRecipeDataRes?.data?.getRecipeDetail?.minutes)
                setNewPortion(viewRecipeDataRes?.data?.getRecipeDetail?.portion_size)
                setNewDosha(viewRecipeDataRes?.data?.getRecipeDetail?.dosha)
                setNewcal((JSON.parse(viewRecipeDataRes?.data?.getRecipeDetail?.nutritions)?.cal))
                setNewProtien((JSON.parse(viewRecipeDataRes?.data?.getRecipeDetail?.nutritions)?.protein))
                setNewFat((JSON.parse(viewRecipeDataRes?.data?.getRecipeDetail?.nutritions)?.fat))
                setNewCarb((JSON.parse(viewRecipeDataRes?.data?.getRecipeDetail?.nutritions)?.carb))
                setNewPreparations((JSON.parse(viewRecipeDataRes?.data?.getRecipeDetail?.ingredients)))

            }, 100);
        }
    }, [viewRecipeDataRes, viewRecipeData]);

    useEffect(() => {
        const sendRequest = {
            "recipe_id": recipeId
        };
        dispatch(viewRecipe(sendRequest));
    }, []);

    useEffect(() => {
        const sendRequest = {
            "recipe_id": recipeId
        };
        dispatch(viewRecipe(sendRequest));
    }, [fileName]);

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

    useEffect(() => {
        if (recipeTitle !== "" || veganType !== "" || newCalories !== "" || newDosha !== "" || newCal !== "" || newProtien !== "" || newFat !== "" || newCarb !== "" || newMinutes !== "" || newPortion !== "") {
            setFormErrors(validate(state));
            setIsSubmit(true);
        }
    }, [recipeTitle, veganType, newCalories, newDosha, newCal, newProtien, newFat, newCarb, newMinutes, newPortion]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormErrors(validate(state));
        // const mediUrlArr = mediaThumnail?.split("/")
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            const sendRequest = {
                "recipe_id": recipeId,
                "recipe_title": recipeTitle,
                "media_thumbnail": fileName ? fileName : decodeURIComponent(mediaThumnail.substring(mediaThumnail.indexOf('o/') + 2, mediaThumnail.indexOf('?'))),
                "veg_nonveg": veganType,
                "minutes": newMinutes,
                "calories": Number(newCalories),
                "dosha": newDosha,
                "portion_size": newPortion,
                "ingredients": newPreparations,
                "nutritions": { "cal": newCal, "protein": newProtien, "fat": newFat, "carb": newCarb },
            };
            dispatch(editRecipe(sendRequest));
            navigate(-1)

        }
        if (!recipeTitle || !veganType || !newCalories || !newDosha || !newProtien || !newCal || !newFat || !newCarb || !newMinutes || !newPortion) {
            return;
        }

    }

    const validate = () => {
        const errors = {};
        if (!recipeTitle) {
            errors.recipeTitle = textMessage.TITLE_IS_REQUIRED;
        }
        if (!veganType) {
            errors.veganType = textMessage.TYPE_IS_REQUIRED;
        }
        if (!newCalories) {
            errors.newCalories = textMessage.CALORIES_IS_REQUIRED;
        }
        if (!newDosha) {
            errors.newDosha = textMessage.DOSHA_IS_REQUIRED;
        }
        if (!newCal) {
            errors.newCal = textMessage.CAL_IS_REQUIRED;
        }
        if (!newProtien) {
            errors.newProtien = textMessage.PROTEIN_IS_REQUIRED;
        }
        if (!newFat) {
            errors.newFat = textMessage.FAT_IS_REQUIRED;
        }
        if (!newCarb) {
            errors.newCarb = textMessage.CARB_IS_REQUIRED;
        }
        if (!newMinutes) {
            errors.newMinutes = textMessage.MINUTES_IS_REQUIRED;
        }
        if (!newPortion) {
            errors.newPortion = textMessage.PORTION_IS_REQUIRED;
        }
        return errors;
    };


    const goBack = (e) => {
        if (selectionType == "FromViewRecipe") {
            navigate(-1)
        }
        else {
            navigate(-1)
        }
    };


    const handleAddPreparation = () => {
        setNewPreparations([...newPreparations, { title: '', value: [{ key: '', value: '' }] }]);
    };

    const handleAddItem = (preparationIndex) => {
        const preparationCopy = [...newPreparations];
        preparationCopy[preparationIndex].value.push({ key: '', value: '' });
        setNewPreparations(preparationCopy);
    };


    const handlePreprationChange = (e, preparationIndex) => {
        newPreparations[preparationIndex].title = e.target.value;
        settitlee(e.target.value)
    }
    const newFuncItem = (e, preparationIndex, itemIndex, field) => {
        newPreparations[preparationIndex].value[itemIndex][field] = e.target.value;
        setItem(e.target.value)
    }

    const handleDeletePreparation = (e, preparationIndex) => {
        var dltdprep = [...newPreparations]
        dltdprep.splice(preparationIndex, 1)
        setNewPreparations(dltdprep)
        setSomChange(true)
    };

    const handleDeleteItem = (e, preparationIndex, itemIndex) => {
        const dltdItem = [...newPreparations];
        const indEX = itemIndex
        dltdItem[preparationIndex].value.splice(itemIndex, 1)
        setNewPreparations(dltdItem)
        setSomChange(true)
    };

    const handleFileChange = (e) => {
        setSomChange(true)
        setFileForThumbNail(URL.createObjectURL(e.target.files[0]))
        setFile2(e.target.files[0]);
        handleSubmit2(e)
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
            .catch(err => console.error(err));
    }
    const handleChangeCarb = () => {
        const storage = getStorage(app);
        let fileNameVideo;
        if (mediaThumnail !== "" && fileForThumbNail === "") {
            fileNameVideo = decodeURIComponent(mediaThumnail.substring(mediaThumnail.indexOf('o/') + 2, mediaThumnail.indexOf('?')));
        } else {
            fileNameVideo = fileName;
        }
        const fileRef = ref(storage, fileNameVideo);
        setShowLoaderUpload(false);
        deleteObject(fileRef)
            .then(() => {
                setFileName("");
                setMediaThumnail("");
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
                                        <h4 className="p-0 m-0">
                                            <span className='recipeTitle'> Edit Recipe</span>
                                            <span className='recipeDecs'>- {recipeCollectionName}
                                            </span>
                                        </h4>
                                        {somChange === true ? <div className=''>
                                            <button type="button" className="btn btn-danger redButton mr-3" onClick={goBack}>
                                                <img className="mainIcon mr-1 mb-1" src={redCross} alt="" width="22px" height="22px" />
                                                CANCEL</button>
                                            <button type="submit" className="btn btn-success greenButton ">
                                                <img className="mainIcon mr-2 mb-1" src={greenPlus} alt="" width="16px" height="16px" />
                                                UPDATE</button>
                                        </div> : ""}
                                    </div>
                                    <div className="separator"></div>
                                    <div className="card-body p-4">
                                        <div className='row cardDiv'>
                                            <div className='row d-flex'>
                                                <div className='col-6 col-sm-6 col-md-6 col-lg-7 col-xl-8 col-xxl-8 pr-0'>
                                                    <div className='d-flex'>
                                                        <div className='d-flex'>
                                                            <div className="">
                                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Recipe Title</label>
                                                                <input
                                                                    placeholder="Enter recipe title"
                                                                    className="form-control Title"
                                                                    type="text"
                                                                    value={recipeTitle}
                                                                    name='title'
                                                                    onChange={(e) => { setRecipeTitle(e.target.value); setIsSubmit(true); setSomChange(true) }}
                                                                />
                                                                <div id='emailError' className='small'>{formErrors.recipeTitle}</div>
                                                            </div>
                                                            <div className="mb-3 d-flex ml-4">
                                                                <div className='mb-2 d-flex'>
                                                                    <FormControl>
                                                                        <label htmlFor="exampleFormControlInput1" className="form-label Label">Type</label>
                                                                        <RadioGroup sx={{ display: 'flow-root', }} className="mt-1" aria-labelledby="demo-radio-buttons-group-label"
                                                                            defaultValue={veganType === "Veg" ? "Veg" : "Non Veg"}
                                                                            name="radio-buttons-group"
                                                                            onChange={(e) => { setVeganType(e.target.value); setIsSubmit(true); setSomChange(true) }}>
                                                                            <FormControlLabel value="Veg" name="vegNonVeg" className="mr-4" control={<Radio />} label="Veg" />
                                                                            <FormControlLabel value="Non Veg" name="vegNonVeg" control={<Radio />} label="Non Veg" />
                                                                        </RadioGroup>
                                                                        <div id='emailError' className='small'>{formErrors.veganType}</div>
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
                                                                onChange={(e) => {
                                                                    setNewMinutes(e.value); setIsSubmit(true); setSomChange(true)
                                                                }}
                                                                value={{ label: newMinutes, value: newMinutes }}
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
                                                                name='calories'
                                                                autocomplete="off"
                                                                value={newCalories}
                                                                onChange={(e) => { setNewCalories(e.target.value); setIsSubmit(true); setSomChange(true) }}

                                                            />
                                                            <div id='emailError' className='small'>{formErrors.newCalories}</div>
                                                        </div>
                                                        <div className="mb-3 d-flex ml-4">
                                                            <div className='mb-2 d-flex'>
                                                                <FormControl>
                                                                    <label htmlFor="exampleFormControlInput1" className="form-label Label">Dosha</label>
                                                                    <FormGroup sx={{ display: 'flow-root', }} className="mt-1"
                                                                        onChange={(e) => { setNewDosha(e.target.value); setIsSubmit(true); setSomChange(true) }}>
                                                                        <FormControlLabel checked={newDosha == "Pitta"} control={<Checkbox />} name='dosha' label="Pitta" value="Pitta" />
                                                                        <FormControlLabel checked={newDosha == "Vatta"} control={<Checkbox />} name='dosha' label="Vatta" value="Vatta" />
                                                                        <FormControlLabel checked={newDosha == "Kapha"} control={<Checkbox />} name='dosha' label="Kapha" value="Kapha" />
                                                                    </FormGroup>
                                                                    <div id='emailError' className='small'>{formErrors.newDosha}</div>
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
                                                                value={newCal}
                                                                onChange={(e) => { setNewcal(e.target.value); setIsSubmit(true); setSomChange(true) }}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.newCal}</div>
                                                        </div>
                                                        <div className="ProteinDiv" >
                                                            <label htmlFor="exampleFormControlInput1" className="form-label TitleForNutrition">Protein<small className='nutritionProperty'> (In %)</small></label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Nutrition"
                                                                type="text"
                                                                name='protein'
                                                                autocomplete="off"
                                                                value={newProtien}
                                                                onChange={(e) => { setNewProtien(e.target.value); setIsSubmit(true); setSomChange(true) }}

                                                            />
                                                            <div id='emailError' className='small'>{formErrors.newProtien}</div>
                                                        </div>
                                                        <div className="ProteinDiv" >
                                                            <label htmlFor="exampleFormControlInput1" className="form-label TitleForNutrition">Fat<small className='nutritionProperty'> (In %)</small></label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Nutrition"
                                                                type="text"
                                                                name='fat'
                                                                autocomplete="off"
                                                                value={newFat}
                                                                onChange={(e) => { setNewFat(e.target.value); setIsSubmit(true); setSomChange(true) }}

                                                            />
                                                            <div id='emailError' className='small'>{formErrors.newFat}</div>
                                                        </div>
                                                        <div className="ProteinDiv" >
                                                            <label htmlFor="exampleFormControlInput1" className="form-label TitleForNutrition">Carb<small className='nutritionProperty'> (In %)</small></label>
                                                            <input
                                                                placeholder="Enter count"
                                                                className="form-control Nutrition"
                                                                type="text"
                                                                name='carb'
                                                                autocomplete="off"
                                                                value={newCarb}
                                                                onChange={(e) => { setNewCarb(e.target.value); setIsSubmit(true); setSomChange(true) }}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.newCarb}</div>
                                                        </div>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <FormControl>
                                                            <RadioGroup sx={{ display: 'flow-root', }} className="mt-2" aria-labelledby="demo-radio-buttons-group-label"
                                                                name="radio-buttons-group"
                                                                onChange={(e) => { setNewPortion(e.target.value); setIsSubmit(true); setSomChange(true) }}>
                                                                <label htmlFor="exampleFormControlInput1" className="form-label Label mr-3">Portion Size</label>
                                                                <FormControlLabel checked={newPortion == 1} value="1" name="portion" className="mr-3" control={<Radio />} label="1" />
                                                                <FormControlLabel checked={newPortion == 2} value="2" name="portion" control={<Radio />} label="2" />
                                                                <FormControlLabel checked={newPortion == 3} value="3" name="portion" className="mr-3" control={<Radio />} label="3" />
                                                                <FormControlLabel checked={newPortion == 4} value="4" name="portion" control={<Radio />} label="4" />
                                                                <FormControlLabel checked={newPortion == 5} value="5" name="portion" className="mr-3" control={<Radio />} label="5" />
                                                                <FormControlLabel checked={newPortion == 6} value="6" name="portion" control={<Radio />} label="6" />
                                                                <FormControlLabel checked={newPortion == 7} value="7" name="portion" className="mr-3" control={<Radio />} label="7" />
                                                                <FormControlLabel checked={newPortion == 8} value="8" name="portion" control={<Radio />} label="8" />
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <div id='emailError' className='small'>{formErrors.newPortion}</div>
                                                    </div>
                                                </div>
                                                <div className='col-6 col-sm-6 col-md-6 col-lg-5 col-xl-4 col-xxl-4 pr-0 pl-0'>
                                                    <label htmlFor="exampleFormControlTextarea1" className="form-label Label" >Add Cover Image</label>
                                                    <div className=''>

                                                        {fileForThumbNail == "" ? <img className="mainIcon mb-2" src={mediaThumnail} alt="" width="80%" height="120spx" /> :
                                                            <img className={fileForThumbNail == "" ? "mb-2 " : "mainIcon mb-2"} src={fileForThumbNail} alt="" width="95%" height="120spx" />
                                                        }
                                                        {mediaThumnail === "" && fileForThumbNail === "" ? <div>
                                                            <UploadFileComponent
                                                                filePath={`recipes/${recipeCollectionName}`}
                                                                setFileForThumbNail={setFileForThumbNail}
                                                                setSomChange={setSomChange}
                                                                setFileName={setFileName}
                                                                setShowLoaderUpload={setShowLoaderUpload}
                                                                acceptFileType={"image/png, image/jpeg, image/svg"}
                                                                selectedOption={{ label: "" }}
                                                                selectedProgram={{ label: "" }}
                                                                type={"recipe"} />
                                                        </div> :
                                                            <div className='ml-3 d-flex RemoveDiv align-items-center'>
                                                                <img className="mainIcon mr-1 " src={redCross} alt="" width="22px" height="22px" /> <p className='Remove mt-0 mb-0' onClick={handleChangeCarb}>Remove</p>
                                                            </div>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='d-flex '>
                                                <label htmlFor="exampleFormControlInput1" className="form-label Label">Ingredients</label>
                                                <label className="rationalSubTitle" onClick={handleAddPreparation}><span className='preparationBtn' >+</span> Preparation</label>
                                            </div>

                                            <div className='rationalInputBox d-flex'>
                                                {newPreparations && newPreparations?.map((preparation, preparationIndex) => (
                                                    <div className="rationalInputBox" key={preparationIndex}>
                                                        <div className="rationalInputTextDiv">
                                                            <div className='d-flex align-items-center'>
                                                                <input
                                                                    name={preparation.title}
                                                                    type="text"
                                                                    autocomplete="off"
                                                                    className="form-control rationalInputTexts"
                                                                    value={preparation.title}
                                                                    onChange={(e) => { handlePreprationChange(e, preparationIndex); setSomChange(true) }}
                                                                    placeholder="Preparation title"
                                                                />
                                                                {newPreparations.length > 1 && <img className="mainIcon ml-2" onClick={(e) => handleDeletePreparation(e, preparationIndex)} src={delCriteria} alt="" width="14px" height="16px" />}
                                                            </div>
                                                            <div className='mt-2 ItemQtyTitle'>
                                                                <span className='innerItemQtyDiv' > Item</span> <span> Quantity</span>
                                                            </div>
                                                            {preparation?.value?.map((item, itemIndex) => (
                                                                <div className="rationalInputTextsDiv" key={itemIndex}>
                                                                    <div className="CombineDiv d-flex align-items-center mt-1 mb-2">
                                                                        <div className="ItemDiv">
                                                                            <input
                                                                                name="key"
                                                                                type="text"
                                                                                autocomplete="off"
                                                                                className="form-control ItemTexts"
                                                                                value={item.key}
                                                                                onChange={(e) => { newFuncItem(e, preparationIndex, itemIndex, 'key'); setSomChange(true) }}
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
                                                                                onChange={(e) => { newFuncItem(e, preparationIndex, itemIndex, 'value'); setSomChange(true) }}
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
                                </div>
                            </form>
                        </div>
                    </>
                </div >
            </AppContainer >

        </>
    )
}
export default AddRecipe
