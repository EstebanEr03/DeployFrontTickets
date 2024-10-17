import React, { useEffect, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// Importar las funciones del controlador
import { getEmpleados, addEmpleado, updateEmpleado, deleteEmpleado } from '../Controllers/empleadoController';

function CrudComponent() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [sede, setSede] = useState("");
  const [area, setArea] = useState("");  
  const [id, setId] = useState();
  const [editar, setEditar] = useState(false);
  const [empleadosList, setEmpleados] = useState([]);
  const navigate = useNavigate();  // Hook para redirigir si no hay token

  // Comprobar si hay token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  // Si no hay token, redirige al login
    } else {
      cargarEmpleados();  // Si hay token, carga los empleados
    }
  }, [navigate]);

  // Obtener empleados utilizando el controlador
  const cargarEmpleados = async () => {
    try {
      const empleados = await getEmpleados();
      setEmpleados(empleados);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "No se pudo obtener la lista de empleados.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Registrar un nuevo empleado utilizando el controlador
  const add = async () => {
    const nuevoEmpleado = {
      nombre: nombre,
      edad: edad,
      sede: sede,
      area: area,
      email: "ejemplo@correo.com",  // Puedes reemplazar esto con un input en tu formulario
      password: "contraseña123"     // Puedes reemplazar esto con un input en tu formulario
    };

    try {
      await addEmpleado(nuevoEmpleado);
      cargarEmpleados();  // Recargar la lista después de añadir
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue registrado con éxito! ! !</i>",
        icon: 'success',
        timer: 3000
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el empleado.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Actualizar un empleado utilizando el controlador
  const update = async () => {
    const empleadoActualizado = {
      id: id,
      nombre: nombre,
      edad: edad,
      sede: sede,
      area: area
    };

    try {
      await updateEmpleado(empleadoActualizado);
      cargarEmpleados();  // Recargar la lista después de actualizar
      limpiar();
      Swal.fire({
        title: "<strong>Actualización exitosa!!!</strong>",
        html: "<i>El empleado <strong>" + nombre + "</strong> fue actualizado con éxito! ! !</i>",
        icon: 'success',
        timer: 3000
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar el empleado.",
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  // Eliminar un empleado utilizando el controlador
  const deleteEmple = async (val) => {
    Swal.fire({
      title: "Confirmar eliminado?",
      html: "<i>Realmente quieres eliminar a <strong>" + val.nombre + "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarlo!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteEmpleado(val.id);
          cargarEmpleados();  // Recargar la lista después de eliminar
          limpiar();
          Swal.fire({
            title: "Eliminado!",
            text: "Usuario eliminado con éxito.",
            icon: "success",
            timer: 3000
          });
        } catch (err) {
          console.error(err);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el empleado.",
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    });
  };

  // Limpiar el formulario
  const limpiar = () => {
    setNombre("");
    setEdad("");
    setSede("");
    setArea("");
    setId("");
    setEditar(false);
  };

  // Preparar los datos para editar
  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setSede(val.sede);
    setArea(val.area);
    setId(val.id);
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE USUARIO SOPORTE UDLA
        </div>
        <div className="card-body">
          {/* Formulario para registrar/editar empleados */}
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre:</span>
            <input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} className="form-control" placeholder="Ingrese el nombre" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Edad:</span>
            <input type="number" value={edad} onChange={(event) => setEdad(event.target.value)} className="form-control" placeholder="Ingrese una edad" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Sede:</span>
            <input type="text" value={sede} onChange={(event) => setSede(event.target.value)} className="form-control" placeholder="Ingrese una sede" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Área:</span>
            <input type="text" value={area} onChange={(event) => setArea(event.target.value)} className="form-control" placeholder="Ingrese el área" />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar ?
              <div>
                <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={limpiar}>Cancelar</button>
              </div>
              :
              <button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>
      </div>

      {/* Tabla para mostrar empleados */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Sede</th>
            <th>Área</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            empleadosList.map((val, key) => {
              return (
                <tr key={val.id}>
                  <th>{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.sede}</td>
                  <td>{val.area}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button type="button" className="btn btn-info" onClick={() => editarEmpleado(val)}>Editar</button>
                      <button type="button" className="btn btn-danger" onClick={() => deleteEmple(val)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default CrudComponent;
