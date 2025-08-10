import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Form Builder Dashboard
      </Typography>

      <Stack direction="row" spacing={3}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/create')}
        >
          Create New Form
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/myforms')}
        >
          Existing Forms
        </Button>
      </Stack>
    </Box>
  );
}

export default DashBoard;
