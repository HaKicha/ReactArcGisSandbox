import React, {Component} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList,faFilter,faEye,faEyeSlash, faSlidersH, faCompress} from "@fortawesome/free-solid-svg-icons";
import {faEye as faEyeRegular,faEyeSlash as faEyeSlashRegular} from "@fortawesome/free-regular-svg-icons";

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPointsVisible: true,
            isHeatmapVisible: false
        }
    }

    showMapPoints = () => {
        this.props.showMapPoints();
        this.setState((prevState) => {return {isPointsVisible: !prevState.isPointsVisible}});
    };

    showHeatmap = () => {
        this.props.showHeatmap();
        this.setState((prevState) => {return {isHeatmapVisible: !prevState.isHeatmapVisible}});
    };


    openLeftPane = () => {
        if (document.getElementById('leftPane').style.display === 'none') {
            document.getElementById('leftPane').style.display = 'block';
        }
        else document.getElementById('leftPane').style.display = 'none';
    };


    render() {
        return (
            <NavbarUl>
                <NavbarLi onClick={this.openLeftPane}>
                    <NavbarElem>
                        <FontAwesomeIcon icon={faList}/>
                    </NavbarElem>
                </NavbarLi>

                <NavbarLi>
                    <NavbarElem onClick={this.props.toggleFilters}>
                        <FontAwesomeIcon icon={faFilter}/>
                    </NavbarElem>
                </NavbarLi>

                <NavbarLi>
                    <NavbarElem onClick={this.props.toggleSettings}>
                        <FontAwesomeIcon icon={faSlidersH}/>
                    </NavbarElem>
                </NavbarLi>

                <NavbarLi onClick={this.showHeatmap} className={'right'}>
                    <NavbarElem>
                        <FontAwesomeIcon icon={(this.state.isHeatmapVisible)?faEyeRegular:faEyeSlashRegular}/>
                    </NavbarElem>
                </NavbarLi>

                <NavbarLi onClick={this.showMapPoints} className={'right'}>
                    <NavbarElem>
                        <FontAwesomeIcon icon={(this.state.isPointsVisible)?faEyeSlash:faEye}/>
                    </NavbarElem>
                </NavbarLi>

            </NavbarUl>
        )
    }
}

const NavbarUl = styled.ul`
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #e2ecff;
       .right {
      float: right;
    }
`;

const NavbarLi = styled.li`
    float: left;
    :hover {
        background-color: #46b2f8;
        cursor: pointer;
        color: white;
    }

`;


const NavbarElem = styled.svg`
  display: block;
  color: #46b2f8;
  padding: 14px 16px;
  height: 22px;
  cursor: pointer;
  width: 22px;
  &:hover {
    color: white;
  }
`;

export default Navbar;