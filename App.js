import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ClientList from './ClientList';
import AddClientModal from './AddClientModal';

const App = () => {
  const [clients, setClients] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addClient = (client) => {
    setClients([...clients, client]);
  };

  const removeClient = (index) => {
    setClients(clients.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <ClientList clients={clients} removeClient={removeClient} />
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={() => setModalVisible(true)} />
        <Button title="-" onPress={() => removeClient(clients.length - 1)} />
      </View>
      <AddClientModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddClient={addClient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default App;
