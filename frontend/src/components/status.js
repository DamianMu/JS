import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class Status_component extends Component {
    state = {
        status: [],
        newstatusData: {
          name: ''
        },
        editstatusData: {
            name: ''
        },
        newstatusModal: false,
        editstatusModal: false
      }
      componentWillMount() {
        this._refreshstatuss();
      }
      toggleNewstatusModal() {
        this.setState({
          newstatusModal: ! this.state.newstatusModal
        });
      }
      toggleEditstatusModal() {
        this.setState({
          editstatusModal: ! this.state.editstatusModal
        });
      }
      addstatus() {
        axios.post('http://localhost:4000/statuses', this.state.newstatusData).then((response) => {
          let { status } = this.state;
    
          status.push(response.data);
    
          this.setState({ status, newstatusModal: false, newstatusData: {
            name: ''
          }});
        });
      }
      updatestatus() {
        let { name } = this.state.editstatusData;
    
        axios.put('http://localhost:4000/statuses/' + this.state.editstatusData.id, {
            name
        }).then((response) => {
          this._refreshstatuss();

          this.setState({
            editstatusModal: false, editstatusData: { id: '', name: " " }
          })
        });
      }
      editstatus(id, name) {
        this.setState({
          editstatusData: { id, name }, editstatusModal: ! this.state.editstatusModal
        });
      }
      deletestatus(id) {
        axios.delete('http://localhost:4000/statuses/' + id).then((response) => {
          this._refreshstatuss();
        });
      }
      _refreshstatuss() {
        axios.get('http://localhost:4000/statuses').then((response) => {
          this.setState({
            status: response.data
          })
        });
      }
      render() {
        let status = this.state.status.map((status) => {
          return (
            <tr key={status.id}>
              <td>{status.id}</td>
              <td>{status.name}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editstatus.bind(this, status.id, status.name)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deletestatus.bind(this, status.id)}>Delete</Button>
              </td>
            </tr>
          )
        });
        return (
          <div className="App container">
    
          <Button className="my-3" color="primary" onClick={this.toggleNewstatusModal.bind(this)}>Add status</Button>
    
          <Modal isOpen={this.state.newstatusModal} toggle={this.toggleNewstatusModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewstatusModal.bind(this)}>Add a new status</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Status name</Label>
                <Input id="name" value={this.state.newstatusData.name} onChange={(e) => {
                  let { newstatusData } = this.state;
    
                  newstatusData.name = e.target.value;
    
                  this.setState({ newstatusData });
                }} />
              </FormGroup>
                </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addstatus.bind(this)}>Add status</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewstatusModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editstatusModal} toggle={this.toggleEditstatusModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditstatusModal.bind(this)}>Edit status</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Status Name</Label>
                <Input id="name" value={this.state.editstatusData.name} onChange={(e) => {
                  let { editstatusData } = this.state;
    
                  editstatusData.name = e.target.value;
    
                  this.setState({ editstatusData });
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updatestatus.bind(this)}>Update status</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditstatusModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status name</th>
                  </tr>
                </thead>
                <tbody>
                  {status}
                </tbody>
              </Table>
            </div>
          );
        }
}



export default Status_component