import React,{Component} from 'react';
import styled from 'styled-components';
import twitterLogo from '../resources/image/twitter_logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp,faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";

export default class LeftMenuObjectPane extends Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }

    togglePane = () => {
        this.setState(prevState => {
            return{opened: !prevState.opened}
        })
    }


    render() {
        return(
        <Container opened={this.state.opened}>
            <InfoBlock>
                <a href="#">
                    <Image src={twitterLogo}/>
                </a>
                <ActionType>Event title  </ActionType>
                <Date >11.22.63 12:30</Date>
                <FontAwesomeIcon icon={faMapMarkerAlt}
                                 style={{display:(this.state.opened)?'block':'none',
                                     float:'left',
                                     marginRight: '17px',
                                     marginLeft: '17px',
                                     marginTop:'2px',
                                     color:'#ad0000',
                                     cursor: 'pointer'}} size={'lg'}/>
                <Info opened={this.state.opened}>Victims: 0</Info>
                <Info opened={this.state.opened}>Wounded: 0</Info>
            </InfoBlock>
            <FontAwesomeIcon icon={(this.state.opened?faAngleUp:faAngleDown)} onClick={this.togglePane} size={'lg'}
            style={{margin: '3px 5px 0 0', color:'#333',cursor:'pointer'}}/>
        </Container>
    )}
}

const Container = styled.div`
    padding: 5px;
    width: 186px;
    height: ${props => (props.opened)?'80px':'46px'};
    background: rgba(226, 236, 255, 0.5);
    margin-top: 2px;
    border: 1px solid #555;
    border-radius: 3px;
    display: inline-flex;
`;

const Image = styled.img`
    width: 40px;
    height: 40px;
    display: block;
    cursor: pointer;
    margin: 5px 5px;
    float: left;
`;

const InfoBlock = styled.div`
    display: block;
    width: 186px;  
`;

const ActionType = styled.ins`
        margin: 0;
        height: 20px;
`;

const Date = styled.samp`
    display: block;
    margin: 0;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 20px;
    font-size: 13px; 
`;

const Info = styled.b`
    margin: 2px;
    font-size: 12px;
    display: block;
    display: ${props => (props.opened)?'block':'none'};
   
`;

const MapMarker = styled.div`
    margin: 3px;
    margin-right: 10px;
    color: dark-blue;
    cursor: pointer;
`;