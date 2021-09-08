/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier *//* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
// eslint-disable-next-line react/button-has-type
/* eslint-disable no-var */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/order */
import React, { useState, useEffect } from "react";
import NourritureDataService from '../../services/NourrirureServices';
import {
  CalendarToday,
  PermIdentity,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./nourriture.css";
import NativeSelect from '@material-ui/core/NativeSelect';
import NumberFormat from 'react-number-format';


const Nourriture = props => {
  const initialNourritureState = {
    id: null,
    nom:"",
    date_debut: "",
    date_fin: "",
    quantité_journalière:"",
    quantité_total: "",
    total_journalière:"",
    prix: "",
    etat: "",
    details: "",
    poids_estimé:"",
    poids_relevé: "",
    observation:""
  };
  const [currentNourriture, setCurrentNourriture] = useState(initialNourritureState);
  const [message, setMessage] = useState("");
  const [etat, setEtat] = useState('');
  const [state, setState] = React.useState({
    type: 'Poulet de chair',
    etat: 'En cours',
  });

  const handleChangeEtat = (event) => {
    const etat = event.target.etat;
    setCurrentNourriture({ ...currentNourriture, etat: etat });
    setCurrentNourriture({ ...currentNourriture, etat : event.target.value  });
  };

  const handleChangePrix = (event) => {
    const prix = event.target.etat;
    setCurrentNourriture({ ...currentNourriture, prix: prix });
    setCurrentNourriture({ ...currentNourriture, prix : event.target.value  });
  };

  const handleChangePoids = (event) => {
    const poids = event.target.etat;
    setCurrentNourriture({ ...currentNourriture, poids_prelevé: poids });
    setCurrentNourriture({ ...currentNourriture, poids_prelevé : event.target.value  });
  };

  const getNourriture = id => {
    NourritureDataService.get(id)
      .then(response => {
        setCurrentNourriture(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = event => {
    var idr = localStorage.getItem("id");
    getNourriture(idr);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentNourriture({ ...currentNourriture, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentNourriture.id,
      nom : currentNourriture.nom,
      date_debut : currentNourriture.date_debut,
      date_fin : currentNourriture.date_fin,
      elevage: currentNourriture.elevage,
      prix: currentNourriture.prix,
      etat: currentNourriture.etat,
      total_journalière : currentNourriture.total_journalière,
      quantité_total : currentNourriture.quantité_total,
      details : currentNourriture.details,
      poids_estimé : currentNourriture.poids_estimé,
      poids_prelevé : currentNourriture.poids_prelevé,
      observation: currentNourriture.observation

    };

    NourritureDataService.update(currentNourriture.id, data)
      .then(response => {
        setCurrentNourriture({ ...currentNourriture, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateNourriture = () => {
    console.log('clicked')
    NourritureDataService.update(currentNourriture.id, currentNourriture)
      .then(response => {
        console.log(response.data);
        setMessage("Modification reussi!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="nourriture">
      {currentNourriture ? (

        <div className="edit-form">
          <div className="nourritureTitleContainer">
            <h1 className="nourritureTitle">Details </h1>
              <button className="nourritureAddButton" onClick = {() => handleGet()} >Ajouter</button>
          </div>
            <div className="nourritureContainer">
              <div className="nourritureShow">
                <div className="nourritureShowTop">
                  <div className="nourritureShowTopTitle">
                    <span className="nourritureShowUsername">Nourriture N: {currentNourriture.id}</span>
                  </div>

                </div>

                <div className="nourritureShowBottom">
                  <span className="nourritureShowTitle">Details</span>
                  <div className="nourritureShowInfo">
                    <PermIdentity className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Nom : {currentNourriture.nom}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <PermIdentity className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Etat : {currentNourriture.etat}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <CalendarToday className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Debut : {currentNourriture.date_debut}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <CalendarToday className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Fin : {currentNourriture.date_fin}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Elevage N : {currentNourriture.elevage}</span>
                  </div>
                  <span className="nourritureShowTitle">Plus de details</span>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Qte journaliere : {currentNourriture.quantité_journalière} g</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Qte total journaliere : {currentNourriture.total_journalière} g</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Qte total : {currentNourriture.quantité_total} g</span>
                  </div>
                  
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Prix total : <NumberFormat value={currentNourriture.prix} displayType={'text'} thousandSeparator={true} prefix={'Ar  '}/> </span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Poid estimé : {currentNourriture.poids_estimé}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Poid prelevé : {currentNourriture.poids_prelevé}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <span className="nourritureShowInfoTitle">Observation : {currentNourriture.observation}</span>
                  </div>
                </div>
              </div>


              <div className="nourritureUpdate">
                <span className="nourritureUpdateTitle">Modifier</span>
                <form className="nourritureUpdateForm">
                  <div className="nourritureUpdateLeft">
                    <div className="nourritureUpdateItem">
                       <label htmlFor="cin">Prix total (Ar)</label>
                        <NumberFormat 
                        thousandsGroupStyle="thousand"
                        value={currentNourriture.prix}
                        prefix="Ar "
                        decimalSeparator = "."
                        displayType="input"
                        type="text"
                        thousandSeparator={true}
                        allowNegative={false}
                        onValueChange={(values) => {
                          const {formattedValue , value} = values
                          setCurrentNourriture({ ...currentNourriture, prix: value });
                        }}
                        name="nb_poulet"
                     />
                   </div>
                     
                   <div className="nourritureUpdateItem">
                       <label htmlFor="cin">Poids prelevé sur les 10% </label>
                        <input
                         type="text"
                         className="form-control"
                         id="nb_poulet"
                         required
                         value={currentNourriture.poids_prelevé}
                         onChange={handleChangePoids}
                         name="nb_poulet"
                        />
                   </div>

                   <div className="nourritureUpdateItem">
                      <label>Etat</label>
                      <NativeSelect
                        value={currentNourriture.etat}
                        onChange={handleChangeEtat}
                        name="etat"
                        id="etat"
                        inputProps={{
                          type: 'etat',
                          id: 'name-native-disabled',
                        }}
                      >
                        <option value="">Choisir</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                      </NativeSelect>


                      

          </div>
                    


                  </div>
                  
                </form>

                <div className="nourritureUpdateRight">
                    <button className="nourritureAddButton" onClick={updateNourriture}>Modifier</button>
                </div>
                <p>{message}</p>
              </div>
            </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Nourriture...</p>
        </div>
      )}
    </div>
  );
};

export default Nourriture;