import React from 'react';
import Modal from 'react-modal';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import Flatpickr from 'react-flatpickr'

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

export default class FiltersPane extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: this.props.isModalOpen
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isModalOpen: nextProps.isModalOpen
        });
    }

    render() {
        return(
            <Modal
                isOpen={this.state.isModalOpen}
                style={customStyles}
                contentLabel="Example Modal">
                <Container>
                    <MainHeader style={{margin:'0', width: '300px'}}>Filters</MainHeader>
                    <CloseButton><FontAwesomeIcon icon={faTimes} onClick={this.props.closeModal}
                    style={{
                        display: 'block',
                        cursor: 'pointer'
                    }}
                    size={'2x'}/>
                    </CloseButton>
                    <br/>
                    <br/>
                    <div>
                        <Label htmlFor="eventType">Event type:</Label>
                        <TextInput id={'eventType'}/>
                    </div>
                    <div style={{display: 'inline'}}>
                        <Label htmlFor="sourceType">Source:</Label>
                        <SelectInput name="" id="sourceType">
                            <option value="">All</option>
                            <option value="twitter">Twitter</option>
                            <option value="facebook">Facebook</option>
                            <option value="nato">Nato</option>
                            <option value="news">News</option>
                            <option value="gichd">GICHD</option>
                        </SelectInput>
                    </div>
                    <div>
                        <Label htmlFor="victims_min">Victims:</Label>
                        <NumberInput id={'victims_max'} type={'number'} placeholder={'max'} min={'0'}/>
                        <NumberInput id={'victims_min'} type={'number'} placeholder={'min'} min={'0'}/>

                    </div>
                    <div>
                        <Label htmlFor="injured_min">Injured:</Label>
                        <NumberInput id={'injured_max'} type={'number'} placeholder={'max'} min={'0'}/>
                        <NumberInput id={'injured_min'} type={'number'} placeholder={'min'} min={'0'}/>
                    </div>
                    <div>
                        <Label htmlFor="datepicker">Date:</Label>
                        <Flatpickr data-enable-time options={{mode: "range"}} id={'datepicker'}/>
                    </div>
                    <Button bgColor={'#46b2f8'} hoverColor={'#21a7ff'} color={'white'}>Apply</Button>
                    <Button bgColor={'white'} hoverColor={'#e0f2ff'} color={'black'}>Clear</Button>
                </Container>
            </Modal>
        )
    }

}

const Container = styled.div`
  width: 400px;
  input.flatpickr-input {
      width: 231px;
      margin: 5px 20px;
      border: #777 1px solid;
      border-radius: 3px;
      background: #fff;
      color: black;
      height: 25px;
      float: right;
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

const TextInput = styled.input`
  margin: 5px  20px;
  border: #777 1px solid;
  border-radius: 3px;
  background: #fff;
  height: 25px;
  width: 230px;
  font-size: 20px;
  color: black;
  float: right;
  display: block;
`;

const Label = styled.label`
  display: inline-block;
  margin: 15px;
`;

const SelectInput = styled.select`
  margin: 5px 20px;
  border: #777 1px solid;
  border-radius: 3px;
  background: #fff;
  height: 30px;
  width: 234px;
  font-size: 20px;
  color: black;
  float: right;
  display: block;
`;

const NumberInput = styled.input`
  margin: 5px  20px 5px 6px;
  border: #777 1px solid;
  border-radius: 3px;
  background: #fff;
  height: 25px;
  width: 100px;
  font-size: 20px;
  color: black;
  float: right;
  display: block;
`;

const Button = styled.button`
  display: block;
  margin: 5px 20px 0 0;
  background: ${props => props.bgColor};
  width: 90px;
  height: 35px;
  color: ${props => props.color};
  border: 1px #999 solid;
  border-radius: 10px;
  float: right;
  cursor: pointer;
  font-size: 16px;
  &:hover{
    background: ${props => props.hoverColor};
  }
`;
