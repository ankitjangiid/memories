import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  media: {
    borderRadius: "20px",
    objectFit: "cover",
    width: "100%",
    maxHeight: "320px",
  },
  card: {
    display: "flex",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      flexDirection: "column",
    },
  },
  section: {
    borderRadius: "20px",
    margin: "10px",
    flex: 1,
  },
  imageSection: {
    marginLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: "flex",
    marginTop: "30px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  recommendedPost: {
    margin: "5px",
    borderRadius: 10,
  },
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  commentsOuterContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  commentsInnerContainer: {
    height: "200px",
    overflowY: "auto",
    marginRight: "30px",
  },
  commentButton: {
    marginTop: "10px",
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
  textFieldLabel: {
    color: "#94D0CC",
  },
}));
