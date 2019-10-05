import React, {useState} from 'react';

const Formulario = ({datosConsulta}) => {

    //state del Componente
    // busqueda = state
    // guardarBusqueda = this.setState({})
    const [busqueda, guardarBusqueda] = useState({
        ciudad: '',
        pais: ''
    })

    const handleChange = (e) => {

        // CAMBIAR EL STATE
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        // console.log(e);
        e.preventDefault();

        // ENVIA LOS DATOS DEL COMPONENTE HIJO AL COMPONENTE PRINCIPAL
        datosConsulta(busqueda);
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <div className="input-field col s12">
                <input type="text" name="ciudad" id="ciudad" onChange={handleChange} />
                <label htmlFor="ciudad">Ciudad</label>
            </div>

            <div className="input-field col s12">
                <select onChange={handleChange} name="pais" id="pais">
                    <option value="">Seleccionar País</option>
                    <option value="AR">Argentina</option>
                    <option value="CR">Costa Rica</option>
                    <option value="CO">Colombia</option>
                    <option value="CL">Chile</option>
                    <option value="MX">México</option>
                    <option value="US">Estados Unidos</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
            </div>

            <div className="input-field col s12">
                <input type="submit" onSubmit={handleSubmit} className="waves-effect waves-light btn-large btn-block yellow accent-4" value="Buscar Clima" />
            </div>

        </form>
     );
}
 
export default Formulario;