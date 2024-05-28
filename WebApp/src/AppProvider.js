import React from "react";
import {ConfigProvider} from "antd";
import enUS from 'antd/es/locale/en_US';
import {ThemeProvider} from "styled-components";
import {useSelector} from "react-redux";


export default function AppProvider({children}) {

    const currentTheme = useSelector(state => state.themeSwitcher.current);

    return (
        <ConfigProvider locale={enUS}>
            <ThemeProvider theme={currentTheme}>
                {children}
            </ThemeProvider>
        </ConfigProvider>
    );
}