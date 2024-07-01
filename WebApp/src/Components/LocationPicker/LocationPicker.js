import React, {useState} from 'react';
import { Input } from 'antd';
import SelectWithTyping from '../SelectWithTyping/SelectWithTyping';
import LocationVN from './LocationVN.json';


const LocationPicker = (props) => {

    const [areaInSelectedCity, setAreaInSelectedCity] = useState([]);

    const mapAreasToArray = (areas) => {
        let result = [];
        console.log(areas);
        for (let area of Object.values(areas)) {
            result.push({name : area})
        }
        return result;
    }

    const onSelectCity = (selectedCity) => {
        for (let city of Object.values(LocationVN)) {
            if(city.name === selectedCity) {
                setAreaInSelectedCity(mapAreasToArray(city.cities));
                return true;
            }
            
        }
    }

    let cityOptions = [];
    for (let city of Object.values(LocationVN)) {
        cityOptions.push(city);
    }

    


    return(
        <div>
        <Input 
            onChange={(val)=>props.callbackChanges({
                ...props.address,
                detailsAddress : val.target.value
            })}
         placeholder="Details Address"  style={{width : "40%"}}/>
        
        
        <SelectWithTyping 
            options={areaInSelectedCity} 
            optionName="name" 
            optionKey="name" 
            placeholder="District"
            callbackSelection={(val)=>{
                props.callbackChanges({
                    ...props.address,
                    district : val
                })
            }}
            width="30%"
            disabled={(areaInSelectedCity.length===0)}
        />
        <SelectWithTyping 
            options={cityOptions} 
            optionName="name" 
            optionKey="name" 
            placeholder="City"
            callbackSelection={(val)=>{
                onSelectCity(val);
                props.callbackChanges({
                    ...props.address,
                    city : val
                })
            }}
            width="30%"
            
        />

        </div>

    );
}

export default LocationPicker;