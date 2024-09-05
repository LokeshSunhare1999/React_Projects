import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from "react-select";
import AppContainer from '../../components/AppContainer/AppContainer';
import redCross from "../../assets/images/CommonComponent/redCross.svg"
import greenTick from "../../assets/images/CommonComponent/tick.svg"
import { viewTestimonialsDetails, approveRejectTestimonials } from '../../redux/actions/TestimonialsAction/TestimonialsAction';
import { updateIsActiveStatus } from '../../redux/actions/MasterDataAction/ProgramAction/programActions';
import './ViewTestimonials.scss';

const ViewProgram=(props)=> {
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ];

    const { history } = props;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()
    const { testimonialID, testimonialsStatus, } = location.state;
    const [selectedStatus, setSelectedStatus] = useState("");
    const [testimonialDetails, setTestimonialDetails] = useState("");
    const viewTestimonialDetailsRes = useSelector(state => state?.viewTestimonialsDetails?.viewTestimonialsDetails);

    useEffect(() => {
        if (testimonialID) {
            setSelectedStatus(testimonialsStatus);
            const sendRequest = {
                "id": testimonialID
            };
            dispatch(viewTestimonialsDetails(sendRequest));
        }
    }, [])

    useEffect(() => {
        if (viewTestimonialDetailsRes && viewTestimonialDetailsRes) {
            setTestimonialDetails(viewTestimonialDetailsRes?.data);
        }
    }, [viewTestimonialDetailsRes])

    const handleChangeOption = (e) => {
        setSelectedStatus(e.value === "Active" ? 1 : 0);
        const sendRequest = {
            "feature_type": "testimonial",
            "id": testimonialID,
            "status": e.value === "Active" ? 1 : 0
        };
        dispatch(updateIsActiveStatus(sendRequest));
    }

    const handleChangeStatus = (e) => {
        if (e === "approved") {
            testimonialDetails.status = "approve";
        }
        else {
            testimonialDetails.status = "rejected";
        }
        setTestimonialDetails(testimonialDetails)
        const sendRequest = {
            "id": testimonialDetails.id,
            "status": e === "approved" ? 1 : 0
        };
        dispatch(approveRejectTestimonials(sendRequest));
        navigate(-1)
    }

    return (
        <AppContainer history={history}>
            <div className="event-content">
                <div className='ViewTestimonials'>
                    {viewTestimonialDetailsRes && testimonialDetails &&
                        <div className="card">
                            <div className="card-header">
                                <h4>{testimonialDetails.first_name} {testimonialDetails.last_name}</h4>
                                <div className=''>
                                    <Select
                                        className={selectedStatus === 1 ? "react-select" : "react-selectChange"}
                                        classNamePrefix="react-select"
                                        onChange={(e) => { handleChangeOption(e) }}
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
                            <div className="separator"></div>
                            <div className="card-body">
                                <div className='DecDiv'>
                                    <ul className="list-group FirstGroup">
                                        <li className="list-group-item">MOBILE NO.:</li>
                                        <li className="list-group-item">EMAIL ADDRESS:</li>
                                        <li className="list-group-item">SUBMITTED ON:</li>
                                        <li className="list-group-item">PROGRAM:</li>
                                        <li className="list-group-item">DURATION:</li>
                                    </ul>
                                    <ul className="list-group SecGroup">
                                        <li className="list-group-item">{testimonialDetails.phone_number}</li>
                                        <li className="list-group-item emailLabel">{testimonialDetails.email_id}</li>
                                        <li className="list-group-item submittedLabel">{testimonialDetails.submitted}</li>
                                        <li className="list-group-item programLabel">{testimonialDetails.program}</li>
                                        <li className="list-group-item programCheckIn">{testimonialDetails.check_in} - {testimonialDetails.check_out}   ({testimonialDetails.no_of_nights} night)</li>
                                    </ul>
                                </div>
                                <div className='DecDiv'>
                                    <ul className="list-group FirstGroup">
                                        <li className="list-group-item">DESCRIPTION:</li>
                                    </ul>
                                    <ul className="list-group LastGroup">
                                        <div>
                                            <li className="list-group-item">{testimonialDetails.description}
                                            </li>
                                            <li className="list-group-item">
                                                <div className='mt-2'>
                                                    {testimonialDetails?.status == "pending" ?
                                                        <>
                                                            <button type="button" className="btn btn-danger redButton mr-3"
                                                                onClick={() => { handleChangeStatus("rejected") }}
                                                            >
                                                                <img className="mainIcon mr-1" src={redCross} alt="" width="22px" height="22px" />
                                                                REJECT</button>
                                                            <button type="submit" className="btn btn-success greenButton "
                                                                onClick={() => { handleChangeStatus("approved") }}
                                                            >
                                                                <img className="mainIcon mr-2" src={greenTick} alt="" width="16px" height="16px" />
                                                                APPROVE</button>
                                                        </>
                                                        : <span className='StatusSpan'><i>{testimonialDetails?.status}</i></span>}
                                                </div>
                                            </li>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div >}
                </div>
            </div>
        </AppContainer >
    )
}

export default ViewProgram
