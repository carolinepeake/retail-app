import { useState } from 'react';

// might need to initialize formState

const useForm = (initialFormState = {}, onSubmit) => {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState([]);
  const [validInput, setValidInput] = useState(false);

  const handleInputChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  const validateInput = () => {
    let errors = [];
    // could use reduce
    let valid = true;

    // if (name === '' || email === '' || body === '') {
    // could make function just for single field
    const validateRequiredFields = (values) => {
      for (let i = 0; i < values.length; i++) {
        if (values[i] === '') {
          return false;
        }
      }
      return true;
    }

    const requiredFields = [formState.name, formState.email, formState.body];
    if (!validateRequiredFields(requiredFields)) {
      let error = {
        message: 'Not all mandatory fields have been provided.',
        id: '01',
      };
      errors.push(error);
      valid = false;
    }

    const validateEmail = (emailName) => {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(emailName);
    }

    if (!validateEmail(formState.email)) {
      let error = {
        message: 'Email is not in the correct email format.',
        id: '02',
      }
      errors.push(error);
      valid = false;
    }





    setValidInput(valid);
    setErrors(errors);
    return valid;
  }

  const resetForm = () => {
    setFormState(initialFormState);
    setErrors([]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }
    onSubmit?.(formState);
  }

  return [ formState, errors, handleInputChange, resetForm, handleSubmit ];
};

export default useForm;
