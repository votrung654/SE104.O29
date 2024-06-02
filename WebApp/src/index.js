import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import {Provider} from 'react-redux';
import store from "./Redux/store";
import ErrorBoundary from "./ErrorBoundary";
import AppProvider from "./AppProvider";
import 'antd/dist/antd.css';
import './i18n';

ReactDOM.render(
    <Provider store={store}>
        <AppProvider>
            <ErrorBoundary>
                <Suspense fallback="loading">
                    <App />
                </Suspense>
            </ErrorBoundary>
        </AppProvider>
    </Provider>
    
,
  document.getElementById('root')
);

