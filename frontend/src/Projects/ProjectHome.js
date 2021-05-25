import React,{useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import { isLead, isStaff } from '../auth/helper';
import Header from '../components/Header';
import Loader from '../components/Loader';
import ProjectCard from '../components/ProjectCard';
import { LoadAllProjects } from './helper';
import {toast} from 'react-toastify';


const ProjectHome = () => {

    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const loadAll = () => {
        setIsLoading(true);
        LoadAllProjects()
            .then(resp => {
                setProjects(resp.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false);
                toast("Something went wrong",{
                    type: "error"
                })
            })
    }

    useEffect(() => {
        loadAll();
        
    },[]);

    return (
        <>
            <Header />
            <div className="container">
                {
                    isStaff() && (
                        <div className="my-3" style={{textAlign: "right"}}>
                            <button 
                            onClick={() => history.push("/create/project")}
                            className="btn btn-success">Create</button>
                        </div>
                    )
                }

                <div className="row py-5">                    
                    {
                        isLoading ? (
                            <div className="text-center">
                                <Loader />
                            </div>
                        ) 
                        : 
                        (
                            projects.map(project => (
                                <ProjectCard key={project.id} 
                                    id={project.id} 
                                    avatar={project.avatar} 
                                    name={project.name} 
                                    description={project.description}/>
                            ))
                        )
                        
                    }
                    
                </div>
            </div>
        </>
    );
};

export default ProjectHome;