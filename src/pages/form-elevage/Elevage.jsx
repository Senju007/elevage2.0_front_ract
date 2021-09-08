/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
import React, { useState, useEffect } from "react";
import ElevageDataService from "../../services/ElevageServices";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  ToggleOn,
  Pets,
} from "@material-ui/icons";
import { withRouter, Link } from 'react-dom';
import './elevage.css';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Elevage1 = props => {
  const initialElevageState = {
    id: null,
    date_debut: "",
    nb_poulet: "",
    type: "",
    etat: "",
  };
  const [vaccin, setVaccin] = useState([]);
  const [nourriture, setNourriture] = useState([]);
  const [currentElevage, setCurrentElevage] = useState(initialElevageState);
  const [message, setMessage] = useState("");
  const classes = useStyles();
  const [state, setState] = React.useState({
    type: 'Poulet de chair',
    etat: 'En cours',
  });

  const handleChangeEtat = (event) => {
    const {etat} = event.target;
    setState({
      ...state,
      [etat]: event.target.value,
    });
  };

  const handleChangeType = (event) => {
    const {type} = event.target;
    setState({
      ...state,
      [type]: event.target.value,
    });
  };

  const retrieveNourriture = () => {
    ElevageDataService.getAll()
      .then(response => {
        setNourriture(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
//*
  const retrieveVaccin = () => {
    VaccinDataService.getAll()
      .then(response => {
        setVaccin(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const getElevage = id => {
    ElevageDataService.get(id)
      .then(response => {
        setCurrentElevage(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getNourriture = id => {
    ElevageDataService.getNourriture(id)
      .then(response => {
        setNourriture(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    getNourriture(props.match.params.id);
    retrieveVaccin();
    getElevage(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentElevage({ ...currentElevage, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentElevage.id,
      date_debut: currentElevage.date_debut,
      nb_poulet: currentElevage.nb_poulet,
      type: currentElevage.type,
      etat: currentElevage.etat,
    };

    ElevageDataService.update(currentElevage.id, data)
      .then(response => {
        setCurrentElevage({ ...currentElevage, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };


  const columns = [
    
    {
        field: "quantité_journalière",
        headerName: "Qte jr (g)",
        width: 150,
    },
    {
      field: "quantité_total",
      headerName: "Qte T (g)",
      width: 150,
    },

    {
        field: "etat",
        headerName: "Etat",
        width: 130,
    },
    {
        field: "prix",
        headerName: "Prix",
        width: 150,
    },
  ];


  const columns_vaccin = [
    { field: "nom", headerName: "Nom", width: 150 },
    {
      field: "date_prescrit",
      headerName: "Date prescrit",
      width: 180,
    },
    {
        field: "prix_total",
        headerName: "Prix total",
        width: 150,
    },
    {
        field: "etat",
        headerName: "Etat",
        width: 130,
    },
  ];




  return (
    <div className="elevage">
      {currentElevage ? (

        <div className="edit-form">
          <div className="elevageTitleContainer">
            <h1 className="elevageTitle">Bilan global</h1>
            <Link to="/newElevage">
              <button className="elevageAddButton">Ajouter</button>
            </Link>
          </div>
          <form>
            <div className="elevageContainer">
              <div className="elevageShow">
                <div className="elevageShowTop">
                  <div className="elevageShowTopTitle">
                    <span className="elevageShowUsername">Elevage N: {currentElevage.id}</span>
                  </div>

                </div>

                <div className="elevageShowBottom">
                  <span className="elevageShowTitle">Details</span>
                  <div className="elevageShowInfo">
                    <PermIdentity className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.type}</span>
                  </div>
                  <div className="elevageShowInfo">
                    <CalendarToday className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.date_debut}</span>
                  </div>
                  <span className="elevageShowTitle">Plus de details</span>
                  <div className="elevageShowInfo">
                    <Pets className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.nb_poulet}</span>
                  </div>
                  <div className="elevageShowInfo">
                    <ToggleOn className="elevageShowIcon" />
                    <span className="elevageShowInfoTitle">{currentElevage.etat}</span>
                  </div>
                </div>
              </div>


              <div className="elevageUpdate">
                <span className="elevageUpdateTitle">Nourritures</span>
                  <DataGrid
                     rows={nourriture}
                     disableSelectionOnClick
                     columns={columns}
                     pageSize={8}
                  />


                
                <span className="elevageUpdateTitle">Vaccin</span>
                <DataGrid
                  rows={vaccin}
                  disableSelectionOnClick
                  columns={columns_vaccin}
                  pageSize={8}
                  checkboxSelection
                />
                    


              </div>
            </div>
          </form>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Proprietaire...</p>
        </div>
      )}
    </div>
  );
};

export default withRouter(Elevage1);