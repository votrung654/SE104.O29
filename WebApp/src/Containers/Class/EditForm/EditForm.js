import React from 'react';
import './EditForm.css';
//import TextTranslation from './../../../Components/TextTranslation/TextTranslation';
import SelectSex from '../../../../Components/Input-Select/KSelect';
import SelectDate from '../../../../Components/Input-Date/KDate';

const EditForm = ({studentID="", studentName="", sex="", DOB="", address="", closeAction}) => {

    return (
        <div id="classInfo-editForm">
            <div id="classInfo-editForm-title">Edit student information</div>
            <div className="classInfo-editForm-row mgtop10">
                <div id="classInfo-editForm-name"><input defaultValue={studentName}/></div>
                <div id="classInfo-editForm-no"><input defaultValue={studentID}/></div>
                
                <div id="classInfo-editForm-dob" className="mgtop10">
                    <SelectDate />
                </div>
                <div id="classInfo-editForm-sex" className="mgtop10">
                    <SelectSex options={["Male", "Female"]} selectedOption={sex} />
                </div>
                <div id="classInfo-editForm-address" className="mgtop10"><input defaultValue={address}/></div>
            </div>
            
            
            
            <div id="classInfo-editForm-btnClose" onClick={()=>{setTimeout(()=>closeAction(), 100)}}>X</div>
            <div id="classInfo-editForm-btnSubmit">Submit</div>
        </div>
    );
    
}

export default EditForm;
