/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";

import { getPosts } from "../actions/posts";
import useStyles from "./styles";

// Pagination is the bar you see on bottom which tells how many pages are there
const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  const classes = useStyles();

  // here we're fetching posts when page is loaded
  // here if there is a page then dispatch getPosts and we pass 'page' which is the current page
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      // the number of pages we'll have (number of posts)
      count={numberOfPages}
      // current page number
      page={Number(page) || 1}
      variant="outlined"
      renderItem={(item) => (
        // sending all data from items
        <PaginationItem
          {...item}
          component={Link}
          style={{ backgroundColor: "#EFFFFF" }}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
