import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box, Button, TextField, Select, MenuItem, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { FormField, FormSchema } from '../types/form';
import { useAppDispatch } from '../redux/hooks';
import { saveForm } from '../redux/formsSlice';
import { useNavigate } from 'react-router-dom';

function CreateForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formName, setFormName] = useState('');
  const [fields, setFields] = useState<FormField[]>([]);

  const addField = () => {
    setFields(prev => [...prev, {
      id: uuidv4(),
      label: '',
      type: 'text',
      required: false,
      defaultValue: '',
      validation: []
    }]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setFields(prev => prev.filter(f => f.id !== id));
  };

  const handleSave = () => {
    const newForm: FormSchema = {
      id: uuidv4(),
      name: formName,
      createdAt: new Date().toISOString(),
      fields
    };
    dispatch(saveForm(newForm));
    setFormName('');
    setFields([]);
    alert('Form saved!');
  };

  return (
    <Box p={3}>
      <Typography variant="h4">Create Form</Typography>
      <TextField fullWidth label="Form Name" value={formName} onChange={e => setFormName(e.target.value)} sx={{ my: 2 }} />
      {fields.map(field => (
        <Box key={field.id} border={1} p={2} m={1}>
          <TextField label="Label" value={field.label} onChange={e => updateField(field.id, { label: e.target.value })} fullWidth sx={{ mb: 1 }} />
          <Select value={field.type} onChange={e => updateField(field.id, { type: e.target.value as FormField['type'] })} fullWidth sx={{ mb: 1 }}>
            <MenuItem value="text">Text</MenuItem>
            <MenuItem value="number">Number</MenuItem>
            <MenuItem value="textarea">Textarea</MenuItem>
            <MenuItem value="select">Select</MenuItem>
            <MenuItem value="radio">Radio</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="password">Password</MenuItem>
          </Select>
          <FormControlLabel control={
            <Checkbox checked={field.required} onChange={e => updateField(field.id, { required: e.target.checked })} />
          } label="Required" />
          <Button color="error" onClick={() => removeField(field.id)}>Delete</Button>
        </Box>
      ))}
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
        <Box>
          <Button variant="contained" onClick={addField} sx={{ mr: 1 }}>Add Field</Button>
          <Button variant="contained" color="success" onClick={handleSave} disabled={!formName || fields.length === 0}>Save Form</Button>
        </Box>
        <Button variant="contained" onClick={() => navigate('/myforms')}>Existing Forms</Button>
      </Box>
    </Box>
  );
}

export default CreateForm;
