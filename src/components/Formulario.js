import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guadarGasto, guadarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = e => {
        e.preventDefault();

        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }
        guadarGasto(gasto);
        guardarNombre('');
        guardarCantidad(0);
        guadarCrearGasto(true);
    }

    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aquí</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios o Prespuesto Incorrecto" /> : null}

            <div className="campo">
                <label>Nombre Gastos</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gastos</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value || 0)) }
                />
            </div>

            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
     );
}

Formulario.propTypes = {
    guadarGasto: PropTypes.func.isRequired,
    guadarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;