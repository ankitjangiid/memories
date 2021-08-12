import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  submitButton: {
    marginBottom: 10,
    borderRadius: "20px",
    color: "#f7f8fc",
    backgroundColor: "#71C9CE",
    "&:hover": {
      backgroundColor: "#28B5B5",
    },
  },
  clearButton: {
    color: "#f7f8fc",
    borderRadius: "20px",
    backgroundColor: "#FFA2A2",
    "&:hover": {
      backgroundColor: "#FF8B8B",
    },
  },
  textField: {
    "& label.Mui-focused": {
      color: "#39A6A3",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#CDF0EA",
      },
      "&:hover fieldset": {
        borderColor: "#94D0CC",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#39A6A3",
      },
    },
  },
}));
