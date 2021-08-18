import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "10px 0 20px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 20px",
    //
    // backgroundColor: "#2C394B",
  },
  appBarLoggedIn: {
    borderRadius: 15,
    margin: "10px 0 20px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 20px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "12px 0",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 9,
      justifyContent: "center",
    },
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    margin: "0 3rem 0 1rem",
  },
  logo: {
    height: "40px",
    [theme.breakpoints.down("sm")]: {
      height: "32px",
    },
  },
  logoLoggedIn: {
    height: "40px",
    [theme.breakpoints.down("sm")]: {
      height: "35px",
      margin: "12px 0",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    // color: "#f7f8fc",
    color: "#333533",
    // backgroundColor: "#64C9CF",
    backgroundColor: "#c4fff9",
  },
  authButton: {
    backgroundColor: "#39A6A3",
    color: "white",
    "&:hover": {
      backgroundColor: "#00ADB5",
    },
  },
}));
