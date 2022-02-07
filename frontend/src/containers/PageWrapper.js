import React from "react";
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(180deg, #c6c6c6 0%, #ebf8e1 40%, #3f87a6 100%)',
      border: 0,
      height: "100%",
      width: "100%",
    },
  });

const PageWrapper  = ({ children }) => {
        const classes = useStyles();
        return (
            <Box className={classes.root} flex={1} padding={3} >
                {children}
            </Box>
        );
};

export default PageWrapper;