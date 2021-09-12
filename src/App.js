import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";

// STYLE
import './App.css';

function App() {
  const baseUrl = "http://localhost:80/apiseries/";

  // States
  const [data, setData] = useState([]);
  const [modalInsert, setModalInsert] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  //Modal States
  const modalInsertState = () => {
    setModalInsert(!modalInsert);
  }

  const modalEditState = () => {
    setModalEdit(!modalEdit);
  }

  const modalDeleteState = () => {
    setModalDelete(!modalDelete);
  }

  const [serieSelected, setSerieSelected] = useState({
    id: '',
    nombre: '',
    fecha_lanzamiento: '',
    temporadas: '',
    episodios: '',
    plataforma_actual: ''
  });

  const handleChange = e => {
    const {name, value} = e.target;
    setSerieSelected((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  
  // GET
  const getPet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    }).catch(error => console.log(error));
  };

  useEffect(() => {
    getPet();
  }, []);

  // POST
  const postPet = async() => {
    var f = new FormData();
    f.append('nombre', serieSelected.nombre);
    f.append('fecha_lanzamiento', serieSelected.fecha_lanzamiento);
    f.append('temporadas', serieSelected.temporadas);
    f.append('episodios', serieSelected.episodios);
    f.append('plataforma_actual', serieSelected.plataforma_actual);
    f.append('METHOD', "POST");
    await axios.post(baseUrl, f)
    .then((response) => {
        setData(data.concat(response.data));
        modalInsertState();
    }).catch(error => console.log(error));
  }

  // PUT
  const putPet = async() => {
    var f = new FormData();
    f.append('nombre', serieSelected.nombre);
    f.append('fecha_lanzamiento', serieSelected.fecha_lanzamiento);
    f.append('temporadas', serieSelected.temporadas);
    f.append('episodios', serieSelected.episodios);
    f.append('plataforma_actual', serieSelected.plataforma_actual);
    f.append('METHOD', "PUT");
    console.log("Put id: ", serieSelected.id)
    await axios.post(baseUrl, f, {params: {id: serieSelected.id}})
    .then((response) => {
        var dataNueva = data;
        dataNueva.map(serie => {
          if(serie.id === serieSelected.id){
            serie.nombre = serieSelected.nombre;
            serie.fecha_lanzamiento = serieSelected.fecha_lanzamiento;
            serie.temporadas = serieSelected.temporadas;
            serie.episodios = serieSelected.episodios;
            serie.plataforma_actual = serieSelected.plataforma_actual;
          }
        })
        setData(dataNueva);
        modalEditState();
    }).catch(error => console.log(error))
  }

  // DELETE
  const delPet = async() => {
    var f = new FormData();
    f.append('METHOD', "DELETE");
    await axios.post(baseUrl, f, {params: {id: serieSelected.id}})
    .then((response) => {
        setData(data.filter( serie => serie.id !== serieSelected.id));
        modalDeleteState();
    }).catch(error => console.log(error))
  }

  const selectSerie = async(serie, modalCase, id) => {
    setSerieSelected(serie);
    
      (modalCase === "Edit")? 
      modalEditState()
      :
      modalDeleteState()
      console.log("Serie Selected: ", serieSelected);
  }

  return (
    <div className='first'>
      <br />
      <button className='btn btn-success' onClick={() => modalInsertState()}>Insertar</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha de Lanzamiento</th>
            <th>Temporadas</th>
            <th>Episodios</th>
            <th>Plataforma Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((serie) => {
            return (
              <tr key={serie.id}>
                <td>{serie.id}</td>
                <td>{serie.nombre}</td>
                <td>{serie.fecha_lanzamiento}</td>
                <td>{serie.temporadas}</td>
                <td>{serie.episodios}</td>
                <td>{serie.plataforma_actual}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => selectSerie(serie, "Edit")}>Editar</button> {"   "}
                  <button className="btn btn-danger" onClick={() => selectSerie(serie, "Delete")}>Eliminar</button>{"   "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* INSERT MODAL WINDOW */}

      <Modal isOpen={modalInsert}>
        <ModalHeader>Insertar Serie</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name='nombre' onChange={handleChange}/>

            <label>Fecha de Lanzamiento: </label>
            <br />
            <input type="text" className="form-control" name='fecha_lanzamiento' onChange={handleChange}/>
            
            <label>Temporadas: </label>
            <br />
            <input type="text" className="form-control" name='temporadas' onChange={handleChange}/>
            
            <label>Episodios: </label>
            <br />
            <input type="text" className="form-control" name='episodios' onChange={handleChange}/>
            
            <label>Plataforma Actual: </label>
            <br />
            <input type="text" className="form-control" name='plataforma_actual' onChange={handleChange}/>
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => postPet()}>Insertar</button>{"   "}
          <button className='btn btn-danger'  onClick={() => modalInsertState()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* UPDATE MODAL WINDOW */}

      <Modal isOpen={modalEdit}>
        <ModalHeader>Edit Serie</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Nombre: </label>
            <br />
            <input type="text" className="form-control" name='nombre' onChange={handleChange} value={serieSelected && serieSelected.nombre}/>

            <label>Fecha de Lanzamiento: </label>
            <br />
            <input type="text" className="form-control" name='fecha_lanzamiento' onChange={handleChange} value={serieSelected && serieSelected.fecha_lanzamiento}/>
            
            <label>Temporadas: </label>
            <br />
            <input type="text" className="form-control" name='temporadas' onChange={handleChange} value={serieSelected && serieSelected.temporadas}/>
            
            <label>Episodios: </label>
            <br />
            <input type="text" className="form-control" name='episodios' onChange={handleChange} value={serieSelected && serieSelected.episodios}/>
            
            <label>Plataforma Actual: </label>
            <br />
            <input type="text" className="form-control" name='plataforma_actual' onChange={handleChange} value={serieSelected && serieSelected.plataforma_actual}/>
            
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => putPet()}>Editar</button>{"   "}
          <button className='btn btn-danger' onClick={() => modalEditState()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* Confirm Erase */}

      <Modal isOpen={modalDelete}>
        <ModalBody>
          Delete {selectSerie && serieSelected.name}?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => delPet()}>Yes</button>
          <button className='btn btn-secondary' onClick={() => modalDeleteState()}>No</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
