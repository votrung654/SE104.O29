import React from 'react';
import './RowInTable.css';
import TextTranslation from '../../../../../Components/TextTranslation/TextTranslation';
const RowInTable = ({studentID, studentName, sex, DOB, address, editAction}) => {
    return (
        <div className="row">
            <div className="cell w10pcM13px" >
            1
            </div>
            <div className="cell w30pcP8px" >
            Nguyen Thi Minh A
            </div>
            <div className="cell w10pc" >
            8
            </div>
            <div className="cell w10pc">
            9
            </div>
            <div className="cell w10pc">
            7.5
            </div>
            <div className="cell w10pc">
            6.5
            </div>
            <div className="cell w10pc">
            8.25
            </div>
            
            <div id="RIT-btnEdit" className="cell w10pc">
                <div onClick={()=>editAction()}><TextTranslation textName="ClassInfo-Table-Edit.1"/></div>
            </div>

        </div>
    )
}

export default RowInTable;