import React, { Component } from "react";
import { nanoid } from 'nanoid';

import ContactForm from "./ContactForm";
import Filter from "./Filter";
import ContactList from "./ContactList";

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmitAddContact = ({ name, number }) => {
    const existingContact = this.state.contacts.find((contact) => contact.name.toLowerCase() === name.toLowerCase());

    if (existingContact) {
      alert(`${name} is already in your phonebook!`);
    } else {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  isFilterContact = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleDeleteContact = (contactId) => {
    this.setState({
      contacts: this.state.contacts.filter((contact) => contact.id !== contactId),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div style={{ height: '100px', padding: '20px' }}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitAddContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={this.isFilterContact} />
        <ContactList contacts={filteredContacts} handleDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}

