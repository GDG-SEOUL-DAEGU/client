import LinkIcon from '@mui/icons-material/Link';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import Header from '../components/Header';
import { firestore } from '../firebase/firestore';
import { getDocumentId } from '../utils/util';

const ContainerStyles = {
  width: '100%',
  height: '100vh',
  position: 'fixed',
  zIndex: '10',
};

const TitleStyles = {
  paddingBottom: '3rem',
  textAlign: 'center',
  fontWeight: 'bold',
};

export default function Create() {
  const roomId = getDocumentId();
  const [name, setName] = useState('');
  const [peopleCount, setPeopleCount] = useState(0);

  const create = () => {
    firestore
      .collection('rooms')
      .doc(roomId)
      .set({
        name,
        peopleCount: Number(peopleCount),
        dateCreated: new Date().toISOString(),
        users: [],
      })
      .then(() => {
        // TODO
        // 대기방으로 가기
      })
      .catch((err) => {
        console.log('err', err);
        alert('방 생성에 문제가 생겼습니다');
      });
  };

  const linkCopy = () => {
    const url = process.env.REACT_APP_DEFAULT_URL + `?roomId=${roomId}`;
    navigator.clipboard.writeText(url);
  };

  return (
    <Container maxWidth="sm" sx={ContainerStyles}>
      <Header />
      <Stack direction="column" justifyContent="space-evenly" sx={{ height: '100vh' }}>
        <Stack spacing={4}>
          <Typography variant="h4" sx={TitleStyles}>
            방 생성하기
          </Typography>
          <div>
            <Typography variant="subtitle2">방 이름</Typography>
            <TextField
              id="title"
              variant="standard"
              fullWidth
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="subtitle2">최대 인원 수</Typography>
            <TextField
              id="limit"
              variant="standard"
              fullWidth
              onChange={(e) => setPeopleCount(e.target.value)}
            />
          </div>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2">친구와 함께 하기</Typography>
            <Button startIcon={<LinkIcon />} onClick={linkCopy}>
              링크 복사하기
            </Button>
          </Stack>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          sx={{ padding: '1rem 0', fontSize: '1rem', borderRadius: '1rem' }}
          onClick={create}
        >
          생성하기
        </Button>
      </Stack>
    </Container>
  );
}

