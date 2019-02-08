import React, {Component} from "react";
import Map from './Map';
import Navbar from "./Navbar";
import styled from 'styled-components';
import LeftMenu from './LeftMenu'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            //    TODO pane content
            isGraphicsVisible: false
        }
    }

    openLeftPane = () => {
        this.setState((prevState) => {
            return {isPaneOpen: !prevState.isPaneOpen}
        });
    };

    showMapPoints = () => {
        this.setState((prevState) => {
            return {isGraphicsVisible: !prevState.isGraphicsVisible}
        });
    };


    render() {
        return (
            <Container>
                <Navbar openLeftPane={this.openLeftPane} showMapPoints={this.showMapPoints}/>
                <LeftMenu isPaneOpen={this.state.isPaneOpen}/>
                <div style={{width: "100%", height: "100%"}} >
                    <Map isGraphicsVisible={this.state.isGraphicsVisible}/>
                </div>
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