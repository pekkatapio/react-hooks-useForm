import useForm from './useform.js';

function App() {

  const submit = () => {
    console.log(values);
  }

  const urheilut = ["juoksu", "kävely", "ryömintä", "räpyttely", "snorklaaminen"];

  const { values, handleSubmit, handleChange, handleListChange } = useForm(submit, {teksti: "", urheilu: []}, false);

  const valintalista = urheilut.map(item =>     
    <div key={item}>
      <input type="checkbox" 
             name="urheilu" 
             defaultChecked={values.urheilu.includes(item)} 
             onChange={(event) => handleListChange(event, item)}               
      /> {item}
    </div>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Teksti: <input type="text" name="teksti" onChange={handleChange} value={values.teksti} /></div>
        <div>
          { valintalista }
        </div>
        <div><input type="submit" value="lähetä"/></div>
      </form>          
    </div>
  );
}

export default App;