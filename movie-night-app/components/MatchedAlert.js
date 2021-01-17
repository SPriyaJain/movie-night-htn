import React, { useState } from 'react';
import { Modal, Title, Paragraph, Button, Card } from 'react-native-paper';
import {
    StyleSheet,
    Image,
} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    paddingLeft: '3%',
    paddingRight: '3%',
    height: 600,
  },
  card: {
    backgroundColor: '#7B59D9',
    color: 'white',
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 5,
  },
  text: {
    color: 'white',
  },
  title: {
    color: 'white',
    marginLeft: '30%',
    marginTop: 20,
  },
  content: {
    paddingTop: '2%',
    paddingBottom: '2%',
  },
  button: {
    borderColor: 'white',
    borderRadius: 20,
    borderWidth: 1.5,
    color: 'white',
    marginLeft: '2%'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  goose: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
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
        <Card.Title title={`It's a Match!`} titleStyle={styles.title}/>
        <Image style={styles.goose} source={{uri: 'https://i.imgur.com/ak4a9eV.png'}}/>
        <Card.Content style={styles.content}>
          <Title style={styles.text}>{`You've found a goose to watch ${props.movie.title} with you!`}</Title>
          <Paragraph style={styles.text}>Arrange a time to watch with them now.</Paragraph>
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
