import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  Box,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FormField } from "../types/form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PreviewForm() {
  const { id } = useParams();
  const forms = useAppSelector((s) => s.forms.allForms);
  const form = forms.find((f) => f.id === id);
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
 const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );
  

  const togglePasswordVisibility = (fieldId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }));
  };
  useEffect(() => {
    if (form) {
      const defaults: Record<string, any> = {};
      form.fields.forEach((f) => {
        defaults[f.id] = f.defaultValue || "";
      });
      setValues(defaults);
    }
  }, [form]);

  if (!form) return <Typography>No form found</Typography>;

  const validateField = (field: FormField, value: any) => {
    let error = "";
    if (field.required && !value) error = "Required";
    if (field.validation) {
      for (let rule of field.validation) {
        if (rule.type === "minLength" && String(value).length < rule.value)
          error = `Min length ${rule.value}`;
        if (rule.type === "maxLength" && String(value).length > rule.value)
          error = `Max length ${rule.value}`;
        if (rule.type === "email" && !/^\S+@\S+\.\S+$/.test(String(value)))
          error = "Invalid email";
        if (
          rule.type === "customPassword" &&
          !/^(?=.*\d).{8,}$/.test(String(value))
        )
          error = "Weak password";
      }
    }
    return error;
  };

  const handleChange = (id: string, val: any) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  const handleBlur = (field: FormField) => {
    const error = validateField(field, values[field.id]);
    setErrors((prev) => ({ ...prev, [field.id]: error }));
  };
 
  return (
    <Box p={3}>
      <Typography variant="h4">{form.name}</Typography>
      {form.fields.map((field) => {
        switch (field.type) {
          case "text":
          case "number":
          case "date":
          case "textarea":
            return (
              <TextField
                key={field.id}
                type={field.type === "textarea" ? undefined : field.type}
                label={field.label}
                value={values[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field)}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
                fullWidth
                multiline={field.type === "textarea"}
                sx={{ my: 1 }}
              />
            );
          case "checkbox":
            return (
              <FormControlLabel
                key={field.id}
                control={
                  <Checkbox
                    checked={values[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.checked)}
                  />
                }
                label={field.label}
              />
            );
          case "select":
            return (
              <TextField
                key={field.id}
                select
                label={field.label}
                value={values[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                fullWidth
                sx={{ my: 1 }}
              >
                {field.options?.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            );
          case "password":
            return (
              <TextField
                key={field.id}
                type={showPasswords[field.id] ? "text" : "password"}
                label={field.label}
                value={values[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                onBlur={() => handleBlur(field)}
                error={!!errors[field.id]}
                helperText={errors[field.id]}
                fullWidth
                sx={{ my: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => togglePasswordVisibility(field.id)}
                        edge="end"
                      >
                        {showPasswords[field.id] ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            );
          default:
            return null;
        }
      })}
    </Box>
  );
}

export default PreviewForm;
