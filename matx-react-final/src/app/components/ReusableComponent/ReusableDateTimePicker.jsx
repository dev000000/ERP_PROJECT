import { useField } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format as dfFormat, parseISO, isValid as isValidDate } from "date-fns";

const toDateOrNull = (v) => {
  if (!v) return null;
  // v có thể là string "1995-08-15" hoặc Date
  if (v instanceof Date) return isValidDate(v) ? v : null;
  try {
    const d = parseISO(String(v)); // parse "1995-08-15"
    return isValidDate(d) ? d : null;
  } catch {
    return null;
  }
};

const toYMDStringOrNull = (d) => {
  if (!(d instanceof Date) || !isValidDate(d)) return null;
  return dfFormat(d, "yyyy-MM-dd"); // <- dạng bạn muốn gửi đi
};

const ReusableDatePicker = ({
  name,
  size,
  variant,
  format = "dd/MM/yyyy", // chỉ là định dạng HIỂN THỊ
  value,                 // optional external control
  onChange,              // optional external control
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;

  // Giá trị hiển thị cho DatePicker phải là Date|null
  const pickerValue = value !== undefined ? toDateOrNull(value) : toDateOrNull(field.value);

  const handleChange = (newValue) => {
    // newValue là Date|null
    const ymd = toYMDStringOrNull(newValue); // "1995-08-15" hoặc null
    if (onChange) onChange(ymd);
    else setValue(ymd);
  };

  const hasError = Boolean(meta.touched && meta.error);

  return (
    <DatePicker
      value={pickerValue}
      onChange={handleChange}
      format={format} // format HIỂN THỊ (ví dụ dd/MM/yyyy)
      {...otherProps}
      slotProps={{
        textField: {
          name,
          fullWidth: true,
          variant: variant || "outlined",
          size: size || "medium",
          InputLabelProps: { shrink: true },
          error: hasError,
          helperText: hasError ? meta.error : otherProps.helperText,
          onBlur: () => setTouched(true)
        }
      }}
    />
  );
};

export default ReusableDatePicker;
