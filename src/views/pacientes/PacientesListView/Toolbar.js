import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { ColorLensOutlined } from '@material-ui/icons';
import { Consumer } from "./Context";

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  addButton: {
    marginRight: theme.spacing(1)
  },
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  /* const [searchQuery, setSearchQuery] = useState(''); */

  const pistola = () => {
    /* aca hay que mandar el query */
    console.log('Esto Era Pistola');
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <Fab className={classes.addButton}
          color="primary"
          aria-label="Marsopa"
          href="/marsopa">
          <AddIcon />
        </Fab>
      </Box>

      <Box justifyContent="center" mt={3}>
        <Consumer>
          {(context) => (
            <Card>
              <CardContent>
                <Box maxWidth={500}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon
                            fontSize="small"
                            color="action"
                          >
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )
                    }}
                    placeholder="Buscar"
                    variant="outlined"
                    value={context.searchCriteria}
                    onChange={(e) => {
                      console.log('cambiado')
                      context.updateSearchCriteria(e.target.value)
                      /* setSearchQuery(e.target.value) */
                    }}
                    onKeyPress={(event) => {
                      if (event.key === 'Enter') {
                        console.log('llendo a context.logSearchCriteria')
                        context.logSearchCriteria()
                        /* pistola() */
                      }
                    }}
                  />
                </Box>

              </CardContent>
            </Card>
          )}
        </Consumer>

      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
