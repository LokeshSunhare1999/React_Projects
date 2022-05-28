import React from 'react'
import { useState } from 'react'

const BasicForm = () => {
    let myStyleDiv1 = {
        height: "110vh",
        //    marginTop: "0px",
    }

    let myStyle = {
        width: "500px",
        marginTop: "150px",
        padding: "60px 60px 60px 60px",
        backgroundColor: "#D2F4EA",
        borderRadius: "15px"
    }
    let showData = {
        backgroundColor: "#A6E9D5",
        borderRadius: "5px",
        marginTop: "20px",
        padding: "10px 10px 5px 10px"
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setAllEntry] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();
        const newEntry = { email: email, password: password };

        setAllEntry([...allEntry, newEntry]);
        console.log(allEntry);
    }

    return (
        <div className='container' style={myStyleDiv1}>
            <form className='container ' action='' onSubmit={submitForm} style={myStyle}>
                <h1>Login!</h1>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="">Remember me!</label>
                </div>
                <button type="submit" className="btn btn-success">Login</button>
            </form>
            <div>
                {
                    allEntry.map((curElem) => {
                        return (
                            <div className='showDataStyle' style={showData}>
                                <p>{curElem.email}</p>
                                <p>{curElem.password}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BasicForm