import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { loggedInUserContext } from '../../Helper/loggedInUserContext';
import { useContext, useState } from 'react';
import client from '../../utils/client';

const Header = ({ companyName }) => {
  const { loggedInUser } = useContext(loggedInUserContext);
  const [msgIsDisplayed, setMsgIsDisplayed] = useState(false)
  const [responseMsg, setResponseMsg] = useState(null)

  const  displayMsgTwoSecs = () => {
    setMsgIsDisplayed(true)

    setTimeout(() => setMsgIsDisplayed(false), 2000)
  }

  const addCohort = (event) => {
    event.preventDefault();
    client
      .post('/cohort', {})
      .then((res) => {
        setResponseMsg(res.data.status) 
        displayMsgTwoSecs()
      })
      .catch((err) => console.log(err.response));
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'grey',
          justifyContent: 'space-between',
          alignContent: 'center',
          width: '100vw',
          padding: '1em'
        }}
      >

        <Box>
          <Typography>
            <p>{companyName}</p>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Box sx={{backgroundColor: 'white'}}>
          <InputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
          </Box>
          <Box>
            <Button variant='contained'>Search User</Button>
          </Box>
        </Box>

        <Box>
          <Stack spacing={2} direction='row'>
          {msgIsDisplayed && <p>{responseMsg}</p>}
          {loggedInUser?.role === 'TEACHER' && (<Button variant='contained' onClick={addCohort}>Add Cohort</Button>)}
          <Button variant='contained'>Logout</Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Header;