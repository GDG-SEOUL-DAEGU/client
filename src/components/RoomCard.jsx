import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { firebase, firestore } from '../firebase/firestore';
import { getDocumentId } from '../utils/util';

const RoomCard = ({ room }) => {
  if (!room) return null;

  const roomEntranceHandler = () => {
    const uid = getDocumentId();
    localStorage.setItem('uid', uid);
    firestore
      .collection('rooms')
      .doc(room.id)
      .update({
        users: firebase.firestore.FieldValue.arrayUnion({
          uid,
          isDead: false,
        }),
      });
  };

  return (
    <Card style={{ marginTop: 20 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {room.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          현재 인원 {`${room.users?.length || 0}/${room.peopleCount}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={roomEntranceHandler}
          disabled={room.users.length === room.peopleCount}
        >
          입장하기
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(RoomCard);

