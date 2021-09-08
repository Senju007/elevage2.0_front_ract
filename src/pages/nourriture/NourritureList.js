/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable camelcase */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { DeleteOutline , DetailsOutlined } from '@material-ui/icons';
import { sentenceCase } from 'change-case';
import React, { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import NourritureDataService from '../../services/NourrirureServices';
// material
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../components/_dashboard/user';
//

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'elevage', label: 'E', alignRight: false },
  { id: 'nom', label: 'Nom', alignRight: false },
  { id: 'date_debut', label: 'Debut', alignRight: false },
  { id: 'date_fin', label: 'Fin', alignRight: false },
  { id: 'total_journalière', label: 'Qte jr', alignRight: false },
  { id: 'quantité_total', label: 'Qte T', alignRight: false },
  { id: 'prix', label: 'prix', alignRight: false },
  { id: 'etat', label: 'etat', alignRight: false },
  { id: 'action', label: 'Action', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_elevage) => _elevage.type.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Nourriture() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [nourriture, setNourriture] = useState([]);
  const [currentNourriture, setCurrentNourriture] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [open, setOpen] = React.useState(false)
  const [id , setId] = useState(null);

  useEffect(() => {
    retrieveNourriture();
  }, []);

  const handleClickOpen = (id) => {
    localStorage.setItem("id", id);
    setOpen(true);
    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };


  const setActiveNourriture = (nourriture, index) => {
    setCurrentNourriture(nourriture);
    setCurrentIndex(index);
  };

  const refreshList = () => {
    retrieveNourriture();
    setCurrentNourriture(null);
    setCurrentIndex(-1);
  };


  const retrieveNourriture = () => {
    NourritureDataService.getAll()
      .then(response => {
        setNourriture(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const deleteNourriture = (id) => {
    NourritureDataService.remove(id)
      .then(response => {
        console.log(response.data);
        handleClose();
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = nourriture.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - nourriture.length) : 0;

  const filteredElevages = applySortFilter(nourriture, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredElevages.length === 0;

  const newLocal = 'Confirmer la suppression';
  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Elevage
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={nourriture.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredElevages
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, elevage, nom, date_debut, date_fin, total_journalière , quantité_total, prix, etat } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {id}
                              </Typography>
                            </Stack>
                          </TableCell>
                          
                          <TableCell align="left">{elevage}</TableCell>
                          <TableCell align="left">{nom}</TableCell>
                          <TableCell align="left">{date_debut}</TableCell>
                          <TableCell align="left">{date_fin}</TableCell>
                          <TableCell align="left">{total_journalière}</TableCell>
                          <TableCell align="left">{quantité_total}</TableCell>
                          <TableCell align="left">{prix}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(etat === 'Terminé' && 'error') || 'success'}
                            >
                              {sentenceCase(etat)}
                            </Label>
                          </TableCell>
                          <TableCell>
                          
                            
                            <IconButton aria-label="details"
                            component={RouterLink}
                            onClick={() => handleClickOpen(id)}
                            to={"/dashboard/detailsNourriture/"+id}
                            >
                              <DetailsOutlined />
                            </IconButton>

                            <IconButton aria-label="delete"
                              // eslint-disable-next-line no-undef
                              onClick={() => handleClickOpen(id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{newLocal}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <Alert Alert variant="filled" severity="warning">
                  {' '}
                  Vous voulez vraiment effacer cette element ??
                </Alert>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annuler
              </Button>
              <Button onClick={() => deleteNourriture(id)} color="primary" autoFocus>
                Poursuivre
              </Button>
            </DialogActions>
          </Dialog>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={nourriture.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
