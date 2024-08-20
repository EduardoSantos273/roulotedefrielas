import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';

const AddClientModal = ({ visible, onClose, onAddClient }) => {
  const [clientName, setClientName] = useState('');

  const handleAddClient = () => {
    const newClient = {
      name: clientName || `Cliente ${Math.floor(Math.random() * 1000)}`,
      total: 3.0
    };
    onAddClient(newClient);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Adicionar Cliente</Text>
        <TextInput
          placeholder="Nome do Cliente (Opcional)"
          style={styles.input}
          value={clientName}
          onChangeText={setClientName}
        />
        <Text>Bifana Simples: 3€</Text>
        <Button title="Adicionar" onPress={handleAddClient} />
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default AddClientModal;
