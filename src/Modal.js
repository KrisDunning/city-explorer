import React from 'react';
import Modal from 'react-bootstrap/Modal'


class PopUp extends React.Component{
  constructor(props){
    super(props);
    this.state={
      show:true,
    }
  }

  handleClose=()=>{
    this.setState({
      show:false,
    })
  }

  render(){

    return (
        <Modal
          show={this.state.show}
          onHide= {this.handleClose}
          >
          <Modal.Header closeButton>
            <Modal.Title>
              <p>
              {this.props.errorCode}
              </p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.props.errorMsg}
            </p>
          </Modal.Body>
        </Modal>      

    );
    
  };

};
export default PopUp;