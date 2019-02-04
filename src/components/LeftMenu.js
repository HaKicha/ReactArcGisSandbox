import React,{Component} from 'react';
import styled from 'styled-components'

class LeftMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.isPaneOpen
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            visible: nextProps.isPaneOpen
        })
    }

    render() {
        return(
            <Container visible={this.state.visible}>
                {'Тут може бути ваша реклама'}
            </Container>
        )
    }
}

const Container = styled.div`
    position: absolute;
    background: rgba(102,102,102,0.5);
    display: ${props => props.visible?'block':'none'};
    width: 300px;
    height: calc(100vh - 50px);
    top: 50px;
    left: 0;
    z-index: 1000;
`;

const Button = styled.button`
    
`

export default LeftMenu;