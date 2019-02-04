import React,{Component} from 'react'
import styled from 'styled-components'

class Navbar extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavbarUl>
                <NavbarLi onClick={this.props.openFirstPane}>
                    <Navbar_Span>Lorem</Navbar_Span>
                </NavbarLi>

                <NavbarLi>
                    <Navbar_Span>Lorem</Navbar_Span>
                </NavbarLi>

                <NavbarLi>
                    <Navbar_Span>Lorem</Navbar_Span>
                </NavbarLi>

                <NavbarLi>
                    <Navbar_Span>Lorem</Navbar_Span>
                </NavbarLi>

                <NavbarLi>
                    <Navbar_Span>Lorem</Navbar_Span>
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
      background-color: #333;
`;

const NavbarLi = styled.li`
    float: left;
    :hover {
        background-color: #111;
        cursor: pointer;
    }
    :last-child {
        float: right;
    }
`;

const Navbar_Span = styled.span`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  color: #3ec944;
  height: 22px;
  cursor: pointer;
`;

export default Navbar;