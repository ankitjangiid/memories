import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#FFA2A2",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: "20px",
    backgroundColor: "#71C9CE",
    "&:hover": {
      backgroundColor: "#28B5B5",
    },
  },
  googleButton: {
    marginBottom: theme.spacing(2),
    borderRadius: "20px",
    backgroundColor: "#71C9CE",
    "&:hover": {
      backgroundColor: "#28B5B5",
    },
  },
  switchMode: {
    borderRadius: 10,
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
