/* eslint-disable prettier/prettier */
/* eslint-disable vars-on-top */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
import './newElevage.css';
import NativeSelect from '@material-ui/core/NativeSelect';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import React, { useState } from "react";
import DatePicker from 'react-date-picker';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import ElevageDataService from "../../services/ElevageServices";

export default function NewElevage() {
  const initialElevageState = {
    id: null,
    type: "",
    date_debut: "2021-01-01",
    nb_poulet: "",
  };

  const [submitted, setSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-01-01'));
  const [elevage, setElevage] = useState(initialElevageState);
  const [state, setState] = React.useState({
    type: 'Poulet de chair',
    etat: 'En cours',
  });
  


  const saveElevage = () => {
    const data = {
      type: elevage.type,
      nb_poulet: elevage.nb_poulet,
      date_debut: elevage.date_debut
    };

    ElevageDataService.create(data)
      .then(response => {
        setElevage({
          id: response.data.id,
          type: response.data.type,
          nb_poulet: response.data.nb_poulet,
          date_debut: response.data.date_debut
        });
        setSubmitted(true);
        console.log(response.data);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const newElevage = () => {
    setElevage(initialElevageState);
    setSubmitted(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setElevage({ ...elevage, [name]: value });
  };

  const handleChangeEtat = (event) => {
    const {etat} = event.target;
    setState({
      ...state,
      [etat]: event.target.value,
    });
  };

  const handleChangeType = (event) => {
    const {type} = event.target;
    // eslint-disable-next-line object-shorthand
    setElevage({ ...elevage, type: type });
    setState({
      ...state,
      [type]: event.target.value,
    });
    setElevage({ ...elevage, type: event.target.value });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // eslint-disable-next-line global-require
    var dateFormat = require("dateformat");
    var date1 = dateFormat(date, "yyyy-mm-dd");
    console.log(date1)
    setElevage({ ...elevage, date_debut: date1 });
  };




  return (
    
    <div className="newElevage">
      <Typography variant="h4" gutterBottom>
            Remplir le formulaire
      </Typography>

      {submitted ? (
        <div>
          <h4>Ajout réussi!</h4>
          <Button primary onClick={newElevage}>
            Ajouter
          </Button>
        </div>

        
      ) : (
        <div>
          <div className="newElevageItem">
          <label>Date de debut</label>
          <DatePicker
             onChange={handleDateChange}
             value={selectedDate}
          />
          </div>


          <div className="newElevageItem">
            <label>Type</label>
            <NativeSelect
              value={elevage.type}
              onChange={handleChangeType}
              name="type"
              id="type"
              inputProps={{
                type: 'type',
                id: 'name-native-disabled',
              }}
            >
              <option value="">Choisir</option>
              <option value="Poule pondeuse">Poule pondeuse</option>
              <option value="Poulet de chair">Poulet de chair</option>
            </NativeSelect>

          </div>
          <div className="newElevageItem">
            <label htmlFor="cin">Nombre de poulet</label>
            <input
              type="text"
              className="form-control"
              id="nb_poulet"
              required
              value={elevage.nb_poulet}
              onChange={handleInputChange}
              name="nb_poulet"
            />
          </div>
          
          <button className="newElevageButton" onClick={saveElevage} >
            Enregistrer
          </button>
        </div>


      )}
    </div>

  );
}
