import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class Ticket_component extends Component {
    state = {
        user: [],
        newuserData: {
          firstName: '',
          lastName: '',
          email: ''

        },
        edituserData: {
          firstName: '',
          lastName: '',
          email: ''
        },
        newuserModal: false,
        edituserModal: false
      }
      componentWillMount() {
        this._refreshusers();
      }
      toggleNewuserModal() {
        this.setState({
          newuserModal: ! this.state.newuserModal
        });
      }
      toggleEdituserModal() {
        this.setState({
          edituserModal: ! this.state.edituserModal
        });
      }
      adduser() {
        axios.post('http://localhost:4000/users', this.state.newuserData).then((response) => {
          let { user } = this.state;
    
          user.push(response.data);
    
          this.setState({ user, newuserModal: false, newuserData: {
            firstName: '',
            lastName: '',
            email: ''
          }});
        });
      }
      updateuser() {
        let { firstName, lastName, email } = this.state.edituserData;
    
        axios.put('http://localhost:4000/users/' + this.state.edituserData.id, {
          firstName, lastName, email
        }).then((response) => {
          this._refreshusers();
    
          this.setState({
            edituserModal: false, edituserData: { id: '', firstName: '', lastName: '', email: '' }
          })
        });
      }
      edituser(id, firstName, lastName, email) {
        this.setState({
          edituserData: { id, firstName, lastName, email }, edituserModal: ! this.state.edituserModal
        });
      }
      deleteuser(id) {
        axios.delete('http://localhost:4000/users/' + id).then((response) => {
          this._refreshusers();
        });
      }
      _refreshusers() {
        axios.get('http://localhost:4000/users').then((response) => {
          this.setState({
            user: response.data
          })
        });
      }
      render() {
        let user = this.state.user.map((user) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.edituser.bind(this, user.id, user.subject, user.description)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteuser.bind(this, user.id)}>Delete</Button>
              </td>
            </tr>
          )
        });
        return (
          <div className="App container">

          <Button className="my-3" color="primary" onClick={this.toggleNewuserModal.bind(this)}>Create user</Button>
    
          <Modal isOpen={this.state.newuserModal} toggle={this.toggleNewuserModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewuserModal.bind(this)}>Crate a new user</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" value={this.state.newuserData.user} onChange={(e) => {
                  let { newuserData } = this.state;
    
                  newuserData.firstName = e.target.value;
    
                  this.setState({ newuserData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" value={this.state.newuserData.description} onChange={(e) => {
                  let { newuserData } = this.state;
    
                  newuserData.lastName = e.target.value;
    
                  this.setState({ newuserData });           
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" value={this.state.newuserData.description} onChange={(e) => {
                  let { newuserData } = this.state;
    
                  newuserData.email = e.target.value;
    
                  this.setState({ newuserData });           
                }} />
              </FormGroup>
                </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.adduser.bind(this)}>Create</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewuserModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.edituserModal} toggle={this.toggleEdituserModal.bind(this)}>
            <ModalHeader toggle={this.toggleEdituserModal.bind(this)}>Edit user</ModalHeader>
            <ModalBody>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" value={this.state.edituserData.firstName} onChange={(e) => {
                  let { edituserData } = this.state;
    
                  edituserData.firstName = e.target.value;
    
                  this.setState({ edituserData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" value={this.state.edituserData.lastName} onChange={(e) => {
                  let { edituserData } = this.state;
    
                  edituserData.lastName = e.target.value;
    
                  this.setState({ edituserData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="Email">Email</Label>
                <Input id="Email" value={this.state.edituserData.email} onChange={(e) => {
                  let { edituserData } = this.state;
    
                  edituserData.email = e.target.value;
    
                  this.setState({ edituserData });
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateuser.bind(this)}>Update user</Button>{' '}
              <Button color="secondary" onClick={this.toggleEdituserModal.bind(this)}>Cancel</Button>
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
                  {user}
                </tbody>
              </Table>
            </div>
          );
        }
}



export default Ticket_component