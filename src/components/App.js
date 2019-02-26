import React, {Component} from "react";
import {Map} from './Map';
import Navbar from "./Navbar";
import styled from 'styled-components';
import LeftMenu from './LeftMenu'
import FiltersPane from "./FiltersPane";
import {reloadGraphics} from '../components/Map'
import SettingsPane from "./SettingsPane";

    class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isGraphicsVisible: true,
            isFiltersOpen: false,
            isSettingsOpen: false,
            isHeatmapVisible: false
        }
    }


    showMapPoints = () => {
        this.setState((prevState) => {
            return {isGraphicsVisible: !prevState.isGraphicsVisible,
                    isHeatmapVisible: prevState.isHeatmapVisible}
        });
    };

    showHeatmap = () => {
        this.setState((prevState) => {
            return {isHeatmapVisible: !prevState.isHeatmapVisible,
                    isGraphicsVisible: prevState.isGraphicsVisible}
        });
    };

    toggleFilters = () => {
        this.setState((prevState) => {
            return {isFiltersOpen: !prevState.isFiltersOpen}
        });
        reloadGraphics();
    }

    toggleSettings = () => {
        this.setState((prevState) => {
            return {isSettingsOpen: !prevState.isSettingsOpen}
        });
    }

    render() {
        return (
            <Container>
                <Navbar showMapPoints={this.showMapPoints}
                        showHeatmap={this.showHeatmap}
                        toggleFilters={this.toggleFilters}
                        toggleSettings={this.toggleSettings}/>
                <LeftMenu isPaneOpen={this.state.isPaneOpen}/>
                <div style={{width: "100%", height: "100%"}} >
                    <Map isGraphicsVisible={this.state.isGraphicsVisible}
                         isHeatmapVisible={this.state.isHeatmapVisible}/>
                </div>
                <FiltersPane closeModal={this.toggleFilters}
                             isFiltersOpen={this.state.isFiltersOpen}
                             showMapPoints={this.showMapPoints}/>

                <SettingsPane
                closeSettings={this.toggleSettings}
                isSettingsOpen={this.state.isSettingsOpen}/>
            </Container>
        );
    }


}

const Container = styled.div`
    margin: 0;
    padding: 0; 
    border: 0;
`;
export default App;