import React from 'react';
import Modal from 'react-modal';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import styled from 'styled-components';
import Flatpickr from 'react-flatpickr'
import {inject} from "mobx-react";
import {reloadGraphics} from '../components/Map'



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
@inject('store')
export default class FiltersPane extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            isFiltersOpen: this.props.isFiltersOpen
        }
    }

    mapObjStore = this.props.store;

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isFiltersOpen: nextProps.isFiltersOpen
        });
    }

    clearFilters = () => {
        this.mapObjStore.clearFilters();
        this.props.closeModal();
        setTimeout(this.props.showMapPoints,0);
        setTimeout(this.props.showMapPoints,100);
    };

    applyFilters = () => {
        this.mapObjStore.applyFilters(this.searchExpression);
        reloadGraphics();
        this.props.closeModal();
        setTimeout(this.props.showMapPoints,0);
        setTimeout(this.props.showMapPoints,100);
    };

    searchExpression = {
        eventType: '',
        sourceType: '',
        victims_min: '',
        victims_max: '',
        injured_min: '',
        injured_max: '',
        startDate: '',
        endDate: ''
    };

    render() {
        this.searchExpression = {
            eventType: '',
            sourceType: '',
            victims_min: '',
            victims_max: '',
            injured_min: '',
            injured_max: '',
            startDate: '',
            endDate: ''
        };
        return(
            <Modal
                isOpen={this.state.isFiltersOpen}
                style={customStyles}
                contentLabel="Example Modal">
                <Container>
                    <MainHeader style={{margin:'0', width: '300px'}}>Filters</MainHeader>
                    <CloseButton><FontAwesomeIcon icon={faTimes} onClick={this.clearFilters}
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
                        <TextInput id={'eventType'} onChange={(event) => {this.searchExpression.eventType = event.target.value}}/>
                    </div>
                    <div style={{display: 'inline'}}>
                        <Label  htmlFor="sourceType">Source:</Label>
                        <SelectInput name="" id="sourceType" onChange={(event) => {this.searchExpression.sourceType = event.target.value}}>
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
                        <NumberInput id={'victims_max'} type={'number'} placeholder={'max'} min={'0'}
                                     onChange={(event) => {this.searchExpression.victims_max = event.target.value}}/>
                        <NumberInput id={'victims_min'} type={'number'} placeholder={'min'} min={'0'}
                                     onChange={(event) => {this.searchExpression.victims_min = event.target.value}}/>

                    </div>
                    <div>
                        <Label htmlFor="injured_min">Injured:</Label>
                        <NumberInput id={'injured_max'} type={'number'} placeholder={'max'} min={'0'}
                                     onChange={(event) => {this.searchExpression.injured_max = event.target.value}}/>
                        <NumberInput id={'injured_min'} type={'number'} placeholder={'min'} min={'0'}
                                     onChange={(event) => {this.searchExpression.injured_min = event.target.value}}/>
                    </div>
                    <div>
                        <Label htmlFor="datepicker">Date:</Label>
                        <Flatpickr data-enable-time options={{mode: "range"}} id={'datepicker'} onChange={date => {
                            if(typeof date[1] !== 'undefined') {
                                this.searchExpression.startDate = date[0].valueOf();
                                this.searchExpression.endDate = date[1].valueOf();
                            }}}/>
                    </div>
                    <Button bgColor={'#46b2f8'} hoverColor={'#21a7ff'} color={'white'} onClick={this.applyFilters}>Apply</Button>
                    <Button bgColor={'white'} hoverColor={'#e0f2ff'} color={'black'} onClick={this.clearFilters}>Clear</Button>
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
