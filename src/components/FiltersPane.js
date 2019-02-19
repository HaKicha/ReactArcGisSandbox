import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');
const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
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

                <button onClick={this.props.closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        )
    }

}