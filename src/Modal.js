import React from 'react';
import Modal from 'react-bootstrap/Modal'


class PopUp extends React.Component{
constructor(props){
  super(props);
  this.state={
    show:true,
  }
}


  render(){

    return (
        <Modal
          show='true'
          >
          <Modal.Header closeButton>
            <Modal.Title>
              !!!  ERROR  !!!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              testsetestsetes
              {this.props.errorMSG}
            </p>
            <p>
              32432432432423
              {this.props.errorCode}
            </p>
          </Modal.Body>
        </Modal>      

    );
    
  }

}
export default PopUp;