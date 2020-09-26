import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class Engineer_component extends Component {
    state = {
        engineer: [],
        newengineerData: {
          firstName: '',
          lastName: '',
          email: ''

        },
        editengineerData: {
          firstName: '',
          lastName: '',
          email: ''
        },
        newengineerModal: false,
        editengineerModal: false
      }
      componentWillMount() {
        this._refreshengineers();
      }
      toggleNewengineerModal() {
        this.setState({
          newengineerModal: ! this.state.newengineerModal
        });
      }
      toggleEditengineerModal() {
        this.setState({
          editengineerModal: ! this.state.editengineerModal
        });
      }
      addengineer() {
        axios.post('http://localhost:4000/engineers', this.state.newengineerData).then((response) => {
          let { engineer } = this.state;
    
          engineer.push(response.data);
    
          this.setState({ engineer, newengineerModal: false, newengineerData: {
            firstName: '',
            lastName: '',
            email: ''
          }});
        });
      }
      updateengineer() {
        let { firstName, lastName, email } = this.state.editengineerData;
    
        axios.put('http://localhost:4000/engineers/' + this.state.editengineerData.id, {
          firstName, lastName, email
        }).then((response) => {
          this._refreshengineers();
    
          this.setState({
            editengineerModal: false, editengineerData: { id: '', firstName: '', lastName: '', email: '' }
          })
        });
      }
      editengineer(id, firstName, lastName, email) {
        this.setState({
          editengineerData: { id, firstName, lastName, email }, editengineerModal: ! this.state.editengineerModal
        });
      }
      deleteengineer(id) {
        axios.delete('http://localhost:4000/engineers/' + id).then((response) => {
          this._refreshengineers();
        });
      }
      _refreshengineers() {
        axios.get('http://localhost:4000/engineers').then((response) => {
          this.setState({
            engineer: response.data
          })
        });
      }
      render() {
        let engineer = this.state.engineer.map((engineer) => {
          return (
            <tr key={engineer.id}>
              <td>{engineer.id}</td>
              <td>{engineer.firstName}</td>
              <td>{engineer.lastName}</td>
              <td>{engineer.email}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editengineer.bind(this, engineer.id, engineer.subject, engineer.description)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteengineer.bind(this, engineer.id)}>Delete</Button>
              </td>
            </tr>
          )
        });
        return (
          <div className="App container">

          <Button className="my-3" color="primary" onClick={this.toggleNewengineerModal.bind(this)}>Create engineer</Button>
    
          <Modal isOpen={this.state.newengineerModal} toggle={this.toggleNewengineerModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewengineerModal.bind(this)}>Crate a new engineer</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" value={this.state.newengineerData.engineer} onChange={(e) => {
                  let { newengineerData } = this.state;
    
                  newengineerData.firstName = e.target.value;
    
                  this.setState({ newengineerData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" value={this.state.newengineerData.description} onChange={(e) => {
                  let { newengineerData } = this.state;
    
                  newengineerData.lastName = e.target.value;
    
                  this.setState({ newengineerData });           
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" value={this.state.newengineerData.description} onChange={(e) => {
                  let { newengineerData } = this.state;
    
                  newengineerData.email = e.target.value;
    
                  this.setState({ newengineerData });           
                }} />
              </FormGroup>
                </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addengineer.bind(this)}>Create</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewengineerModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editengineerModal} toggle={this.toggleEditengineerModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditengineerModal.bind(this)}>Edit engineer</ModalHeader>
            <ModalBody>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" value={this.state.editengineerData.firstName} onChange={(e) => {
                  let { editengineerData } = this.state;
    
                  editengineerData.firstName = e.target.value;
    
                  this.setState({ editengineerData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" value={this.state.editengineerData.lastName} onChange={(e) => {
                  let { editengineerData } = this.state;
    
                  editengineerData.lastName = e.target.value;
    
                  this.setState({ editengineerData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input id="Email" value={this.state.editengineerData.email} onChange={(e) => {
                  let { editengineerData } = this.state;
    
                  editengineerData.email = e.target.value;
    
                  this.setState({ editengineerData });
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateengineer.bind(this)}>Update engineer</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditengineerModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {engineer}
                </tbody>
              </Table>
            </div>
          );
        }
}



export default Engineer_component