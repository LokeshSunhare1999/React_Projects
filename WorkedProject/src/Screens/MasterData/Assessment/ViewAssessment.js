import React, { useEffect, useState } from 'react'
import Select from "react-select";
import Modal from 'react-bootstrap/Modal';
import AppContainer from '../../../components/AppContainer/AppContainer';
import { useDispatch, useSelector } from 'react-redux';
import { viewAssessment } from '../../../redux/actions/MasterDataAction/AssessmentAction/AssessmentAction';
import { useLocation } from 'react-router-dom';
import redCross from "../../../assets/images/CommonComponent/redCross.svg";
import { updateProgramRequest } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import { updateIsActiveStatus } from '../../../redux/actions/MasterDataAction/ProgramAction/programActions';
import Geentick from '../../../assets/images/CommonComponent/Geentick.svg';
import { createNotification } from '../../../Config/NotificationToast';
import BrownPlus from "../../../assets/images/CommonComponent/BrownPlus.svg";
import { getPermissionByAppName } from '../../../utils/Helper';
import Delete from "../../../assets/images/CommonComponent/trash.svg";
import './ViewAssessment.scss';

const ViewAssessment = (props) => {
    const { history } = props;
    const [viewAssessmentDataRes, setViewAssessmentDataRes] = useState('');
    const [optionsArray, setOptionsArray] = useState([]);
    const [typesArray, setTypesArray] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const AssessmentQueDataRes = useSelector(state => state?.viewAssessment);
    const AssessmentQueData = AssessmentQueDataRes?.viewAssessment?.data;
    const { selectedAssessmentId, selectSectionName, assessmentStatus, permission } = location.state;
    const [setStatus, setSetStatus] = useState(assessmentStatus);
    const options = [
        { value: '1', label: 'Active' },
        { value: '0', label: 'Inactive' },
    ];

    useEffect(() => {
        const sendRequest = {
            "assessmentId": selectedAssessmentId
        };
        dispatch(viewAssessment(sendRequest));
    }, []);

    useEffect(() => {
        if (AssessmentQueDataRes && AssessmentQueData) {
            localStorage.setItem("AssessmentQueData", JSON.stringify(AssessmentQueData))
        }
    }, [AssessmentQueDataRes, AssessmentQueData]);

    useEffect(() => {
        if (AssessmentQueData && AssessmentQueDataRes) {
            if (selectedAssessmentId !== 1) {
                let uniqueTypes = [];
                AssessmentQueDataRes?.viewAssessment?.data.map((item, i) => {
                    let uniqueGrades = Array.from(new Set(AssessmentQueDataRes?.viewAssessment?.data?.map(item => JSON.parse(item?.options)[0]?.value?.map(option => option?.grade)).flat(2)));
                    setOptionsArray(uniqueGrades);
                })
                AssessmentQueDataRes.viewAssessment.data.forEach(item => {
                    const options = JSON.parse(item.options)[0]?.value;
                    if (options) {
                        const types = options.map(option => option?.type).filter(Boolean);
                        uniqueTypes.push(...types);
                    }
                });
                uniqueTypes = Array.from(new Set(uniqueTypes));
                setTypesArray(uniqueTypes);

                const updatedData = AssessmentQueData && AssessmentQueData.map(question => {
                    const options = JSON.parse(question.options);
                    const updatedOptions = options.map(option => {
                        const ansObj = option?.value?.map(ans => ({ ...ans, checked: true, new: false }));
                        return { ...option, value: ansObj };
                    });
                    const updatedQuestion = { ...question, options: JSON.stringify(updatedOptions) };
                    return updatedQuestion;
                });
                setViewAssessmentDataRes(updatedData);
            } else {
                const updatedData = AssessmentQueData?.map(item => {
                    const options = JSON.parse(item.options);
                    let updatedOptions = options?.map(val => {
                        const newOptions = val.options?.value.map(value => {
                            return { value: value, checked: true, new: false };
                        });
                        return { ...val, options: JSON.stringify(newOptions) }
                    })
                    return { ...item, options: JSON.stringify(updatedOptions) };
                });
                setViewAssessmentDataRes(updatedData);
            }
        }
    }, [AssessmentQueData])

    const handleChangeOption = (e, id) => {
        if (getPermissionByAppName("Assessment Master (Section + Question)") === "write") {
            if (e.value === "1") {
                setSetStatus(1)
            } else {
                setSetStatus(0)
            }
            const sendRequest = {
                "feature_type": "sections",
                "id": id,
                "status": e.value === "1" ? 1 : 0
            };
            dispatch(updateIsActiveStatus(sendRequest));
        } else {
            createNotification('warning', "You have View Only access");
        }
    }

    const saveAssessment = () => {
        setShowConfirm(false);
        const filteredArray = filterChecked(viewAssessmentDataRes);

        const sendRequest = {
            "feature_type": "assessment",
            "payload": filteredArray,
            "name": selectSectionName
        };

        dispatch(updateProgramRequest(sendRequest));
        setTimeout(() => {
            const sendRequest = {
                "assessmentId": selectedAssessmentId
            };
            dispatch(viewAssessment(sendRequest));
        }, 1000);
    }

    const filterChecked = (arr) => {
        if (selectedAssessmentId !== 1) {
            return arr.filter(obj => {
                if (obj.options) {
                    const options = JSON.parse(obj.options);
                    if (Array.isArray(options)) {
                        options.forEach(opt => {
                            if (opt.value) {
                                const values = opt.value;
                                if (Array.isArray(values)) {
                                    opt.value = values.filter(ans => ans.checked);
                                    opt.value.forEach(ans => {
                                        delete ans.checked
                                        delete ans.new
                                    });
                                }
                            }
                        });
                        obj.options = (JSON.stringify(options));
                        return true;
                    }
                }
                return false;
            });

        } else {
            return viewAssessmentDataRes.map(item => {
                let filteredOptions = JSON.parse(item.options).filter(option => {
                    return JSON.parse(option.options).some(subOption => subOption.checked === true);
                });
                let stringArray = filteredOptions.map(option => {
                    return JSON.parse(option.options).filter(subOption => subOption.checked === true)
                        .map(subOption => subOption.value);
                });
                let optionsVal = JSON.parse(item.options)
                let optionsArr = optionsVal.map((val, i) => {
                    return { ...val, options: JSON.stringify(stringArray[i]) }
                })
                return { ...item, options: JSON.stringify(optionsArr) };
            });
        }
    }

    const handleQueChange = (val, id, index) => {
        const detailsData = viewAssessmentDataRes.map(obj => {
            if (obj.id === id) {
                return { ...obj, question: val };
            } else {
                return obj;
            }
        });
        setViewAssessmentDataRes(detailsData);
    }

    const handleTagChange = (val, itemId, optionData, index) => {
        const updatedViewAssessmentDataRes = viewAssessmentDataRes.map(question => {
            if (question.id === itemId) {
                const options = JSON.parse(question.options);
                options.forEach(option => {
                    if (option.option_tag_name === optionData.option_tag_name) {
                        option.option_tag_name = val;
                    }
                });
                question.options = JSON.stringify(options);
            }
            return question;
        });
        setViewAssessmentDataRes(updatedViewAssessmentDataRes);
    }

    const handleAnsChange = (val, itemId, subIndex, optionTagName) => {
        if (selectedAssessmentId === 1) {
            const updatedViewAssessmentDataRes = viewAssessmentDataRes.map(question => {
                if (question.id === itemId) {
                    const options = JSON.parse(question.options);
                    options.forEach(option => {
                        if (option.option_tag_name === optionTagName) {
                            option.options = JSON.parse(option.options);
                            option.options[subIndex].value = val
                            option.options = JSON.stringify(option.options);
                        }
                    });
                    question.options = JSON.stringify(options);
                }
                return question;
            });
            setViewAssessmentDataRes(updatedViewAssessmentDataRes);
        } else {
            const detailsData = viewAssessmentDataRes.map(obj => {
                if (obj.id === itemId) {
                    const optionsArray = JSON.parse(obj.options)[0].value;
                    const newOptionsArray = optionsArray.map((optionObj, i) => {
                        const newOptionObj = { ...optionObj };
                        if (i === subIndex) {
                            newOptionObj.ans = val;
                        }
                        return newOptionObj;
                    });
                    obj.options = JSON.stringify([{ option_tag_name: optionsArray.option_tag_name, value: newOptionsArray }]);
                }
                return obj;
            });
            setViewAssessmentDataRes(detailsData);
        }
    }

    const addMoreQue = (questionId, optionTagName) => {
        const newAnsGradeObj = { "ans": "", "grade": "", checked: false, new: true };
        if (selectedAssessmentId === 1) {
            const newOption = { value: "", checked: true, new: true };
            const updatedViewAssessmentDataRes = viewAssessmentDataRes.map(question => {
                if (question.id === questionId) {
                    const options = JSON.parse(question.options);
                    options.forEach(option => {
                        if (option.option_tag_name === optionTagName) {
                            option.options = JSON.parse(option.options);
                            option.options.push(newOption);
                            option.options = JSON.stringify(option.options);
                        }
                    });
                    question.options = JSON.stringify(options);
                }
                return question;
            });
            setViewAssessmentDataRes(updatedViewAssessmentDataRes);
        } else {
            const updatedViewAssessmentDataRes = viewAssessmentDataRes.map((question) => {
                if (question.id === questionId) {
                    const options = JSON.parse(question.options);
                    options[0].value.push(newAnsGradeObj);
                    question.options = JSON.stringify(options);
                }
                return question;
            });
            setViewAssessmentDataRes(updatedViewAssessmentDataRes);
        }
    }

    const deleteOptionByIdOne = (itemId, subIndex, optionTagName) => {
        const updatedViewAssessmentDataRes = viewAssessmentDataRes.map(question => {
            if (question.id === itemId) {
                const options = JSON.parse(question.options);
                options.forEach(option => {
                    if (option.option_tag_name === optionTagName) {
                        option.options = JSON.parse(option.options);
                        option.options.splice(subIndex, 1);
                        option.options = JSON.stringify(option.options);
                    }
                });
                question.options = JSON.stringify(options);
            }
            return question;
        });
        setViewAssessmentDataRes(updatedViewAssessmentDataRes);
    }
    const deleteOptionById = (questionId, newObjectIndex) => {
        const updatedViewAssessmentDataRes = viewAssessmentDataRes.map((question) => {
            if (question.id === questionId) {
                const options = JSON.parse(question.options);
                options[0].value.splice(newObjectIndex, 1);
                question.options = JSON.stringify(options);
            }
            return question;
        });
        setViewAssessmentDataRes(updatedViewAssessmentDataRes);
    }

    const onChangeGrade = (val, itemId, subIndex) => {
        const detailsData = viewAssessmentDataRes.map(obj => {
            if (obj.id === itemId) {
                const optionsArray = JSON.parse(obj.options)[0].value;
                const newOptionsArray = optionsArray.map((optionObj, i) => {
                    const newOptionObj = { ...optionObj };
                    if (i === subIndex) {
                        newOptionObj.grade = val;
                    }
                    return newOptionObj;
                });
                obj.options = JSON.stringify([{ option_tag_name: optionsArray.option_tag_name, value: newOptionsArray }]);
            }
            return obj;
        });
        setViewAssessmentDataRes(detailsData);
    }
    const onChangeType = (val, itemId, subIndex) => {
        const detailsData = viewAssessmentDataRes.map(obj => {
            if (obj.id === itemId) {
                const optionsArray = JSON.parse(obj.options)[0].value;
                const newOptionsArray = optionsArray.map((optionObj, i) => {
                    const newOptionObj = { ...optionObj };
                    if (i === subIndex) {
                        newOptionObj.type = val;
                    }
                    return newOptionObj;
                });
                obj.options = JSON.stringify([{ option_tag_name: optionsArray.option_tag_name, value: newOptionsArray }]);
            }
            return obj;
        });
        setViewAssessmentDataRes(detailsData);
    }

    const cancelEditRequest = (val, id, index) => {
        const AssessmentQueDataDefault = JSON.parse(localStorage.getItem("AssessmentQueData"));
        setShowConfirm(false);
        if (selectedAssessmentId !== 1) {
            let uniqueTypes = [];
            AssessmentQueDataDefault?.viewAssessment?.data.map((item, i) => {
                let uniqueGrades = Array.from(new Set(AssessmentQueDataRes?.viewAssessment?.data.map(item => JSON.parse(item?.options)[0]?.value.map(option => option?.grade)).flat(2)));
                setOptionsArray(uniqueGrades);
            })
            AssessmentQueDataDefault?.viewAssessment?.data?.forEach(item => {
                const options = JSON.parse(item.options)[0]?.value;
                if (options) {
                    const types = options.map(option => option?.type).filter(Boolean);
                    uniqueTypes.push(...types);
                }
            });
            uniqueTypes = Array.from(new Set(uniqueTypes));
            setTypesArray(uniqueTypes);

            const updatedData = AssessmentQueDataDefault && AssessmentQueDataDefault.map(question => {
                const options = JSON.parse(question.options);
                const updatedOptions = options.map(option => {
                    const ansObj = option?.value?.map(ans => ({ ...ans, checked: true, new: false }));
                    return { ...option, value: ansObj };
                });
                const updatedQuestion = { ...question, options: JSON.stringify(updatedOptions) };
                return updatedQuestion;
            });
            setViewAssessmentDataRes(updatedData);
        } else {
            const updatedData = AssessmentQueDataDefault?.map(item => {
                const options = JSON.parse(item.options);
                let updatedOptions = options?.map(val => {
                    const newOptions = val.options?.value.map(value => {
                        return { value: value, checked: true, new: false };
                    });
                    return { ...val, options: JSON.stringify(newOptions) }
                })
                return { ...item, options: JSON.stringify(updatedOptions) };
            });
            setViewAssessmentDataRes(updatedData);
        }
    }

    const handleAnswersSelection = (itemId, subIndex, optionTagName) => {
        const updatedViewAssessmentDataRes = viewAssessmentDataRes.map(question => {
            if (question.id === itemId) {
                const options = JSON.parse(question.options);
                options.forEach(option => {
                    if (option.option_tag_name === optionTagName) {
                        option.options = JSON.parse(option.options);
                        option.options[subIndex].checked = !option.options[subIndex].checked
                        option.options = JSON.stringify(option.options);
                    }
                });
                question.options = JSON.stringify(options);
            }
            return question;
        });
        setViewAssessmentDataRes(updatedViewAssessmentDataRes)
    }

    const handleAnswerSelection = (questionId, answerIndex, optionTagIndex, optionTagName) => {
        const updatedViewAssessmentDataRes = viewAssessmentDataRes.map(question => {
            if (question.id === questionId) {
                const updatedOptions = JSON.parse(question.options)[0].value.map((answer, index) => {
                    return { ...answer, checked: index === answerIndex ? !answer.checked : answer.checked };
                });
                return {
                    ...question,
                    options: JSON.stringify([
                        ({
                            ...JSON.parse(question.options)[0],
                            value: updatedOptions
                        })
                    ])
                };
            } else {
                return question;
            }
        });
        setViewAssessmentDataRes(updatedViewAssessmentDataRes)

    };
    const openRequestModal = () => {
        if (getPermissionByAppName("Assessment Master (Section + Question)") === "write") {
            setShowConfirm(true)
        } else {
            createNotification('warning', "You have View Only access");
        }
    }
    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='ViewAssessment'>
                    {AssessmentQueDataRes && viewAssessmentDataRes && <div className="card">
                        <div className="card-header">
                            <h4>{selectSectionName}</h4>
                            <div className='assessmentHeader'>
                                <button
                                    className='assessmentModalBtn'
                                    onClick={openRequestModal}
                                >Request for edit
                                </button>
                                <Select
                                    className={setStatus === 1 ? "react-select" : "react-selectChange"}
                                    classNamePrefix="react-select"
                                    onChange={(e) => { handleChangeOption(e, viewAssessmentDataRes[0].section_id) }}
                                    value={setStatus === 1 ? { label: "Active", value: "1" } : { label: "Inactive", value: "0" }}
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
                        <div className="separator"></div>
                        {AssessmentQueData && <div className="card-body">
                            {AssessmentQueDataRes?.viewAssessment?.data.map((item, i) => {
                                const options = JSON.parse(item.options);
                                return (
                                    <div key={i}>
                                        <div className='row cardDiv'>
                                            <div className="col-12 col-xs-12 col-md-12 col-lg-12 col-xl-12">
                                                <div className="row">
                                                    <div className="col-12 col-xs-12 col-md-12 col-lg-12 col-xl-12">
                                                        <div className='row'>
                                                            <p className='col-xl-1 FirstColumn'>QUESTION:</p>
                                                            <p className='col-xl-10 SecondColumn'>{item.question}</p>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-xl-1 FirstColumn'>
                                                                <p className='col-xl-1 FirstColumn'>ANSWERS:</p>
                                                            </div>
                                                            <div className='col-xl-8'>
                                                                <div className='row'>
                                                                    <>
                                                                        {options.map((option, index) => {
                                                                            return (
                                                                                <div className='col-xl-4 col-lg-4 SecondColumn d-flex' key={index}>
                                                                                    <div div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2 InnerAnswerDiv' >
                                                                                        <h6>{option?.option_tag_name && (
                                                                                            <strong className='tagsName'>{option?.option_tag_name}: </strong>
                                                                                        )}</h6>
                                                                                        {option?.value?.every(element => typeof element === 'object') ?
                                                                                            (<>
                                                                                                {option.value.map((value, subIndex) => (
                                                                                                    <>
                                                                                                        <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 ThirdColumn d-flex' key={subIndex}>
                                                                                                            <p className='mr-4'><strong className='Answer'>Answer: </strong> {value.ans}</p>
                                                                                                            <p><strong className='Answer'>Grade: </strong> {value.grade}</p>
                                                                                                        </div>
                                                                                                        {value?.type && <div><p><strong className='Answer'>Type: </strong> {value.type}</p></div>}
                                                                                                    </>
                                                                                                ))}
                                                                                            </>) :
                                                                                            <p> {option?.options?.value.join(", ")}</p>
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="separator2"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>);
                            })}
                        </div>
                        }
                    </div >}
                    <Modal className="popUp-modal-warning br-8" show={showConfirm} onHide={() => setShowConfirm(true)} centered={false}>
                        <Modal.Header>
                            <Modal.Title>Request For Edit</Modal.Title>
                            <div className='btnsDiv'>
                                <button type="button" className="btn btn-danger redButton mr-3" onClick={cancelEditRequest}>
                                    <img className="mainIcon mr-1 mb-1" src={redCross} alt="" width="22px" height="22px" />
                                    CANCEL</button>
                                <button type="submit" className="btn btn-success greenButton " onClick={saveAssessment}>
                                    <img className="mainIcon mr-2 mb-1" src={Geentick} alt="" width="16px" height="16px" />
                                    SUBMIT REQUEST</button>
                            </div>
                        </Modal.Header>
                        <div className='sectionTitleDiv'>
                            <p className='sectionTitle'>{selectSectionName}</p>
                        </div>
                        <hr />
                        <div className='MainDivModal'>
                            {AssessmentQueData && viewAssessmentDataRes &&
                                viewAssessmentDataRes.map((item, mainIndex) => {
                                    const options = JSON.parse(item.options);
                                    return (
                                        <div className='queAnswersSection'>
                                            <div className='questionDiv'>
                                                <p className='questionHeading'>Question</p>
                                                <div className='questionBox'>
                                                    <input
                                                        placeholder="Enter Question"
                                                        className="form-control Calories"
                                                        type="text"
                                                        name='calories'
                                                        autoComplete="off"
                                                        value={item.question}
                                                        onChange={(e) => { handleQueChange(e.target.value, item.id, mainIndex) }}
                                                    />
                                                </div>
                                            </div>
                                            <div className='optionsDiv'>
                                                <p className='optionsHeading'>Options</p>
                                            </div>
                                            {options?.map((option, index) => {
                                                return (
                                                    <div className='answersDiv'>
                                                        {option?.option_tag_name &&
                                                            <input
                                                                placeholder="Enter Question"
                                                                className="form-control Calories"
                                                                type="text"
                                                                name='calories'
                                                                autoComplete="off"
                                                                value={option.option_tag_name}
                                                                onChange={(e) => { handleTagChange(e.target.value, item.id, option, index) }}
                                                            />
                                                        }
                                                        <div className='tagsDiv'>
                                                            {selectedAssessmentId !== 1 ?
                                                                (<>
                                                                    {option?.value?.map((value, subIndex) => (
                                                                        <div className='tagsDiv'>
                                                                            < div className='valAnswers'>
                                                                                <div className='checkboxAns'>
                                                                                    <div>
                                                                                        <label className="custom-checkbox">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                checked={value.checked}
                                                                                                onChange={() => handleAnswerSelection(item.id, subIndex)}
                                                                                            />
                                                                                            <span className="checkmark"></span>
                                                                                        </label>
                                                                                    </div>
                                                                                    <div className='optInputDiv'>
                                                                                        <input
                                                                                            placeholder="Enter Options"
                                                                                            className="form-control answersInput"
                                                                                            type="text"
                                                                                            autoComplete="off"
                                                                                            value={value.ans}
                                                                                            onChange={(e) => { handleAnsChange(e.target.value, item.id, subIndex) }}
                                                                                        />
                                                                                        {value.new && <img src={Delete} className="mr-1 mb-1 ml-2" alt="Avatar" width="14px" height="16px" onClick={() => deleteOptionById(item.id, subIndex)} />}
                                                                                    </div>
                                                                                </div>
                                                                                <div className='d-flex'>
                                                                                    <span className='tagOptionSelectGrade'><p className='gradeHead'>Grade : </p>
                                                                                        {optionsArray.map(val => {
                                                                                            return (
                                                                                                <>
                                                                                                    <i className="radioSelect material-icons" onClick={(e) => { onChangeGrade(val, item.id, subIndex) }}>{val === value.grade ? 'check_circle' : 'radio_button_unchecked'}</i>
                                                                                                    <p className="gradeVal">{val}</p>
                                                                                                </>
                                                                                            )
                                                                                        })}
                                                                                    </span>
                                                                                </div>
                                                                                {typesArray.length > 0 && <div className='d-flex'>
                                                                                    <span className='tagOptionSelectGrade'><p className='typeHead'>Type : </p>
                                                                                        {typesArray.map(val => {
                                                                                            return (
                                                                                                <>
                                                                                                    <i className="radioSelect material-icons" onClick={(e) => { onChangeType(val, item.id, subIndex) }}>{val === value.type ? 'check_circle' : 'radio_button_unchecked'}</i>
                                                                                                    <p className="gradeVal">{val}</p>
                                                                                                </>
                                                                                            )
                                                                                        })}
                                                                                    </span>
                                                                                </div>}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </>)
                                                                : (
                                                                    <>
                                                                        {option?.options && JSON.parse(option?.options)?.map((val, subIndex) => {
                                                                            return (
                                                                                < div className='tagsDiv'>
                                                                                    < div className='valAnswers'>
                                                                                        <div className='checkboxAns'>
                                                                                            <div>
                                                                                                <label className="custom-checkbox">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        checked={val.checked}
                                                                                                        onChange={() => handleAnswersSelection(item.id, subIndex, option.option_tag_name)}
                                                                                                    />
                                                                                                    <span className="checkmark"></span>
                                                                                                </label>
                                                                                            </div>

                                                                                            <div className='optInputDiv'>
                                                                                                <input
                                                                                                    placeholder="Enter Options"
                                                                                                    className="form-control answersInput answersInputs"
                                                                                                    type="text"
                                                                                                    autoComplete="off"
                                                                                                    value={val.value}
                                                                                                    onChange={(e) => { handleAnsChange(e.target.value, item.id, subIndex, option.option_tag_name) }}
                                                                                                />
                                                                                                {val.new && <img src={Delete} className=" delIcon mr-1 mb-1 ml-2" alt="Avatar" width="14px" height="16px" onClick={() => deleteOptionByIdOne(item.id, subIndex, option.option_tag_name)} />}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                        {selectedAssessmentId === 1 && <div className='addMoreDiv' onClick={() => { addMoreQue(item.id, option?.option_tag_name) }}>
                                                                            <img className="mr-2 plusIcon" src={BrownPlus} alt="" />
                                                                            <p className='addMoreText'>Add More</p>

                                                                        </div>}
                                                                    </>
                                                                )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {selectedAssessmentId !== 1 && <div className='addMoreDiv' onClick={() => { addMoreQue(item.id, optionsArray[0]) }}>
                                                <img className="mr-2 plusIcon" src={BrownPlus} alt="" />
                                                <p className='addMoreText'>Add More</p>

                                            </div>}
                                        </div>
                                    )
                                })}
                        </div>
                    </Modal>
                </div >
            </div >
        </AppContainer >
    )
}

export default ViewAssessment
