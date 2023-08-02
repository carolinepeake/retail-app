import { useState } from 'react';

// might need to initialize formState

const useForm = (onSubmit, initialFormState = {}) => {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState([]);
  // const [validInput, setValidInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const validateInput = () => {
    const workingErrors = [];
    // could use reduce
    let valid = true;

    // could make function just for single field
    const validateRequiredFields = (values) => {
      for (let i = 0; i < values.length; i++) {
        if (values[i] === '') {
          return false;
        }
      }
      return true;
    };

    const requiredFields = [formState.name, formState.email, formState.body];

    if (!validateRequiredFields(requiredFields)) {
      const error = {
        message: 'Not all mandatory fields have been provided.',
        id: '01',
      };
      workingErrors.push(error);
      valid = false;
    }

    const validateEmail = (emailName) => {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(emailName);
    };

    if (!validateEmail(formState.email)) {
      const error = {
        message: 'Email is not in the correct format.',
        id: '02',
      };
      workingErrors.push(error);
      valid = false;
    }

    // setValidInput(valid);
    setErrors(workingErrors);
    return valid;
  };

  const resetForm = () => {
    setFormState(initialFormState);
    setErrors([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formState: ', formState);
    if (!validateInput()) {
      console.log('formm validation failed');
      return;
    }
    // onSubmit?.(formState);
    onSubmit(formState);
    resetForm();
  };

  return [
    formState,
    errors,
    handleInputChange,
    resetForm,
    // validateInput,
    handleSubmit,
  ];
};

export default useForm;
