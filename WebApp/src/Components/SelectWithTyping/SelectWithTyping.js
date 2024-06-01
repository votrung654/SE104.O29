import React from 'react';

import { Select } from 'antd';

const { Option } = Select;



const SelectWithTyping = (props) => {

    function onChange(value) {
        console.log(`selected ${value}`);
        props.callbackSelection(value);
        //setSelectedValue(value);
    }
    
    function onBlur() {
        console.log('blur');
    }
    
    function onFocus() {
        console.log('focus');
    }
    
    function onSearch(val) {
        console.log('search:', val);
    }

    const renderOptions = () => {
        const classes = props.options;
        if(classes.length){
            return classes.map((e)=>{
                return <Option key={e[props.optionName]} value={e[props.optionValue]}>{e[props.optionName]}</Option>
            });
        }
        return null;
    }

    let optionElms = renderOptions();

    // const [selectedValue, setSelectedValue] = useState();
    
    // useEffect(()=>{
    //     if(props.value && props.value !== selectedValue){
    //         setSelectedValue(props.value);
    //     } 
    // },[props.value]);


    
    return(
        <Select
            showSearch
            style={{ width: props.width || "100%" }}
            placeholder={props.placeholder}
            optionFilterProp="children"
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            disabled={props.disabled || false}
            //value={selectedValue}
            defaultValue={props.defaultValue}
        >
            {optionElms}
        </Select>
    )
}

export default SelectWithTyping;