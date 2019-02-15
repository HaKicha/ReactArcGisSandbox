import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Switch from 'react-router/es/Switch';
import {Provider} from "mobx-react";
import mapObjectStore from '../stores/mapObjectStore';
import App from './App';

const objectStore = new mapObjectStore();

export default class MainRouter extends React.Component{

    render() {
        return (
            <Provider store={objectStore}>
                <Router>
                    <Switch>
                        <Route exact path={'/'} component={App}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}