import { Link } from "react-router-dom";
import "../theme.css";
 
function Inicio() {
  return (
    <div>
      {/* HEROO */}
      <div className="pp-gradient-bg text-white text-center py-5 px-3">
        <div className="container py-5">
          <span className="badge bg-white text-primary bg-opacity-75 mb-3 px-3 py-2 rounded-pill fw-semibold">
            <i className="bi bi-shield-check me-1"></i> Plataforma de gestión financiera
          </span>
          <h1
            className="display-3 fw-bold mb-3"
            style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.02em" }}
          >
            PROYECTO PEOPLE
          </h1>
          <p className="fs-4 mb-0" style={{ opacity: 0.92 }}>
            Gestión de créditos fácil y rápida
          </p>
          <p className="mx-auto mt-2" style={{ maxWidth: "560px", opacity: 0.8 }}>
            Registra, consulta y controla los créditos de tus clientes en un solo lugar,
            con la seguridad y agilidad que tu operación necesita.
          </p>
        </div>
      </div>
 
      {/* CARDS DE NAVEGACIÓN */}
      <div className="container" style={{ marginTop: "-3.5rem" }}>
        <div className="row g-4 pb-5">
          <div className="col-md-6">
            <div className="pp-card pp-card-hover h-100 p-4 text-center">
              <div
                className="pp-icon-circle"
                style={{ background: "var(--pp-blue-100)", color: "var(--pp-blue-700)" }}
              >
                <i className="bi bi-file-earmark-plus"></i>
              </div>
              <h4 className="pp-heading">Registrar crédito</h4>
              <p className="text-muted mb-4">
                Ingresa los datos del cliente y las condiciones del crédito en un
                formulario simple y guiado.
              </p>
              <Link to="/registro" className="btn pp-btn-primary px-4">
                <i className="bi bi-plus-circle me-2"></i>
                Nuevo registro
              </Link>
            </div>
          </div>
 
          <div className="col-md-6">
            <div className="pp-card pp-card-hover h-100 p-4 text-center">
              <div
                className="pp-icon-circle"
                style={{ background: "var(--pp-green-100)", color: "var(--pp-green-700)" }}
              >
                <i className="bi bi-search"></i>
              </div>
              <h4 className="pp-heading">Consultar créditos</h4>
              <p className="text-muted mb-4">
                Visualiza, filtra y ordena todos los créditos registrados de forma
                clara y profesional.
              </p>
              <Link to="/consulta" className="btn pp-btn-success px-4">
                <i className="bi bi-table me-2"></i>
                Ver créditos
              </Link>
            </div>
          </div>
        </div>
 
        {/* FRANJA DE CONFIANZA */}
        <div className="row text-center g-4 pb-5">
          <div className="col-4">
            <i className="bi bi-lightning-charge fs-3 text-primary"></i>
            <p className="small text-muted mb-0 mt-2">Procesos rápidos</p>
          </div>
          <div className="col-4">
            <i className="bi bi-shield-lock fs-3" style={{ color: "var(--pp-green-700)" }}></i>
            <p className="small text-muted mb-0 mt-2">Datos seguros</p>
          </div>
          <div className="col-4">
            <i className="bi bi-graph-up-arrow fs-3 text-primary"></i>
            <p className="small text-muted mb-0 mt-2">Control total</p>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default Inicio;
