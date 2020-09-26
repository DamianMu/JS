import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class Priorities_component extends Component {
    state = {
        priority: [],
        newpriorityData: {
          name: ''
        },
        editpriorityData: {
            name: ''
        },
        newpriorityModal: false,
        editpriorityModal: false
      }
      componentWillMount() {
        this._refreshprioritys();
      }
      toggleNewpriorityModal() {
        this.setState({
          newpriorityModal: ! this.state.newpriorityModal
        });
      }
      toggleEditpriorityModal() {
        this.setState({
          editpriorityModal: ! this.state.editpriorityModal
        });
      }
      addpriority() {
        axios.post('http://localhost:4000/priorities', this.state.newpriorityData).then((response) => {
          let { priority } = this.state;
    
          priority.push(response.data);
    
          this.setState({ priority, newpriorityModal: false, newpriorityData: {
            name: ''
          }});
        });
      }
      updatepriority() {
        let { name } = this.state.editpriorityData;
    
        axios.put('http://localhost:4000/priorities/' + this.state.editpriorityData.id, {
            name
        }).then((response) => {
          this._refreshprioritys();

          this.setState({
            editpriorityModal: false, editpriorityData: { id: '', name: " " }
          })
        });
      }
      editpriority(id, name) {
        this.setState({
          editpriorityData: { id, name }, editpriorityModal: ! this.state.editpriorityModal
        });
      }
      deletepriority(id) {
        axios.delete('http://localhost:4000/priorities/' + id).then((response) => {
          this._refreshprioritys();
        });
      }
      _refreshprioritys() {
        axios.get('http://localhost:4000/priorities').then((response) => {
          this.setState({
            priority: response.data
          })
        });
      }
      render() {
        let priority = this.state.priority.map((priority) => {
          return (
            <tr key={priority.id}>
              <td>{priority.id}</td>
              <td>{priority.name}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editpriority.bind(this, priority.id, priority.name)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deletepriority.bind(this, priority.id)}>Delete</Button>
              </td>
            </tr>
          )
        });
        return (
          <div className="App container">
    
          <Button className="my-3" color="primary" onClick={this.toggleNewpriorityModal.bind(this)}>Add priority</Button>
    
          <Modal isOpen={this.state.newpriorityModal} toggle={this.toggleNewpriorityModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewpriorityModal.bind(this)}>Add a new priority</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Priority name</Label>
                <Input id="name" value={this.state.newpriorityData.name} onChange={(e) => {
                  let { newpriorityData } = this.state;
    
                  newpriorityData.name = e.target.value;
    
                  this.setState({ newpriorityData });
                }} />
              </FormGroup>
                </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addpriority.bind(this)}>Add priority</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewpriorityModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editpriorityModal} toggle={this.toggleEditpriorityModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditpriorityModal.bind(this)}>Edit priority</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Priority Name</Label>
                <Input id="name" value={this.state.editpriorityData.name} onChange={(e) => {
                  let { editpriorityData } = this.state;
    
                  editpriorityData.name = e.target.value;
    
                  this.setState({ editpriorityData });
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updatepriority.bind(this)}>Update priority</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditpriorityModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Priority name</th>
                  </tr>
                </thead>
                <tbody>
                  {priority}
                </tbody>
              </Table>
            </div>
          );
        }
}



export default Priorities_component