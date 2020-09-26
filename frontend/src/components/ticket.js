import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class Ticket_component extends Component {
    state = {
        ticket: [],
        newticketData: {
          subject: '',
          description: ''
        },
        editticketData: {
            subject: '',
            description: ''
        },
      
        newticketModal: false,
        editticketModal: false
      }
      priority_state = {
        priority: []
      }

      getPriorities() {
        axios.get('http://localhost:4000/priorities').then((response) => {
          this.setState({
            priority: response.data
          })
        });
      }

      componentWillMount() {
        this._refreshtickets();
      }
      toggleNewticketModal() {
        this.setState({
          newticketModal: ! this.state.newticketModal
        });
      }
      toggleEditticketModal() {
        this.setState({
          editticketModal: ! this.state.editticketModal
        });
      }
      addticket() {
        axios.post('http://localhost:4000/tickets', this.state.newticketData).then((response) => {
          let { ticket } = this.state;
    
          ticket.push(response.data);
    
          this.setState({ ticket, newticketModal: false, newticketData: {
            subject: '',
            description: ''
          }});
        });
      }
      updateticket() {
        let { subject, description } = this.state.editticketData;
    
        axios.put('http://localhost:4000/tickets/' + this.state.editticketData.id, {
          subject, description
        }).then((response) => {
          this._refreshtickets();
    
          this.setState({
            editticketModal: false, editticketData: { id: '', subject: " ", description: " " }
          })
        });
      }
      editticket(id, subject, description) {
        this.setState({
          editticketData: { id, subject, description }, editticketModal: ! this.state.editticketModal
        });
      }
      deleteticket(id) {
        axios.delete('http://localhost:4000/tickets/' + id).then((response) => {
          this._refreshtickets();
        });
      }
      _refreshtickets() {
        axios.get('http://localhost:4000/tickets').then((response) => {
          this.setState({
            ticket: response.data
          })
        });
      }
      render() {
        let ticket = this.state.ticket.map((ticket) => {
          return (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.subject}</td>
              <td>{ticket.description}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editticket.bind(this, ticket.id, ticket.subject, ticket.description)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteticket.bind(this, ticket.id)}>Delete</Button>
              </td>
            </tr>
          )
        });
        return (
          
          <div className="App container">
    
          <Button className="my-3" color="primary" onClick={this.toggleNewticketModal.bind(this)}>Add ticket</Button>
    
          <Modal isOpen={this.state.newticketModal} toggle={this.toggleNewticketModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewticketModal.bind(this)}>Add a new ticket</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="subject">Subject</Label>
                <Input id="Subject" value={this.state.newticketData.ticket} onChange={(e) => {
                  let { newticketData } = this.state;
    
                  newticketData.subject = e.target.value;
    
                  this.setState({ newticketData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" id="description" value={this.state.newticketData.description} onChange={(e) => {
                  let { newticketData } = this.state;
    
                  newticketData.description = e.target.value;
    
                  this.setState({ newticketData });           
                }} />
              </FormGroup>
                </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addticket.bind(this)}>Add ticket</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewticketModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editticketModal} toggle={this.toggleEditticketModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditticketModal.bind(this)}>Edit ticket</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="subject">Subject</Label>
                <Input id="subject" value={this.state.editticketData.subject} onChange={(e) => {
                  let { editticketData } = this.state;
    
                  editticketData.subject = e.target.value;
    
                  this.setState({ editticketData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="Description">Description</Label>
                <Input type="textarea" id="Description" value={this.state.editticketData.description} onChange={(e) => {
                  let { editticketData } = this.state;
    
                  editticketData.description = e.target.value;
    
                  this.setState({ editticketData });
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateticket.bind(this)}>Update ticket</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditticketModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {ticket}
                </tbody>
              </Table>
            </div>
          );
        }
}



export default Ticket_component