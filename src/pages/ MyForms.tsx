import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { Box, Typography, Button } from '@mui/material';
import { deleteForm } from '../redux/formsSlice';

function MyForms() {
  const forms = useAppSelector(s => s.forms.allForms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <Box p={3}>
      <Typography variant="h4">My Forms</Typography>
      {forms.length === 0 && <Typography>No saved forms</Typography>}
      {forms.map(form => (
        <Box key={form.id} border={1} p={2} my={1} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="h6">{form.name}</Typography>
            <Typography variant="body2">{new Date(form.createdAt).toLocaleString()}</Typography>
          </Box>
          <Box>
            <Button variant="outlined" sx={{ mr: 1 }} onClick={() => navigate(`/preview/${form.id}`)}>Preview</Button>
            <Button variant="outlined" color="error" onClick={() => dispatch(deleteForm(form.id))}>Delete</Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default MyForms;
