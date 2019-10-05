import React from 'react';

const MensajeError = ({mensaje}) => {
    return ( 
        <div className="card-panel red darken-4 error col s12">
            {mensaje}
        </div>
     );
}
 
export default MensajeError;