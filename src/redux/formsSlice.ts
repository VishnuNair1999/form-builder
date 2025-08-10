import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormSchema } from '../types/form';

type FormsState = {
  currentForm: FormSchema | null;
  allForms: FormSchema[];
};

const initialState: FormsState = {
  currentForm: null,
  allForms: JSON.parse(localStorage.getItem('forms') || '[]'),
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    setCurrentForm(state, action: PayloadAction<FormSchema | null>) {
      state.currentForm = action.payload;
    },
    saveForm(state, action: PayloadAction<FormSchema>) {
      state.allForms.push(action.payload);
      localStorage.setItem('forms', JSON.stringify(state.allForms));
    },
    deleteForm(state, action: PayloadAction<string>) {
      state.allForms = state.allForms.filter(f => f.id !== action.payload);
      localStorage.setItem('forms', JSON.stringify(state.allForms));
    }
  },
});

export const { setCurrentForm, saveForm, deleteForm } = formsSlice.actions;
export default formsSlice.reducer;
