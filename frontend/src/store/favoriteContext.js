import { createContext, useState, useEffect } from "react";

const ContactsContext = createContext({
  contacts: [],
  addContactHandler: (contact) => {},
  removeContactHandler: (contactId) => {},
  getContactHandler: (id) => {},
  editContactHandler: (contact) => {},
  removeAll: () => {},
});

export function ContactsContextProvider(props) {
  const [loadedData, setData] = useState([]);
  useEffect(() => {
    fetch("/favBuildings", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  const context = {
    contacts: loadedData,
    addContactHandler,
    removeContactHandler,
    getContactHandler,
    editContactHandler,
    removeAll,
  };

  function addContactHandler(contact) {
    setData((periousContacts) => {
      return periousContacts.concat(contact);
    });
  }

  function removeAll() {
    setData([]);
  }

  function getContactHandler(id) {
    let obj = loadedData.find((element) => element._id === id);
    return obj;
  }

  function removeContactHandler(contactId) {
    setData((periousContacts) => {
      return periousContacts.filter((contact) => contact._id !== contactId);
    });
  }

  function editContactHandler(contact) {
    setData((periousContacts) => {
      return periousContacts.map((x) => (x._id === contact._id ? contact : x));
    });
  }

  return (
    <ContactsContext.Provider value={context}>
      {props.children}
    </ContactsContext.Provider>
  );
}

export default ContactsContext;
