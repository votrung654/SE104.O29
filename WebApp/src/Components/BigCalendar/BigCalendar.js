import React , {useState, useEffect} from 'react';
import { Calendar, Alert, Badge, Card } from 'antd';
import moment from 'moment';
import 'antd/dist/antd.css';
import './BigCalendar.css';
 
const BigCalendar = ({width = 95}) => {
 
    // First loading
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setIsLoading(false);
        }, 1000);
    });
 
    const [value, setValue] = useState();
    const [selectedValue, setSelectedValue] = useState(moment);
 
    const onSelect = value => {
        setValue(value);
        setSelectedValue(value);
     
    };
 
    const onPanelChange = value =>
    {
        setValue(value);
    };
 
   
 
    //const { value, selectedValue } = this.state;
    return (
        <div id="big-calendar-wrapper" style={{width : `${width}%`, margin: 25}}>
        <Alert
        message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
        />
        <Card loading={isLoading}>
            <Calendar fullscreen={true} style={{padding: 25}} dateCellRender={dateCellRender} monthCellRender={monthCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
        </Card>
           
        </div>
    );
  }
 
  function getListData(value) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'Coi thi' },
          { type: 'success', content: 'Báo cáo đồ án.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'Coi thi' },
          { type: 'success', content: 'Báo cáo đồ án.' },
          { type: 'error', content: 'Đăng ký thất bại.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'Đồ án quan trọng' },
          { type: 'success', content: 'Đăng ký đang được xử lí。。....' },
          { type: 'error', content: 'Đăng ký lỗi 1.' },
          { type: 'error', content: 'Đăng ký lỗi 2.' },
          { type: 'error', content: 'Đăng ký lỗi 3.' },
          { type: 'error', content: 'Đăng ký lỗi 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
 
  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
 
  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
 
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Sự kiện tháng</span>
      </div>
    ) : null;
  }
 
 
  export default BigCalendar;