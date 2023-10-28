import { TextField, CircularProgress } from '@mui/material';

export type CustomTextFieldCurrentState = 'default' | 'loading' | 'sending';
export type CustomTextFieldProps = {
  currentState: CustomTextFieldCurrentState;
  multiline: boolean;
  fullWidth: boolean;
  label: string;
  content: string;
  maxLength: number;
  onChange: (text: string) => void;
  className: string;
};

export const CustomTextField = (props: CustomTextFieldProps) => {
  const error = props.content.length > props.maxLength;
  return (
    <TextField
      className={props.className}
      error={error}
      helperText={error ? `${props.maxLength}文字以内で入力してください` : null}
      label={props.currentState === 'loading' ? '読み込み中' : props.label}
      variant="outlined"
      multiline={props.multiline}
      fullWidth={props.fullWidth}
      value={props.content}
      onChange={(e) => {
        props.onChange(e.target.value);
      }}
      disabled={props.currentState !== 'default'}
    />
  );
};

export default CustomTextField;
