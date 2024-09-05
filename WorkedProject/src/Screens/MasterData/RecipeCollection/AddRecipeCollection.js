import React, { useEffect, useState } from 'react'
import * as routes from "../../../Router/RoutesURL";
import redCross from "../../../assets/images/CommonComponent/redCross.svg"
import greenPlus from "../../../assets/images/CommonComponent/greenPlus.svg"
import Geentick from '../../../assets/images/CommonComponent/Geentick.svg';
import AppContainer from '../../../components/AppContainer/AppContainer';
import { addRecipeCollection, viewEditRecipeCollection, editRecipeCollection } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import './AddRecipeCollection.scss';

function AddRecipeCollection(props) {
    const [state, setState] = useState({
        title: "",
        description: "",
    })
    const { history } = props;
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { title, description } = state;
    const selectionType = location?.state?.selection
    const selectionTypeAfterAddOne = location?.state?.selectionType
    const collectionID = location?.state?.collectionID;
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formErrorsForEdit, setFormErrorsForEdit] = useState({});
    const [collectionName, setCollectionName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [somChange, setSomChange] = useState();
    const viewRecipeCollectionData = useSelector(state => state?.viewEditRecipeCollection?.viewEditRecipeCollection);
    const viewRecipeCollectionDataRes = viewRecipeCollectionData?.data;

    useEffect(() => {
        if (selectionType === "edit") {
            const sendRequest = {
                "collection_id": collectionID,
            };
            dispatch(viewEditRecipeCollection(sendRequest));
        }
    }, []);

    useEffect(() => {
        if (viewRecipeCollectionDataRes && selectionType === "edit") {
            setCollectionName(viewRecipeCollectionData?.data?.collection_name)
            setNewDescription(viewRecipeCollectionData?.data?.description)
        }
    }, [viewRecipeCollectionDataRes]);


    useEffect(() => {
        if (collectionName !== "" || newDescription !== "") {
            setFormErrorsForEdit(validateEdit(state));
            setIsSubmit(true);
        }
    }, [collectionName, newDescription,]);

    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
        setIsSubmit(true);
    };


    const handleSubmit = (e) => {
        if (selectionType === "edit") {
            e.preventDefault();
            setFormErrorsForEdit(validateEdit(state));
            setIsSubmit(true);
            if (Object.keys(formErrorsForEdit).length === 0 && isSubmit) {
                const sendRequest = {
                    "collection_id": collectionID,
                    "title": collectionName,
                    "description": newDescription
                };
                dispatch(editRecipeCollection(sendRequest, navigate));
            }
        }

        if (selectionType === "add") {
            e.preventDefault();
            setFormErrors(validate(state));
            setIsSubmit(true);
            if (Object.keys(formErrors).length === 0 && isSubmit) {
                const sendRequest = {
                    "title": state?.title,
                    "description": state?.description,
                };
                dispatch(addRecipeCollection(sendRequest));
                setState(state.description = "");
                setState({ ...state, "title": "" });
            }
            if (!title || !description) {
                return;
            }
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = "Title is required!";
        }
        if (!values.description) {
            errors.description = "Description is required!";
        }
        return errors;
    };

    const validateEdit = () => {
        const errorsForEdit = {};
        if (collectionName === "") {
            errorsForEdit.collectionName = "Title is required!";
        }
        if (newDescription === "") {
            errorsForEdit.newDescription = "Description is required!";
        }
        return errorsForEdit;
    };

    const goBack = (e) => {
        navigate(routes.MASTERDATA, { state: { path: "add" } })
    };

    return (
        <>
            <AppContainer history={history}>
                <div className="event-content">
                    {selectionType === "add" || selectionTypeAfterAddOne === "addRecipeWithCollection" ?
                        <>
                            <div className='AddRecipeCollection'>
                                <form className="" onSubmit={handleSubmit} >
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className='m-0 p-0'>Add Recipe Collection</h4>
                                            {title !== '' && description !== '' ? <div className=''>
                                                <button type="button" className="btn btn-danger redButton mr-3" onClick={goBack}>
                                                    <img className="mainIcon mr-1 mb-1" src={redCross} alt="" width="22px" height="22px" />
                                                    CANCEL</button>
                                                <button type="submit" className="btn btn-success greenButton ">
                                                    <img className="mainIcon mr-2 mb-1" src={greenPlus} alt="" width="16px" height="16px" />
                                                    PUBLISH</button>
                                            </div> : ""}
                                        </div>
                                        <div className="separator"></div>
                                        <div className="card-body p-4">
                                            <div className='row cardDiv'>
                                                <div className='col'>
                                                    <div className='d-flex'>
                                                        <div className="mb-3 pr-0 TitleDiv">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Title</label>
                                                            <input type="text"
                                                                className="form-control Title"
                                                                id="exampleFormControlInput1"
                                                                placeholder="Enter first name"
                                                                value={title}
                                                                name='title'
                                                                onChange={handleChange}
                                                            />
                                                            <div id='emailError' className='small'>{formErrors.title}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 DescDiv">
                                                        <label htmlFor="exampleFormControlTextarea1" className="form-label Label" >Description</label>
                                                        <textarea className="form-control textArea"
                                                            id="exampleFormControlTextarea1"
                                                            rows="3"
                                                            name='description'
                                                            placeholder="Enter description"
                                                            value={description}
                                                            onChange={handleChange} >
                                                        </textarea>
                                                        <div id='emailError' className='small'>{formErrors.description}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                        :
                        <>
                            <div className='AddRecipeCollection'>
                                <form className="" onSubmit={handleSubmit} >
                                    <div className="card">
                                        <div className="card-header">
                                            <h4 className='m-0 p-0'>Edit Recipe Collection</h4>
                                            {somChange == true && collectionName !== "" && newDescription !== "" ? <div className=''>
                                                <button type="button" className="btn btn-danger redButton mr-3" onClick={goBack}>
                                                    <img className="mainIcon mr-1 mb-1" src={redCross} alt="" width="22px" height="22px" />
                                                    CANCEL</button>
                                                <button type="submit" className="btn btn-success greenButton ">
                                                    <img className="mainIcon mr-2 mb-1" src={Geentick} alt="" width="16px" height="16px" />
                                                    UPDATE</button>
                                            </div> : ""}
                                        </div>
                                        <div className="separator"></div>
                                        <div className="card-body p-4">
                                            <div className='row cardDiv'>
                                                <div className='col'>
                                                    <div className='d-flex'>
                                                        <div className="mb-3 pr-0 TitleDiv">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label Label">Title</label>
                                                            <input type="text"
                                                                className="form-control Title"
                                                                id="exampleFormControlInput1"
                                                                placeholder="Enter first name"
                                                                value={collectionName}
                                                                name='title'
                                                                onChange={(e) => { setCollectionName(e.target.value); setSomChange(true); }}
                                                            />
                                                            <div id='emailError' className='small'>{formErrorsForEdit.collectionName}</div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 DescDiv">
                                                        <label htmlFor="exampleFormControlTextarea1" className="form-label Label" >Description</label>
                                                        <textarea className="form-control textArea"
                                                            id="exampleFormControlTextarea1"
                                                            rows="3"
                                                            name='description'
                                                            placeholder="Enter description"
                                                            value={newDescription}
                                                            onChange={(e) => { setNewDescription(e.target.value); setSomChange(true); }}
                                                        >
                                                        </textarea>
                                                        <div id='emailError' className='small'>{formErrorsForEdit.newDescription}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>}
                </div>
            </AppContainer >

        </>
    )
}


export default AddRecipeCollection
