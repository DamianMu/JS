import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';


class Resource_component extends Component {
    state = {
        resource: [],
        newresourceData: {
          name: '',
          ip: '',
          mac: ''
        },
        editresourceData: {
            name: '',
            ip: '',
            mac: ''
        },
        newresourceModal: false,
        editresourceModal: false
      }
      componentWillMount() {
        this._refreshresources();
      }
      toggleNewresourceModal() {
        this.setState({
          newresourceModal: ! this.state.newresourceModal
        });
      }
      toggleEditresourceModal() {
        this.setState({
          editresourceModal: ! this.state.editresourceModal
        });
      }
      addresource() {
        axios.post('http://localhost:4000/resources', this.state.newresourceData).then((response) => {
          let { resource } = this.state;
    
          resource.push(response.data);
    
          this.setState({ resource, newresourceModal: false, newresourceData: {
            name: '', ip: '', mac: ''
          }});
        });
      }
      updateresource() {
        let { name } = this.state.editresourceData;
    
        axios.put('http://localhost:4000/resources/' + this.state.editresourceData.id, {
            name
        }).then((response) => {
          this._refreshresources();

          this.setState({
            editresourceModal: false, editresourceData: { id: '', name: " ", ip: " ", mac: " " }
          })
        });
      }
      editresource(id, name, ip, mac) {
        this.setState({
          editresourceData: { id, name, ip, mac }, editresourceModal: ! this.state.editresourceModal
        });
      }
      deleteresource(id) {
        axios.delete('http://localhost:4000/resources/' + id).then((response) => {
          this._refreshresources();
        });
      }
      _refreshresources() {
        axios.get('http://localhost:4000/resources').then((response) => {
          this.setState({
            resource: response.data
          })
        });
      }
      render() {
        let resource = this.state.resource.map((resource) => {
          return (
            <tr key={resource.id}>
              <td>{resource.id}</td>
              <td>{resource.name}</td>
              <td>{resource.ip}</td>
              <td>{resource.mac}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editresource.bind(this, resource.id, resource.name, resource.ip, resource.mac)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteresource.bind(this, resource.id)}>Delete</Button>
              </td>
            </tr>
          )
        });
        return (
          <div className="App container">
    
          <Button className="my-3" color="primary" onClick={this.toggleNewresourceModal.bind(this)}>Add resource</Button>
    
          <Modal isOpen={this.state.newresourceModal} toggle={this.toggleNewresourceModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewresourceModal.bind(this)}>Add a new resource</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Resource name</Label>
                <Input id="name" value={this.state.newresourceData.name} onChange={(e) => {
                  let { newresourceData } = this.state;
    
                  newresourceData.name = e.target.value;
    
                  this.setState({ newresourceData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="IP">Resource IP</Label>
                <Input id="IP" value={this.state.newresourceData.ip} onChange={(e) => {
                  let { newresourceData } = this.state;
    
                  newresourceData.ip = e.target.value;
    
                  this.setState({ newresourceData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="mac">Resource mac</Label>
                <Input id="mac" value={this.state.newresourceData.mac} onChange={(e) => {
                  let { newresourceData } = this.state;
    
                  newresourceData.mac = e.target.value;
    
                  this.setState({ newresourceData });
                }} />
              </FormGroup>
                </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addresource.bind(this)}>Add resource</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewresourceModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>
    
          <Modal isOpen={this.state.editresourceModal} toggle={this.toggleEditresourceModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditresourceModal.bind(this)}>Edit resource</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Resource Name</Label>
                <Input id="name" value={this.state.editresourceData.name} onChange={(e) => {
                  let { editresourceData } = this.state;
    
                  editresourceData.name = e.target.value;
    
                  this.setState({ editresourceData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="IP">Resource IP</Label>
                <Input id="IP" value={this.state.editresourceData.ip} onChange={(e) => {
                  let { editresourceData } = this.state;
    
                  editresourceData.ip = e.target.value;
    
                  this.setState({ editresourceData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="mac">Resource mac</Label>
                <Input id="mac" value={this.state.editresourceData.mac} onChange={(e) => {
                  let { editresourceData } = this.state;
    
                  editresourceData.mac = e.target.value;
    
                  this.setState({ editresourceData });
                }} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateresource.bind(this)}>Update resource</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditresourceModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Resource name</th>
                    <th>Resource IP</th>
                    <th>Resource MAC</th>
                  </tr>
                </thead>
                <tbody>
                  {resource}
                </tbody>
              </Table>
            </div>
          );
        }
}



export default Resource_component