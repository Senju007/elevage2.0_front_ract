/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
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
import PrevaccinDataService from '../../services/PrevaccinServices';
import ElevageDataService from '../../services/ElevageServices';
import {
  CalendarToday,
  PermIdentity,
} from "@material-ui/icons";
import { Icon } from '@iconify/react';
import "./prevaccin.css";
import NativeSelect from '@material-ui/core/NativeSelect';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button'
import needleIcon from '@iconify/icons-mdi/needle';
import stateIcon from '@iconify/icons-eos-icons/state';
import animalChicken from '@iconify/icons-healthicons/animal-chicken';
import textDescription24Regular from '@iconify/icons-fluent/text-description-24-regular';
import cashIcon from '@iconify/icons-mdi/cash';

const Prevaccin = props => {
  const initialPrevaccinState = {
    id: null,
    elevage: "",
    nom:"",
    date_debut: "",
    date_fin: "",
    prix_unitaire: "",
    prix_total:"",
    etat: "",
    description: "",
  };
  const [currentPrevaccin, setCurrentPrevaccin] = useState(initialPrevaccinState);
  const [message, setMessage] = useState("");
  const [nbpoulet, setNbpoulet] = useState("");
  const [etat, setEtat] = useState('');
  const [state, setState] = React.useState({
    type: 'Poulet de chair',
    etat: 'En cours',
  });

  const handleChangeEtat = (event) => {
    const etat = event.target.etat;
    setCurrentPrevaccin({ ...currentPrevaccin, etat: etat });
    setCurrentPrevaccin({ ...currentPrevaccin, etat : event.target.value  });
  };

  const handleChangePrix = (event) => {
    const prix_unitaire = event.target.etat;
    setCurrentPrevaccin({ ...currentPrevaccin, prix_unitaire: prix_unitaire });
    setCurrentPrevaccin({ ...currentPrevaccin, prix_unitaire : event.target.value  });
  };


  const getPrevaccin = id => {
    PrevaccinDataService.get(id)
      .then(response => {
        setCurrentPrevaccin(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getElevage = id => {
    ElevageDataService.get(id)
      .then(response => {
        setNbpoulet(response.data.nb_poulet);
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
    var idPre = localStorage.getItem("idPrev");
    var idEle = localStorage.getItem("idElevage");
    getPrevaccin(idPre);
    getElevage(idEle);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentPrevaccin({ ...currentPrevaccin, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentPrevaccin.id,
      nom : currentPrevaccin.nom,
      date_debut : currentPrevaccin.date_debut,
      date_fin : currentPrevaccin.date_fin,
      elevage: currentPrevaccin.elevage,
      prix_unitaire: currentPrevaccin.prix_unitaire,
      etat: currentPrevaccin.etat,
      prix_total : currentPrevaccin.prix_total,
      description : currentPrevaccin.description,
    };

    PrevaccinDataService.update(currentPrevaccin.id, data)
      .then(response => {
        setCurrentPrevaccin({ ...currentPrevaccin, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updatePrevaccin = () => {
    console.log('clicked')
    PrevaccinDataService.update(currentPrevaccin.id, currentPrevaccin)
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
      {currentPrevaccin ? (

        <div className="edit-form">
          <div className="nourritureTitleContainer">
            <h1 className="nourritureTitle">Details </h1>
          </div>
            <div className="nourritureContainer">
              <div className="nourritureShow">
                <div className="nourritureShowTop">
                  <div className="nourritureShowTopTitle">
                    <span className="nourritureShowUsername">Prevaccin N: {currentPrevaccin.id}</span>
                  </div>

                </div>

                <div className="nourritureShowBottom">
                  <span className="nourritureShowTitle">Details</span>
                  <div className="nourritureShowInfo">
                  <Icon icon={needleIcon} />
                    <span className="nourritureShowInfoTitle">Nom : {currentPrevaccin.nom}</span>
                  </div>
                  <div className="nourritureShowInfo">
                  <Icon icon={stateIcon} />
                    <span className="nourritureShowInfoTitle">Etat : {currentPrevaccin.etat}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <CalendarToday className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Debut : {currentPrevaccin.date_debut}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <CalendarToday className="nourritureShowIcon" />
                    <span className="nourritureShowInfoTitle">Fin : {currentPrevaccin.date_fin}</span>
                  </div>
                  <div className="nourritureShowInfo">
                    <Icon icon={animalChicken} />
                    <span className="nourritureShowInfoTitle">Elevage N : {currentPrevaccin.elevage}</span>
                  </div>
                  <span className="nourritureShowTitle">Plus de details</span>
                  
                  <div className="nourritureShowInfo">
                    <Icon icon={textDescription24Regular}/>
                    <span className="nourritureShowInfoTitle">Description : {currentPrevaccin.description}</span>
                  </div>
                  <div className="nourritureShowInfo">
                  <Icon icon={cashIcon}/>
                    <span className="nourritureShowInfoTitle">Prix unitaire : {currentPrevaccin.prix_unitaire} </span>
                  </div>
                  <div className="nourritureShowInfo">
                  <Icon icon={cashIcon}/>
                    <span className="nourritureShowInfoTitle">Prix total : {currentPrevaccin.prix_unitaire*nbpoulet} </span>
                  </div>
                </div>
              </div>


              <div className="nourritureUpdate">
                <span className="nourritureUpdateTitle">Modifier</span>
                <form className="nourritureUpdateForm">
                  <div className="nourritureUpdateLeft">
                    <div className="nourritureUpdateItem">
                       <label htmlFor="cin">Prix unitaire (Ar)</label>
                        <NumberFormat 
                        thousandsGroupStyle="thousand"
                        value={currentPrevaccin.prix_unitaire}
                        prefix="Ar "
                        decimalSeparator = "."
                        displayType="input"
                        type="text"
                        thousandSeparator={true}
                        allowNegative={false}
                        onValueChange={(values) => {
                          const {formattedValue , value} = values
                          setCurrentPrevaccin({ ...currentPrevaccin, prix_unitaire: value , prix_total : value*nbpoulet });
                        }}
                     />
                   </div>

                   <div className="nourritureUpdateItem">
                        <NumberFormat 
                        thousandsGroupStyle="thousand"
                        value={currentPrevaccin.prix_total}
                        prefix="Ar "
                        decimalSeparator = "."
                        displayType="input"
                        type="hidden"
                        thousandSeparator={true}
                        allowNegative={false}
                        onValueChange={(values) => {
                          const {formattedValue , value} = values
                          setCurrentPrevaccin({ ...currentPrevaccin, prix_total: value });
                        }}
                     />
                   </div>

                   <div className="nourritureUpdateItem">
                      <label>Etat</label>
                      <NativeSelect
                        value={currentPrevaccin.etat}
                        onChange={handleChangeEtat}
                        name="etat"
                        id="etat"
                        inputProps={{
                          type: 'etat',
                          id: 'name-native-disabled',
                        }}
                      >
                        <option value="">Choisir</option>
                        <option value="Inachevé">Inachevé</option>
                        <option value="Achevé">Achevé</option>
                      </NativeSelect>


                      

          </div>
                    


                  </div>
                  
                </form>

                <div className="nourritureUpdateRight">
                <Button className="nourritureAddButton" variant="contained" color="success" onClick={updatePrevaccin}>
                     Modifier
                </Button>
                </div>
                <p>{message}</p>
              </div>
            </div>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Prevaccin...</p>
        </div>
      )}
    </div>
  );
};

export default Prevaccin;