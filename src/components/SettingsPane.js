import React from 'react';
import Modal from 'react-modal';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';



Modal.setAppElement('#root');
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        background            : '#e5f4fc'
    }
};
export default class SettingsPane extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            isSettingsOpen: this.props.isSettingsOpen
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isSettingsOpen: nextProps.isSettingsOpen
        });
    }


    applyPriority = () => {
        this.props.closeSettings();
    }

    render() {

        return(
            <Modal
                isOpen={this.state.isSettingsOpen}
                style={customStyles}
                contentLabel="Example Modal">
                <Container>
                    <MainHeader style={{margin:'0', width: '300px'}}>Priority</MainHeader>
                    <CloseButton onClick={this.props.closeSettings}>
                        <FontAwesomeIcon icon={faTimes}
                                                  style={{
                                                      display: 'block',
                                                      cursor: 'pointer'
                                                  }}
                                                  size={'2x'}/>
                    </CloseButton>
                    <br/>
                    <br/>
                    <Label>CIMIC</Label>
                    <input id={'#priority'} type="range" defaultValue={1} max={2} min={0}/>
                    <Label>Military</Label>
                    <Button onClick={this.applyPriority}>Apply</Button>
                </Container>
            </Modal>
        )
    }

}

const Container = styled.div`
  width: 400px;
  padding-bottom: 10px;
  
  input[type=range] {
  height: 10px;
  -webkit-appearance: none;
  margin: 0 10px;
  width: 65%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 16px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000;
  background: #C3CFD6;
  border-radius: 50px;
  border: 1px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  height: 12px;
  width: 24px;
  border-radius: 12px;
  background: #213C69;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: 1px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #C3CFD6;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 16px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 1px 1px 1px #000000;
  background: #C3CFD6;
  border-radius: 50px;
  border: 1px solid #000000;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  height: 12px;
  width: 24px;
  border-radius: 12px;
  background: #213C69;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 16px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #C3CFD6;
  border: 1px solid #000000;
  border-radius: 100px;
  box-shadow: 1px 1px 1px #000000;
}
input[type=range]::-ms-fill-upper {
  background: #C3CFD6;
  border: 1px solid #000000;
  border-radius: 100px;
  box-shadow: 1px 1px 1px #000000;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 1px 1px 1px #000000;
  border: 1px solid #000000;
  height: 12px;
  width: 24px;
  border-radius: 12px;
  background: #213C69;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #C3CFD6;
}
input[type=range]:focus::-ms-fill-upper {
  background: #C3CFD6;
}
`;

const MainHeader = styled.h2`
  margin: 0 0 20px 0px;
  padding-left: 50px;
  width: 300px;
  display: inline-block;
  text-align: center;
`;

const CloseButton = styled.div`
  height: 32px;
  width: 22px;
  padding: 0 5px;
  display: block;
  float: right;
  path{
    cursor: pointer;
    fill: gray;
      &:hover {
        fill: black;
      }
  }
`;

const Label = styled.label`
  margin: 10px auto;
`;

const Button = styled.button`
  display: block;
  margin: 15px 20px 0 0;
  background: #46b2f8;
  width: 90px;
  height: 35px;
  color: white;
  border: 1px #999 solid;
  border-radius: 10px;
  float: right;
  cursor: pointer;
  font-size: 16px;
  &:hover{
    background: #21a7ff;
  }
`;
