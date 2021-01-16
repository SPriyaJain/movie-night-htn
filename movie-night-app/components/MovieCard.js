import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Avatar, Button, Card, Chip, IconButton, Paragraph } from 'react-native-paper';

const styles = StyleSheet.create({
  card: {
    borderColor: '#7B59D9',
    height: '100%',
    margin: 0,
  },
  chip: {
    width: 'auto',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B59D9',
    marginRight: 10,
  },
  chipsContainer: {
    flex: 1, 
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
  },
  action: {
    borderColor: "#7B59D9",
    borderWidth: 2,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: "#7B59D9",
  },
  cover: {
    height: '60%'
  }
});



const LeftContent = props => <Avatar.Icon {...props} icon="filmstrip" style={{backgroundColor: '#7B59D9'}}/>

export default function MovieCard (props) {
    const accept = () => {
      console.log("ACCEPTED")
    }

    const reject = () => {
      console.log("REJECTED")
    }

    return (
      <View style={styles.card}>
        <Card elevation={5}>
          <Card.Cover style={styles.cover} source={{ uri: `${props.photo}` }} />
          <Card.Title title={props.title} subtitle={props.year} left={LeftContent} />
          <Card.Content>
            <View style={styles.chipsContainer}>
              {  props.genres.map((item, index) => {
                  return (
                      <Chip style={styles.chip}
                        key={index}
                        mode='flat'
                        textStyle={{color: 'white'}}
                      >
                        {item} 
                      </Chip>
                  )
                })
              }
            </View>
            <Paragraph>{props.summary}</Paragraph>
          </Card.Content>
          
          <Card.Actions>
            <View style={styles.actionsContainer}>
               <IconButton
                style={styles.action}
                size={30}
                color="#7B59D9"
                icon="close"
                onPress={reject}>
              </IconButton>
              <IconButton 
                style={styles.action}
                size={30}
                color="#7B59D9"
                icon="check"
                onPress={accept}>
              </IconButton>
            </View>
          </Card.Actions>
        </Card>
      </View>
    );
}

