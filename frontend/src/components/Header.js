import React,{useState} from 'react';
import {
    Navbar,
    Collapse,
    NavbarToggler

} from 'reactstrap';
import {Link, useHistory} from 'react-router-dom';
import { isAuthenticated, signout,getEmail } from '../auth/helper';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    return (
        <Navbar className="navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link href="#" className="navbar-brand">Devops</Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar className="collapse navbar-collapse justify-content-end">


                    <ul className="navbar-nav ml-auto">
                        {
                            isAuthenticated() ? (
                                <>
                                    <li class="nav-item">
                                        <Link to="/" class="nav-link active" 
                                            aria-current="page" >{getEmail()}</Link>
                                    </li>
                                    <li class="nav-item">
                                        <span class="nav-link active" 
                                            onClick={e => signout(() => history.push("/signin"))}
                                            aria-current="page" >Signout</span>
                                    </li>
                                </>
                            ): 
                            (
                                <>
                                    <li class="nav-item">
                                        <Link class="nav-link active" aria-current="page" to="/signin">Sign In</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link class="nav-link active" aria-current="page" to="/signup">Sign Up</Link>
                                    </li>
                                </>                
                            )

                        }
                        
                    </ul>
                
                
                </Collapse>
            </div>

        </Navbar>
    );
};

export default Header;