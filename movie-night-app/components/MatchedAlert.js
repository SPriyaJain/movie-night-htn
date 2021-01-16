import React, { useState } from 'react';
import { Modal, Title, Paragraph, Button, Card } from 'react-native-paper';
import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  card: {
    backgroundColor: '#7B59D9',
    color: 'white'
  },
  text: {
    color: 'white'
  },
  content: {
    paddingTop: '2%'
  },
  button: {
    borderColor: 'white',
    color: 'white',
    marginLeft: '1%'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
})

function MatchedAlert(props) {
  const [visible, setVisible] = useState(true);
  const hideModal = () => setVisible(false);
  
  const acceptMatch = () => {
    console.log("accepted");
    hideModal();
  };
  const ignoreMatch = () => {
    console.log("ignored");
    hideModal();
  };

  return (
    <Modal visible={visible} onDismiss={ignoreMatch} style={styles.modal}>
      <Card style={styles.card}>
        <Card.Title title="You've found a match!" titleStyle={styles.text}/>
        <Card.Cover source={{ uri: 'https://www.themoviedb.org/t/p/original/' + props.movie.link}} />
        <Card.Content style={styles.content}>
          <Title style={styles.text}>{props.movie.title} ({props.movie.year})</Title>
          <Paragraph style={styles.text}>{props.movie.overview}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button onPress={acceptMatch} labelStyle={styles.text} mode="outlined" style={styles.button}>Accept</Button>
          <Button onPress={ignoreMatch} labelStyle={styles.text} mode="outlined" style={styles.button}>Ignore</Button>
        </Card.Actions>
      </Card>
    </Modal>
  );
}

export default MatchedAlert;
