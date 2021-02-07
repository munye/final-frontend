import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Provider from "./Provider";
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AnotherListView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Pacientes"
    >
      <Container maxWidth={false}>
        <Provider>
          <Toolbar />
          <Box mt={3}>
            <Results />
          </Box>
        </Provider>
      </Container>
    </Page>
  );
};

export default AnotherListView;
