// import { useField, useFormikContext } from "formik";
// import { TextField } from "@material-ui/core";
// import React from "react";
// import Autocomplete from "@material-ui/lab/Autocomplete";

// const ReusableAutocomplete = ({
//   name,
//   options,
//   label,
//   displayData,
//   isObject,
//   size,
//   variant,
//   value,
//   onChange,
//   ...otherProps
// }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);
//   const handleChange = (_, value) => {
//     if (isObject != null && !isObject) {
//       setFieldValue(name, value.value ? value.value : null);
//     } else {
//       setFieldValue(name, value ? value : null);
//     }
//   };
//   const configAutocomplete = {
//     ...field,
//     ...otherProps,
//     id: name,
//     size: size ? size : "medium",
//     options: options,
    
//     getOptionLabel: (option) =>
//       option[displayData ? displayData : "name"]
//         ? option[displayData ? displayData : "name"]
//         : "",
//     getOptionSelected: (option, value) => option?.id === value?.id,
//     onChange: onChange ? onChange : handleChange,
//     value: field.value || null,
//     renderInput: (params) => (
//       <TextField
//         {...params}
//         variant={variant ? variant : "outlined"}
//         label={label}
//         error={meta && meta.touched && Boolean(meta.error)}
//         helperText={meta && meta.touched && meta.error}
//       />
//     ),
//   };

//   return <Autocomplete {...configAutocomplete} />;
// };

// export default ReusableAutocomplete;


import React from "react";
import { useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ReusableAutocomplete = ({
  name,
  options = [],
  label,
  // hiển thị:
  displayData = "name",
  labelFormatter,          
  // lưu giá trị:
  valueKey = "id",
  primitiveKey = "value",
  isObject = true,
  size = "medium",
  variant = "outlined",
  value,
  onChange,
  ...otherProps
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  const formValue = value !== undefined ? value : field.value ?? null;

  const selectedOption = isObject
    ? formValue
    : options.find((opt) => opt?.[primitiveKey] === formValue) || null;

  const handleChange = (_, newOption) => {
    if (onChange) return onChange(_, newOption);
    if (!isObject) setFieldValue(name, newOption ? newOption[primitiveKey] : null);
    else setFieldValue(name, newOption ?? null);
  };

  const isOptionEqualToValue = (option, val) => {
    if (!option || !val) return false;
    if (!isObject) return option?.[primitiveKey] === val?.[primitiveKey];
    return option?.[valueKey] === val?.[valueKey];
  };

  const getOptionLabel = (option) => {
    if (!option) return "";
    if (typeof option === "string") return option;
    if (typeof labelFormatter === "function") return labelFormatter(option); // ✅
    return option?.[displayData] ?? "";
  };

  const hasError = Boolean(meta?.touched && meta?.error);

  return (
    <Autocomplete
      id={name}
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      onBlur={() => setFieldTouched(name, true)}
      size={size}
      {...otherProps}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          variant={variant}
          error={hasError}
          helperText={hasError ? meta.error : otherProps.helperText}
        />
      )}
    />
  );
};

export default ReusableAutocomplete;

