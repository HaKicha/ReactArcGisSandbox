import React, {Component} from 'react';
import styled from 'styled-components'
import LeftMenuObjectPane from './LeftMenuObjectPane'
import {inject, observer} from "mobx-react";
import geoJsonToEsriJson from '../modules/GeoJsonParser';

@inject('store')
@observer
class LeftMenu extends Component {

    mapObjectStore = this.props.store.store;
    createPanels = () => {
        return this.props.store.store.map(elem => {
            let geoData = geoJsonToEsriJson(elem.geoData)[0];
            let options = {
                actionType: elem.actionType,
                source: elem.source,
                victims: elem.victims,
                injured: elem.injured,
                timestamp: (new Date(Date.parse(elem.timestamp)).toLocaleString() + '').replace(',',''),
                link: elem.link,
                latitude: geoData.latitude,
                longitude: geoData.longitude
            };
            return(
                <LeftMenuObjectPane options={options} key={elem.id}/>
            )
        })
    };
    panels = [];

    constructor(props) {
        super(props);
    }


    render() {
        this.panels = this.createPanels();
        return (
            <Container id={'leftPane'} style={{display:'none'}}>
                {this.panels}
            </Container>
        )
    }
}

const Container = styled.div`
    position: absolute;
    background: rgba(226, 236, 255, 0);
    width: 250px;
    height: calc(100vh - 50px);
    top: 50px;
    left: 0;
    z-index: 10;
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
`;


export default LeftMenu;