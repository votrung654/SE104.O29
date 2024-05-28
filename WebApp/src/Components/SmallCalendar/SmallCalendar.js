import React , {useState} from 'react';
import { Calendar, Alert } from 'antd';
import moment from 'moment';
import './SmallCalendar.css';

const SmallCalendar = ({width = 90}) => {
  /*state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  };*/

  const [value, setValue] = useState();
  const [selectedValue, setSelectedValue] = useState();

  const onSelect = value => {
      setValue(value);
      setSelectedValue(value);
    
  };

  const onPanelChange = value => {
    setValue(value);
  };

  

    //const { value, selectedValue } = this.state;
    return (
      <div id="small-calendar-wrapper" style={{width : `${width}%`, margin : "auto"}}>
        <Alert
          message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
        />
        <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
      </div>
    );
}


export default SmallCalendar;