import { useState } from 'react';

const useForm = (callback, initialState={}, resetOnSubmit=true) => {

  // Esitellään useState-hook, johon käyttäjän lomakkeelle syöttämä 
  // tieto tallennetaan 
  const [values, setValues] = useState(initialState);

  // Submit-käsittelijä, joka estää oletustoiminnon ja kutsuu
  // määriteltyä callback-funktiota. Lisäksi resetoidaan tarvittaessa
  // lomakkeen tiedot.
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
    if (resetOnSubmit) {
      resetValues();
    }
  }

  // Syötekäsittelijä, joka tallentaa kentän tiedot sen nimellä 
  // state-muuttujaan.
  const handleChange = (event) => {
    event.persist();
    // Tallennetaan kenttään syötetty arvo välimuuttujaan.
    const value = event.target.value;
    // Tallennnetaan uusi arvo state-muuttujaan
    setValues(values => ({...values, [event.target.name]: value}));
  }

  // Syötekäsittelijä, joka tallentaa kentän tiedot sen nimellä 
  // state-muuttujan taulukkoon.
  const handleListChange = (event, listvalue) => {
    event.persist();
    // Tallennetaan kentän valinta välimuuttujaan
    const selected = event.target.checked;   
    // Tallennetaan nykyinen lista välimuuttujaan.
    let listValues = values[event.target.name];
    // Tarkistetaan onko valinnan arvo päällä. Jos on, 
    // lisätään kutsun yhteydessä tullut listValue 
    // listan jatkoksi, muuten poistetaan ko. arvo
    // listasta.
    if (selected) {
      listValues.push(listvalue);
    } else {      
      listValues = listValues.filter((item) => item !== listvalue);
    }
    // Päivitetään uuden listan sisältö state-muuttujaan.
    setValues({...values, [event.target.name]: listValues});
  }

  // Funktio, joka palauttaa lomakkeen tiedot alkutilanteeseen.
  const resetValues = () => {
    setValues(initialState);
  }

  // Palauttaa hooksin luonnin yhteydessä sekä käsittelijät, 
  // toiminnot että state-muuttujat.
  return {
    handleSubmit,
    handleChange,
    handleListChange,
    resetValues,
    setValues,
    values
  };

}

export default useForm;