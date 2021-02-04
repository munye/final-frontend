import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";

const Tutorial = props => {
  const initialTutorialState = {
    id: null,
    orden: 0,
    isActive: false,
    documento: "",
    nombre: "",
    genero: "",
    email: "",
    phone: "",
    direccion: ""
  };
  const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
  const [message, setMessage] = useState("");

  const getTutorial = id => {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTutorial({ ...currentTutorial, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTutorial.id,
      orden: currentTutorial.orden,
      isActive: currentTutorial.isActive,
      documento: currentTutorial.documento,
      nombre: currentTutorial.nombre,
      genero: currentTutorial.genero,
      email: currentTutorial.email,
      phone: currentTutorial.phone,
      direccion: currentTutorial.direccion
    };

    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        setCurrentTutorial({ ...currentTutorial, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTutorial = () => {
    TutorialDataService.update(currentTutorial.id, currentTutorial)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTutorial = () => {
    TutorialDataService.remove(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/people");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                name="nombre"
                value={currentTutorial.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="documento">Documento</label>
              <input
                type="text"
                className="form-control"
                id="documento"
                name="documento"
                value={currentTutorial.documento}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.isActive ? "Activo" : "Baja"}
            </div>
          </form>

          {currentTutorial.isActive ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished(true)}
              >
                Publish
              </button>
            )}

          <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
    </div>
  );
};

export default Tutorial;
