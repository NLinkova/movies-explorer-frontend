import { useState, useCallback } from "react";

/*const validation = (value, validators) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);

  useEffect(() => {
    for (const validator in validators) {
      switch (validator) {
        case "isEmpty":
          value ? setIsEmpty(false) : setIsEmpty(true);
          break;
        case "minLength":
          value.length < validators[validator]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        default:
          break;
      }
    }
  }, [value]);

  return {
    isEmpty,
    minLengthError,
  };
};

const useInput = (initialValue, validators) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const valid = useValidation(value, validators);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setIsDirty(true);
  };

  return { value, onChange, isDirty, ...valid };
};*/

export function useForm(inputs) {
  const [values, setValues] = useState(inputs);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}
