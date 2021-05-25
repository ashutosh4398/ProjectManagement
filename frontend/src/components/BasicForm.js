import React,{useState} from 'react';
import {Link} from 'react-router-dom';

const BasicForm = ({formname = "Sign Up", handleSubmit}) => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        error: false,
        success: false,
    })

    const handleChange = name => 
        e => setUserData(
            {
                ...userData,[name]: e.target.value, error: false, success: false
            }
        );

    const handleFormSubmit = e => {
        e.preventDefault();
        handleSubmit(userData, setUserData);
    }


    return (
        <div className="card col-sm-10 col-lg-6 mx-auto mt-5 border border-primary">
            <div className="card-header bg-primary text-light text-center py-2">
                <h3>{formname}</h3>
            </div>
            <form className="p-3" onSubmit={handleFormSubmit}>
                <div className="">
                    {
                        userData.success && (
                            <div className="alert alert-success">
                                Your account is created successfully. Please <Link to="/signin">Login</Link>
                            </div>
                        )
                    }

                    {
                        userData.error && (
                            <div className="alert alert-danger">
                                Something went wrong.
                            </div>
                        )
                    }
                </div>
                
                <div className="input-group my-2">
                    <input 
                        value={userData.email}
                        onChange={handleChange('email')}
                        required
                        type="email" placeholder="Enter Email" className="form-control" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            @
                        </div>
                    </div>
                </div>  
                
                <div className="input-group my-2">
                    <input 
                        value={userData.password}
                        onChange={handleChange('password')}
                        required
                        type="password" placeholder="Enter Password" className="form-control" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                            @
                        </div>
                    </div>
                </div>

                <button type="submit" className="d-block mx-auto btn btn-primary px-5">
                    {formname}
                </button>
            </form>
        </div>
    );
};

export default BasicForm;