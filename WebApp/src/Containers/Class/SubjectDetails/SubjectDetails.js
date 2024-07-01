import React, {useState, useEffect} from 'react';
import TextTranslation from '../../../Components/TextTranslation/TextTranslation';
import RowInTable from './RowInTable/RowInTable';

import Loader1 from '../../../Components/SVG/Loader_1';
import Error1 from '../../../Components/SVG/Cancel_1';

import EditForm from '../EditForm/EditForm';

import './SubjectDetails.css';

import { useHttpClient } from '../../../Hooks/http-hook';

const SubjectDetails = (props) => {

    const [subjectDetails, setSubjectDetails] = useState({
        classCode : null,
        scores: []
    });


 

    /* Subject Name */
    const [subjectName, setSubjectName] = useState();

    useEffect(()=>{
        if(subjectName !== props.subjectName && props.classCode){
            console.log("subjectDetails " + props.classCode +props.subjectName);
            setSubjectName(props.subjectName);
            loadClassData();
        }   
    }, [subjectName, props.subjectName, props.classCode]);

    const [statusCode, setStatusCode] = useState(0);

    /* Site Status */
    const { sendRequest } = useHttpClient();

    /* Hook Edit Form */
    const [isOpenEditForm, setIsOpenEditForm] = useState(false);
    const [contentOfEditForm, setContentOfEditForm] = useState();

    const openEditForm = (id) =>{
        setContentOfEditForm(
        <EditForm 
            studentID={subjectDetails.scores[id].k15mins} 
            studentName={subjectDetails.scores[id].k45mins}
            sex={subjectDetails.scores[id].kmidterm}
            DOB={subjectDetails.scores[id].kendterm}
            address={subjectDetails.scores[id].k15mins}
            closeAction={closeEditForm} />);

        setIsOpenEditForm(true);   
    }
    const closeEditForm = () => {
        setIsOpenEditForm(false);
    }


    const loaderReview = (statusCode) => {
        if(statusCode === 1){
            return <div>
                <Loader1 /><div id="classinfo-loader-infoLoader"><TextTranslation textName="ClassInfo-LoadingDataOf.1" /> {props.classCode}</div>
            </div>
            
        }
        else if(statusCode === -1){
            return <div>
                <Error1 /><div id="classinfo-loader-errorLoader"><TextTranslation textName="ClassInfo-CannotGetDataOf.1" /> {props.classCode}</div>
            </div>
        }
    }


    const sleeper = (ms) => {
        return function(x) {
          return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
    }

    const loadClassData = () => {
        
        setStatusCode(1);

        let urlK = "https://api.kunbr0.com/se104/subjects/"+props.classCode+"/"+props.subjectName+".php";

        
        sendRequest(urlK)
            .then((response) => {
                return response.json();
            })

            .then(sleeper(500))

            .then((scores) => {
                
                setSubjectDetails({
                    classCode: props.classCode,
                    scores
                });
                setStatusCode(99);
                console.log(subjectDetails);
            })
            
            .catch((error) => {
                console.log(error);
                setStatusCode(-1);
        });
        

        /*try {
            
            const response = await sendRequest(
                'https://api.kunbr0.com/se104/class/' + window.location.pathname.split('/')[2] + ".php",
            );
             
            console.log(response);
            
        }catch (err) {
            
        }
        */
        
    }

    
    let elmStudents = null;
    let styleOfLoader = {};
    //let elmEditForm = null;


    console.log(subjectDetails.scores);

    if(subjectDetails.scores){
        elmStudents = subjectDetails.scores.map((student, index) => 
            <RowInTable key={index} editAction={()=>openEditForm(index)} studentID={student.studentID} studentName={student.studentName} sex={student.Sex} DOB={student.DOB} address={student.Address}/>
        );
    } 

    

    if(statusCode === 99){
        styleOfLoader = {"display" : "none"};
    }else if(statusCode === 1){
        styleOfLoader = {"display" : ""};
    }else if(statusCode === 0){
        styleOfLoader = {"display" : "none"};
    }else if(statusCode === -1){
        styleOfLoader = {"display" : ""};
        console.log("Errorrr !!!");
    }


    return (
        <React.Fragment>
            {isOpenEditForm && contentOfEditForm}

            <div id="classinfo-loader-wrapper" style={styleOfLoader}>
                <div id="classinfo-loader-wrapper2">
                    {loaderReview(statusCode)}
                </div>
            </div>

            <div id="classinfo-mainview">
                {/*<h1>{subjectName}</h1>*/}
                <div className="wrapper">
                    <div className="table">
                        
                        <div className="row header">
                            <div className="cell w10pcM13px">
                            <TextTranslation textName="ClassInfo-Table-No.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-No.2" kClass="mbview"/>
                            </div>
                            <div className="cell w30pc">
                            <TextTranslation textName="ClassInfo-Table-Name.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-Name.2" kClass="mbview"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-15mins.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-15mins.2" kClass="mbview"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-45mins.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-45mins.2" kClass="mbview"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-midterm.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-midterm.2" kClass="mbview"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-endterm.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-endterm.2" kClass="mbview"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-final.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-final.2" kClass="mbview"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-Action.1" kClass="pcview"/>
                            <TextTranslation textName="ClassInfo-Table-Action.2" kClass="mbview"/>
                            </div>
                            <div className="cell w13px">
                                .
                            </div>
                        </div>     
                        

                        
                        <div id="table-rows-view">
                        {elmStudents}
                        
                        
                        </div>

                    </div>      
                </div>
            </div>
        </React.Fragment>
    )
}

export default SubjectDetails;