import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 10,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 10,
    margin: "15px 0",
    padding: "5px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
  searchButton: {
    borderRadius: "20px",
    color: "#f7f8fc",
    backgroundColor: "#71C9CE",
    "&:hover": {
      backgroundColor: "#28B5B5",
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
