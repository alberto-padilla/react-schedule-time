import React, { Fragment, useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

    // citas en local storage
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales){
        citasIniciales = [];
    }
    // arreglo de citas
    const [citas, guardarCitas] = useState( citasIniciales );

    // use Effect para escuchar cuando cambie algun state
    useEffect( () => {
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
        if(citasIniciales){
            localStorage.setItem('citas', JSON.stringify(citas));
        }

    }, [ citas ] );

    // function que tome las citas actuales y agregue la nueva
    const crearCita = cita => {
        guardarCitas([
            ...citas,
            cita
        ]);
    }

    // funcion que elimina una cita por su id
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(cita => cita.id !== id);
        guardarCitas(nuevasCitas);
    };

    return (
        <Fragment>
            <h1>Administrador de Pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario
                            crearCita={crearCita}
                        />
                    </div>
                    <div className="one-half column">
                        <h1>{ citas.length > 0 ? 'Administra tus citas' : 'No hay citas'}</h1>
                        {citas.map(cita => (
                            <Cita
                                key={cita.id}
                                cita={cita}
                                eliminarCita={eliminarCita}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
