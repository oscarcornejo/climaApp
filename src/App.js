import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import MensajeError from './components/MensajeError';
import Clima from './components/Clima';

function App() {

  // state principal, se recomienda que cada pieza que sea necesaria la coloques en su propio state
  // ciudad = state, setCiudad = this.setState
  // pais = state, setPais = this.setState
  const [ciudad, setCiudad] = useState('');
  const [pais, setPais] = useState('');
  const [error, setError] = useState(false);
  const [resultado, guardarResultado]  = useState({})

  const titulo = 'Clima App';

  useEffect(() => {

    // Prvenir ejecución
    if (ciudad === '') return;

    const consultarApi = async () =>{
      const appId = 'Aplicar API KEY de OpenWeather';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      // CONSULTAR LA URL CON FETCH
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
    }

    consultarApi();
  }, [ ciudad, pais ]);

  const datosConsulta = (datos) => {

    // VALIDAR QUE LOS CAMPOS ESTÉN
    if(datos.ciudad === '' || datos.pais === '') {
      // MENSAJE DE ERROR
      setError(true);
      return;
    }

    // Ciudad y País existen, agregarlos al state
    setCiudad(datos.ciudad);
    setPais(datos.pais);
    setError(false);
  }

  // CARGAR UN COMPONENTE CONDICIONALMENTE
  let componente;
  if (error) {
    // EXISTE UN ERROR, MOSTRAR MENSAJE ERROR
    componente = <MensajeError mensaje='Los campos son obligatorios' />
  } else if (resultado.cod === '404') {
    componente = <MensajeError mensaje='La Ciudad no existe, pruebe con una correcta' />
  } else {
    // SI NO EXISTE ERROR, MOSTRAR EL CLIMA
    componente = <Clima resultado={resultado} />;
  }

  return (
    <div className="">
      <Header titulo={titulo} />
      
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario datosConsulta={datosConsulta} />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;
