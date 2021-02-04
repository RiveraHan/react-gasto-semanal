import React, {useState, useEffect} from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

  const [presupuesto, guardarPresupuesto] = useState(0)
  const [restante, guardarRestante] = useState(0)
  const [mostrarPregunta, actualizarPregunta] = useState(true)
  const [gastos, guadarGastos] = useState([])
  const [gasto, guadarGasto] = useState({})
  const [crearGasto, guadarCrearGasto] = useState(false)

  useEffect(() => {
    if(crearGasto) {
      guadarGastos([
        ...gastos,
        gasto
      ])

      const presupuestoRestante = restante - gasto.cantidad;

      guardarRestante(presupuestoRestante);

      guadarCrearGasto(false);
    }
  },[gasto, crearGasto, restante, gastos])

  return (
    <div className="container">
      <header>
      <h1>Gasto Semanal</h1>
      <div className="contenido-principal contenido">
        {mostrarPregunta ? 
        (
          <Pregunta
            guardarPresupuesto={guardarPresupuesto}
            guardarRestante={guardarRestante}
            actualizarPregunta={actualizarPregunta}
         />
        ) : 
        (
          <div className="row">
            <div className="one-half column">
              <Formulario
                guadarGasto={guadarGasto}
                guadarCrearGasto={guadarCrearGasto}
              />
            </div>
            <div className="one-half column">
              <Listado 
                gastos={gastos}
              />
              <ControlPresupuesto
                presupuesto={presupuesto}
                restante={restante}
              />

            </div>
        </div>
        )}
      </div>
      </header>
    </div>
  );
}

export default App;
