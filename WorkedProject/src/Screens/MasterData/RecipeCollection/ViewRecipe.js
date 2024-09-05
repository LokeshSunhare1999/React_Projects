import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as routes from "../../../Router/RoutesURL";
import Select from "react-select";
import AppContainer from '../../../components/AppContainer/AppContainer';
import { createNotification } from '../../../Config/NotificationToast';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { viewRecipe } from '../../../redux/actions/MasterDataAction/RecipeCollection/RecipeCollectionAction';
import './ViewRecipe.scss';

const ViewRecipe = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { history } = props;
    const { recipeId, recipeCollectionName, permission } = location?.state;
    const [recipeMainData, setRecipeMainData] = useState('');
    const [recipeTitle, setRecipeTitle] = useState('');
    const [nutritionsData, setNutritionsData] = useState("");
    const [ingredientsData, setIngredientsData] = useState("");
    const [selectedStatus, setSelectedStatus] = useState();
    const viewRecipeDataRes = useSelector(state => state?.viewRecipe?.viewRecipe);
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    useEffect(() => {
        const sendRequest = {
            "recipe_id": recipeId
        };
        dispatch(viewRecipe(sendRequest));
    }, []);

    useEffect(() => {
        if (viewRecipeDataRes && viewRecipeDataRes?.data) {
            setRecipeMainData(viewRecipeDataRes && viewRecipeDataRes?.data?.getRecipeDetail);
            setRecipeTitle(viewRecipeDataRes && viewRecipeDataRes?.data?.getRecipeDetail?.recipe_title);
            setSelectedStatus(viewRecipeDataRes && viewRecipeDataRes?.data?.getRecipeDetail?.is_active);
        }
        setTimeout(() => {
            if (viewRecipeDataRes && viewRecipeDataRes?.data) {
                setNutritionsData(JSON.parse(viewRecipeDataRes?.data?.getRecipeDetail?.nutritions))
                setIngredientsData(JSON.parse(viewRecipeDataRes?.data?.getRecipeDetail?.ingredients))
            }
        }, 100);
    }, [viewRecipeDataRes])

    const handleChangeOption = (e, id) => {
        if (permission === "write") {
            setSelectedStatus(e.value === "Active" ? 1 : 0);
            if (e.value === "Active") {
                setRecipeMainData(recipeMainData.is_active = 1)
            } else {
                setRecipeMainData(recipeMainData.is_active = 0)
            }
            setRecipeMainData(recipeMainData)
            const sendRequest = {
                "feature_type": "recipe",
                "id": recipeMainData?.id,
                "status": e.value === "Active" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    const handleNavigateToEditRecipe = () => {
        if (permission === "write") {
            navigate(routes.EDIT_RECIPE, { state: { recipeId, recipeTitle, recipeCollectionName, selectionType: "FromViewRecipe" } })
        } else {
            createNotification('warning', "Access Restricted");
        }
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='ViewProgram'>
                    {<div className="card">
                        <div className="card-header">
                            <div className='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-5 col-xxl-5'>
                                <h4 className='programTitle'>{recipeMainData?.recipe_title}</h4>
                            </div>
                            <div className='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-7 col-xxl-7  d-flex RecipeHeaderFilter'>
                                <div>
                                    <button type="button" className="btn btn-secondary selButton" onClick={handleNavigateToEditRecipe}> <i className="fa fa-pen mr-2"></i>Edit</button>
                                </div>
                                <div>
                                    <Select
                                        className={recipeMainData && recipeMainData?.is_active === 1 ? "react-select" : "react-selectChange"}
                                        classNamePrefix="react-select"
                                        onChange={(e) => { handleChangeOption(e, recipeMainData.program_id) }}
                                        value={selectedStatus === 1 ? { label: "Active", value: "Active" } : { label: "Inactive", value: "Inactive" }}
                                        options={options}
                                        isSearchable={false}
                                        theme={(theme) => ({
                                            ...theme,
                                            isFocused: "#74613C",
                                            colors: {
                                                ...theme.colors,
                                                primary25: '#F5F5F5',
                                                primary: '#f6f4f0',

                                            },
                                        })}
                                        getOptionLabel={(row) => (
                                            <><span className={row.label === "Active" ? "ActiveClass" : "InactiveClass"}>
                                                {row.label}
                                            </span>
                                                {row.status === 1 && (
                                                    <div

                                                    ></div>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="separator"></div>
                        <div className="card-body">
                            <div className='CoverImageContainer d-flex'>
                                <div className='DecDiv'>
                                    <ul className="list-group FirstGroup">
                                        <li className="list-group-item">TYPE:</li>
                                        <li className="list-group-item">TOTAL MINUTES:</li>
                                        <li className="list-group-item">DOSHA:</li>
                                        <li className="list-group-item">CALORIES:</li>
                                        <li className="list-group-item">NUTRITION PER <br /> SERVING:</li>
                                    </ul>
                                    <ul className="list-group SecondGroup">
                                        <li className="list-group-item levelText">{recipeMainData?.veg_nonveg}</li>
                                        <li className="list-group-item">{recipeMainData?.minutes}</li>
                                        <li className="list-group-item">{recipeMainData?.dosha}</li>
                                        <li className="list-group-item">{recipeMainData?.calories}</li>
                                        <li className="list-group-item">Portion size: 1
                                            {nutritionsData && Object?.entries(nutritionsData)?.map(([name, value]) => (
                                                <span span className='d-flex nutrition'>
                                                    <li className="list-group-item p-0 " key={name}>
                                                        <span>{name.charAt(0).toUpperCase() + name.slice(1)}: </span>
                                                        <span>{value} {name == "cal" ? "kcal" : "%"}</span>
                                                    </li>
                                                </span>
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                                <div className='ImageDiv d-flex'>
                                    <div>COVER IMAGE: </div>
                                    {recipeMainData?.media_thumbnail &&
                                        <img className="mr-2 mb-1 ml-2 RecipeImage" src={recipeMainData?.media_thumbnail} alt="" />}
                                </div>
                            </div>
                            <div className='DecDiv'>
                                <ul className="list-group FirstGroup">
                                    <li className="list-group-item">INGREDIENTS:</li>
                                </ul>
                                <ul className="list-group LastGroup  ml-3">
                                    {viewRecipeDataRes && ingredientsData && ingredientsData?.map((ingredient, index) => (
                                        <li className="list-group mb-4" key={index}>
                                            <h6 className='pb-1 m-0 ingredientTitle' >{ingredient.title}</h6>
                                            {ingredient?.value?.map((item, index) => (
                                                <li key={index} className='d-flex'>

                                                    <div className='itemDiv'>
                                                        {item.key.split('')[0] == 0 || item.key.split('')[0] == 1 || item.key.split('')[0] == 3 || item.key.split('')[0] == 3 || item.key.split('')[0] == 4 || item.key.split('')[0] == 5 || item.key.split('')[0] == 6 || item.key.split('')[0] == 7 || item.key.split('')[0] == 8 || item.key.split('')[0] == 9 | item.key.split('')[0] == "-" ? "" : "- "}
                                                        <span>{item.key} </span>
                                                    </div>
                                                    <div>
                                                        <span>{item.value}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div >}
                </div>
            </div >
        </AppContainer >
    )
}

export default ViewRecipe
