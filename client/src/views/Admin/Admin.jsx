import styles from "./Admin.module.css"

const Admin = () => {
    return(
        <div className={styles.container}>
          <h1>Panel de control</h1>
          <h4>habilitar / deshabilitar anuncios</h4>
          <hr />
          <ul>
            
          </ul>
          
            <div>
              <h2>Información adicional del anuncio:</h2>
              <p>Título: </p>
              <p>Profesor: </p>
               <p>Estado: activo</p> 
              <button>
               
              </button>
            </div>
          <div>
            <h4>habilitar / deshabilitar Usuarios</h4>
            <hr />
            <ul>
              
            </ul>
            
              <div>
                <h2>Información adicional del usuario:</h2>
                <p>Nombre:</p>
                <p>Fecha de nacimiento: </p>
                <p>Estado: activo</p>  <p>Estado: desactivado</p>
                <button >
                   Desactivar
                </button>
                <p>Administrador: activo</p>  <p>Administrador: desactivado</p>
                <button >
                 DesactivarActivar
                </button>
              </div>
          </div>
        </div>
    )
}

export default Admin