import React, {Component} from 'react';
import styled from 'styled-components'
import LeftMenuObjectPane from './LeftMenuObjectPane'


class LeftMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.isPaneOpen
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.isPaneOpen
        })
    }

    render() {
        return (
            <Container visible={this.state.visible}>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
                <LeftMenuObjectPane/>
            </Container>
        )
    }
}

const Container = styled.div`
    position: absolute;
    background: rgba(226, 236, 255, 0);
    display: ${props => props.visible ? 'block' : 'none'};
    width: 200px;
    height: calc(100vh - 50px);
    top: 50px;
    left: 0;
    z-index: 1000;
    overflow: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
        width: 0;
        background: transparent;
    }
`;

const Button = styled.button`
    
`

export default LeftMenu;