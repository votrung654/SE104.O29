import { combineReducers } from 'redux';
import classData from './Reducers/ClassData/reducers';
import themeSwitcher from './ThemeSwitcher/reducers'
import yearData from './Reducers/YearData/reducers';

export default combineReducers({
    yearData,
    classData,
    themeSwitcher,
});