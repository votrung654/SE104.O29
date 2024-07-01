import React from 'react';
import TextTranslation from '../../../Components/TextTranslation/TextTranslation';
import SubjectBiology from '../../../Components/SVG/Subject_Biology';
import SubjectGeography from '../../../Components/SVG/Subject_Geography';
import SubjectMath from '../../../Components/SVG/Subject_Math';
import SubjectChemistry from '../../../Components/SVG/Subject_Chemistry';
import SubjectLiterature from '../../../Components/SVG/Subject_Literature';
import SubjectEnglish from '../../../Components/SVG/Subject_English';
import SubjectHistory from '../../../Components/SVG/Subject_History';
import SubjectPhysics from '../../../Components/SVG/Subject_Physics';
import Information from '../../../Components/SVG/Information';


import {NavLink} from 'react-router-dom';

import './SubjectsBar.css';
import './MSubjectBar.css';

const SubjectsBar = (props) => {
    console.log(props.parentUrl);
    return (
        <div id="classinfo-details">
            <div id="classinfo-info">
                <TextTranslation textName="ClassInfo-TopBar-Class.1"/>  : {props.classCode} <br/>
                <TextTranslation textName="ClassInfo-TopBar-Teacher.1"/>  : Nguyen Thi Thanh B<br/>
                <TextTranslation textName="ClassInfo-TopBar-Number.1"/> : 42<br/>
                <TextTranslation textName="ClassInfo-TopBar-Type.1"/>  : chuyên Toán
            </div>

            <div id="classinfo-subjects">

                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <Information />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-Info.1"/></div>
                </NavLink>

                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/math`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectMath />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-Math.1"/></div>
                </NavLink>

                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/physics`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectPhysics />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-Physics.1"/></div>
                </NavLink>
                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/chemistry`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectChemistry />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-Chemistry.1"/></div>
                </NavLink>
                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/biology`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectBiology />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-Biology.1"/></div>
                </NavLink>
                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/literature`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectLiterature />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-Literature.1"/></div>
                </NavLink>
                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/english`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectEnglish />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-English.1"/></div>
                </NavLink>
                
                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/geography`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectGeography />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-Geography.1"/></div>
                </NavLink>
                <NavLink activeClassName="activeSubjectBar" exact to={`${props.parentUrl}/history`} className="classinfo-subjects-elm">
                    <div className="classinfo-subject-image">
                        <SubjectHistory />
                    </div>
                    <div className="classinfo-subject-name"><TextTranslation textName="ClassInfo-Subject-History.1"/></div>
                </NavLink>
                
            </div>
            
        </div>
    );
}

export default SubjectsBar;