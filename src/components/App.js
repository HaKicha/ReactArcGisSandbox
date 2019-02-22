import React, {Component} from "react";
import {Map} from './Map';
import Navbar from "./Navbar";
import styled from 'styled-components';
import LeftMenu from './LeftMenu'
import FiltersPane from "./FiltersPane";
import {reloadGraphics} from '../components/Map'

    class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isGraphicsVisible: false,
            isModalOpen: false
        }
    }


    showMapPoints = () => {
        this.setState((prevState) => {
            return {isGraphicsVisible: !prevState.isGraphicsVisible}
        });
    };

    toggleModal = () => {
        this.setState((prevState) => {
            return {isModalOpen: !prevState.isModalOpen}
        });
        reloadGraphics();
    }


    render() {
        return (
            <Container>
                <Navbar showMapPoints={this.showMapPoints} openFilters={this.toggleModal}/>
                <LeftMenu isPaneOpen={this.state.isPaneOpen}/>
                <div style={{width: "100%", height: "100%"}} >
                    <Map isGraphicsVisible={this.state.isGraphicsVisible}/>
                </div>
                <FiltersPane closeModal={this.toggleModal} isModalOpen={this.state.isModalOpen} showMapPoints={this.showMapPoints}/>
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