export type ValidationRule =
  | { type: 'required' }
  | { type: 'minLength'; value: number }
  | { type: 'maxLength'; value: number }
  | { type: 'email' }
  | { type: 'customPassword' };

export type FormField = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'password';
  required: boolean;
  defaultValue?: string | number | boolean;
  options?: string[];
  validation?: ValidationRule[];
  isDerived?: boolean;
  parentFields?: string[];
  derivedFormula?: string;
};

export type FormSchema = {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
};
