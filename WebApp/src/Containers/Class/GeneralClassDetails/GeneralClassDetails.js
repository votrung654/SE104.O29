import React, {useState, useEffect} from 'react';
import TextTranslation from '../../../Components/TextTranslation/TextTranslation';
import RowInTable from '../RowInTable/RowInTable';

import Loader1 from '../../../Components/SVG/Loader_1';
import Error1 from '../../../Components/SVG/Cancel_1';

import EditForm from '../EditForm/EditForm';

import { useHttpClient } from '../../../Hooks/http-hook';


const GeneralClassDetails = (props) => {


    /* Class Details */
    const [classDetails, setClassDetails] = useState({
        classCode : null,
        stuents: []
    });

    const [classCode, setClassCode] = useState();

    useEffect(()=>{
        if(classCode !== props.classCode){
            setClassCode(props.classCode);
            loadClassData();
        }
    }, [classCode, props.classCode]);

    

    const [statusCode, setStatusCode] = useState(0);



    /* Site Status */
    const { sendRequest } = useHttpClient();


    /* Effects */

    


    /* Hook Edit Form */
    const [isOpenEditForm, setIsOpenEditForm] = useState(false);
    const [contentOfEditForm, setContentOfEditForm] = useState();

    const openEditForm = (id) =>{
        setContentOfEditForm(
        <EditForm 
            studentID={classDetails.students[id].studentID} 
            studentName={classDetails.students[id].studentName}
            sex={classDetails.students[id].Sex}
            DOB={classDetails.students[id].DOB}
            address={classDetails.students[id].Address}
            closeAction={closeEditForm} />);

        setIsOpenEditForm(true);   
    }
    const closeEditForm = () => {
        setIsOpenEditForm(false);
    }


    

    const loaderReview = (statusCode) => {
        if(statusCode === 1){
            return <div>
                <Loader1 /><div id="classinfo-loader-infoLoader"><TextTranslation textName="ClassInfo-LoadingDataOf.1" /> {classCode}</div>
            </div>
            
        }
        else if(statusCode === -1){
            return <div>
                <Error1 /><div id="classinfo-loader-errorLoader"><TextTranslation textName="ClassInfo-CannotGetDataOf.1" /> {classCode}</div>
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


        sendRequest('https://api.kunbr0.com/se104/class/' + window.location.pathname.split('/')[2] + ".php")
            .then((response) => {
                return response.json();
            })

            .then(sleeper(500))

            .then((students) => {
                
                setClassDetails({
                    students,
                    classCode: classCode
                });
                setStatusCode(99);
                console.log(students);
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


    if(classDetails.students){
        elmStudents = classDetails.students.map((student, index) => 
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
                <div className="wrapper">
                    <div className="table">
                        
                        <div className="row header">
                            <div className="cell w10pcM13px">
                            <TextTranslation textName="ClassInfo-Table-No.1"/>
                            </div>
                            <div className="cell w30pc">
                            <TextTranslation textName="ClassInfo-Table-Name.1"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-Sex.1"/>
                            </div>
                            <div className="cell w20pc">
                            <TextTranslation textName="ClassInfo-Table-DOB.1"/>
                            </div>
                            <div className="cell w20pc">
                            <TextTranslation textName="ClassInfo-Table-Address.1"/>
                            </div>
                            <div className="cell w10pc">
                            <TextTranslation textName="ClassInfo-Table-Action.1"/>
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

export default GeneralClassDetails;