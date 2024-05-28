import React from 'react';
import TextTranslation from '../../Components/TextTranslation/TextTranslation';
import { Button } from 'antd';

const ButtonWithLoading = (props) => {

    // const [isLoading, setIsLoading] = useState(false);

    // const enterLoading = index => {
    //     props.onClick();
    //     setIsLoading(true);
    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, props.maxTimeLoading || 1000);
    // };

    return (
        <Button style={{marginRight: '7px'}} disabled={props.disabled || false} type="primary" loading={props.isLoading || false} onClick={props.onClick}>
            <TextTranslation textName={`ClassInfo-Table-${props.label}.1`} kClass="pcview"/>
        </Button>
    );
}

export default ButtonWithLoading;