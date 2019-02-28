import React,{Component} from 'react';
import styled from 'styled-components';
import twitterLogo from '../resources/image/twitter_logo.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faAngleUp,faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import facebookLogo from '../resources/image/facebook_icon.png';
import gichdLogo from '../resources/image/gichd_icon.png';
import natoLogo from '../resources/image/nato_icon.png';
import newsLogo from '../resources/image/news_icon.png';
import {goToPoint} from './Map'

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
    };

    clickHandler =()=>{
        goToPoint(this.props.options.latitude, this.props.options.longitude);
    }

    render() {
        let logo;
        switch (this.props.options.source) {
            case 'twitter': {
                logo = twitterLogo;
                break;
            }case 'facebook': {
                logo = facebookLogo;
                break;
            }case 'nato': {
                logo = natoLogo;
                break;
            }case 'news': {
                logo = newsLogo;
                break;
            }case 'gichd': {
                logo = gichdLogo;
                break;
            }
        }
        return(
        <Container opened={this.state.opened}>
            <InfoBlock>
                <a href={this.props.options.link}>
                    <Image src={logo}/>
                </a>
                <ActionType><b>{this.props.options.actionType}</b></ActionType>
                <Date >{this.props.options.timestamp}</Date>
                <FontAwesomeIcon icon={faMapMarkerAlt}
                                 style={{display:(this.state.opened)?'block':'none',
                                     float:'left',
                                     marginRight: '17px',
                                     marginLeft: '17px',
                                     marginTop:'2px',
                                     color:'#ad0000',
                                     cursor: 'pointer'}} size={'lg'}
                                    onClick={this.clickHandler}/>
                <Info opened={this.state.opened}>Victims: {this.props.options.victims}</Info>
            </InfoBlock>
            <FontAwesomeIcon icon={(this.state.opened?faAngleUp:faAngleDown)} onClick={this.togglePane} size={'lg'}
            style={{margin: '3px 5px 0 0', color:'#333',cursor:'pointer'}}/>
        </Container>
    )}
}

const Container = styled.div`
    padding: 5px;
    width: 236px;
    height: ${props => (props.opened)?'90px':'46px'};
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
    margin: 0px 5px 5px 5px;
    float: left;
`;

const InfoBlock = styled.div`
    display: block;
    width: 236px;  
`;

const ActionType = styled.ins`
        margin: 0;
        height: 20px;
`;

const Date = styled.p`
    display: block;
    margin: 0;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 20px;
    font-size: 15px; 
`;

const Info = styled.b`
    margin: 2px;
    font-size: 15px;
    display: block;
    display: ${props => (props.opened)?'block':'none'};
   
`;

const MapMarker = styled.div`
    margin: 3px;
    margin-right: 10px;
    color: dark-blue;
    cursor: pointer;
`;