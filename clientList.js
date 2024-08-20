import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ClientList = ({ clients, removeClient }) => {
  return (
    <View style={styles.container}>
      {clients.map((client, index) => (
        <TouchableOpacity key={index} style={styles.clientBox} onPress={() => removeClient(index)}>
          <Text style={styles.clientText}>{client.name}</Text>
          <Text style={styles.clientText}>Consumo: {client.total}€</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
  clientBox: {
    width: '45%',
    backgroundColor: '#eee',
    padding: 10,
    margin: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  clientText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ClientList;
