import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Card, IconButton, Title, Paragraph } from 'react-native-paper';

const styles = StyleSheet.create({
  card: {
    borderColor: '#7B59D9',
    height: '52%',
    margin: 20,
  },
  action: {
    borderColor: "#7B59D9",
    borderWidth: 2,
  },
  cover: {
    height: '70%'
  },
  content: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default function MovieCard (props) {
    return (
      <View style={styles.card}>
        <Card>
          <Card.Cover style={styles.cover} source={{ uri: props.poster_path }} />
          <View style={styles.content}>
            <Card.Title title={props.name} subtitle={"With "+props.friends} />
          </View>
        </Card>
      </View>
    );
}
