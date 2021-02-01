import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import PacienteDataService from "../../../services/PacienteService";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

/* const Results = ({ className, customers, ...rest }) => { */
const Results = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [limit, setLimit] = useState(7);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);


  /* Criterio de búsqueda por nombre */
  const [searchNombre, setSearchNombre] = useState("");

  const onChangeSearchNombre = (e) => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };
  /* Fin criterio de búsqueda */

  /* Criterio de búsqueda completo */
  const getRequestParams = (searchNombre, page, pageSize) => {
    let params = {};

    if (searchNombre) {
      params["nombre"] = searchNombre;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (limit) {
      params["size"] = limit;
    }

    return params;
  };
  /* Fin criterio de búsqueda completo */

  /* Buscar vía api a los pacientes */
  const retrieveTutorials = () => {
    const params = getRequestParams(searchNombre, page, limit);

    PacienteDataService.getAll(params)
      .then((response) => {
        const { tutorials, totalItems } = response.data;

        setCustomers(tutorials);
        /* setTutorials(tutorials); */
        setCount(totalItems);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveTutorials, [page, limit]);
  /* Buscar vía api */

  const handleRowClick = (event, id) => {
    let newUrl = `/historiaPaciente/${id}`
    /* Para probar
    newUrl = '/app/dashboard'; */
    console.log(`a la pagina ${newUrl}`)
    navigate(newUrl);
    /* console.log(`customer id ${id}`); */
  }

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);

  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    console.log(`customer id ${id}`);
    console.log(`customer idS ${newSelectedCustomerIds}`);


    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    console.log(event.target.value);
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  function randomColor() {
    const hex = Math.floor(Math.random() * 0xFFFFFF);
    const color = `#${hex.toString(16)}`;
    return color;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Nombre
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Direccion
                </TableCell>
                <TableCell>
                  Phone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {customers && customers.map((customer) => (

                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  onClick={(event) => handleRowClick(event, customer.id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Avatar
                        className={classes.avatar}
                        style={{ backgroundColor: randomColor() }}
                      >
                        {getInitials(customer.nombre)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.nombre}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {customer.email}
                  </TableCell>
                  <TableCell>
                    {`${customer.direccion}`}
                  </TableCell>
                  <TableCell>
                    {customer.phone}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={count}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[3, 7, 12, 24]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
/* {customers.slice(0, limit).map((customer) => ( */