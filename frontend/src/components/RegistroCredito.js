import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../theme.css";

 
function RegistroCredito() {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    nombre_cliente: "",
    cedula: "",
    valor: "",
    tasa_interes: "",
    plazo_meses: "",
    comercial: "",
  });
 
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null); // { tipo: 'success' | 'danger', texto: '' }
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

      // Validaciones antes de enviar
    if (formData.valor <= 0) {
      setMensaje({ tipo: "danger", texto: "El valor debe ser mayor a 0." });
      return;
    }
    if (formData.tasa_interes < 0 || formData.tasa_interes > 100) {
      setMensaje({ tipo: "danger", texto: "La tasa debe estar entre 0 y 100." });
      return;
    }
    if (formData.plazo_meses <= 0) {
      setMensaje({ tipo: "danger", texto: "El plazo debe ser mayor a 0 meses." });
      return;
    }

    setEnviando(true);
    setMensaje(null);
    
    try {
      // Lógica de conexión intacta: POST a /api/creditos/
      await api.post("creditos/", formData);
 
      setMensaje({ tipo: "success", texto: "Crédito registrado exitosamente." });
      setFormData({
        nombre_cliente: "",
        cedula: "",
        valor: "",
        tasa_interes: "",
        plazo_meses: "",
        comercial: "",
      });
    } catch (error) {
      console.error(error);
      setMensaje({
        tipo: "danger",
        texto: "Ocurrió un error al registrar el crédito. Verifica los datos e intenta de nuevo.",
      });
    } finally {
      setEnviando(false);
    }
  };
 
  return (
    <div className="container py-5" style={{ maxWidth: "720px" }}>
      <div className="pp-form-card">
        {/* Encabezado */}
        <div className="pp-form-header text-center">
          <i className="bi bi-file-earmark-plus fs-1 mb-2 d-block"></i>
          <h3 className="mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
            Registrar nuevo crédito
          </h3>
          <p className="mb-0" style={{ opacity: 0.85 }}>
            Completa la información del cliente y las condiciones del crédito
          </p>
        </div>
 
        {/* Formulario */}
        <div className="bg-white p-4 p-md-5">
          {mensaje && (
            <div className={`alert alert-${mensaje.tipo} d-flex align-items-center`} role="alert">
              <i
                className={`bi ${
                  mensaje.tipo === "success" ? "bi-check-circle" : "bi-exclamation-triangle"
                } me-2`}
              ></i>
              {mensaje.texto}
            </div>
          )}
 
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold text-secondary small text-uppercase">
                  Nombre del cliente
                </label>
                <div className="input-group pp-form-control-wrap">
                  <span className="input-group-text pp-input-group-text">
                    <i className="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control pp-input"
                    name="nombre_cliente"
                    value={formData.nombre_cliente}
                    onChange={handleChange}
                    placeholder="Ej. Ana María Torres"
                    required
                  />
                </div>
              </div>
 
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small text-uppercase">
                  Cédula
                </label>
                <div className="input-group pp-form-control-wrap">
                  <span className="input-group-text pp-input-group-text">
                    <i className="bi bi-credit-card-2-front"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control pp-input"
                    name="cedula"
                    value={formData.cedula}
                    onChange={handleChange}
                    placeholder="Ej. 1020304050"
                    required
                  />
                </div>
              </div>
 
              <div className="col-md-6">
                <label className="form-label fw-semibold text-secondary small text-uppercase">
                  Comercial
                </label>
                <div className="input-group pp-form-control-wrap">
                  <span className="input-group-text pp-input-group-text">
                    <i className="bi bi-person-badge"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control pp-input"
                    name="comercial"
                    value={formData.comercial}
                    onChange={handleChange}
                    placeholder="Ej. Carlos Pérez"
                    required
                  />
                </div>
              </div>
 
              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small text-uppercase">
                  Valor del crédito
                </label>
                <div className="input-group pp-form-control-wrap">
                  <span className="input-group-text pp-input-group-text">
                    <i className="bi bi-cash-coin"></i>
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control pp-input"
                    name="valor"
                    value={formData.valor}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
 
              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small text-uppercase">
                  Tasa de interés (%)
                </label>
                <div className="input-group pp-form-control-wrap">
                  <span className="input-group-text pp-input-group-text">
                    <i className="bi bi-percent"></i>
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control pp-input"
                    name="tasa_interes"
                    value={formData.tasa_interes}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
 
              <div className="col-md-4">
                <label className="form-label fw-semibold text-secondary small text-uppercase">
                  Plazo (meses)
                </label>
                <div className="input-group pp-form-control-wrap">
                  <span className="input-group-text pp-input-group-text">
                    <i className="bi bi-calendar-range"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control pp-input"
                    name="plazo_meses"
                    value={formData.plazo_meses}
                    onChange={handleChange}
                    placeholder="Ej. 12"
                    required
                  />
                </div>
              </div>
            </div>
 
            <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
              <button
                type="submit"
                className="btn pp-btn-primary flex-fill py-3 fs-5"
                disabled={enviando}
              >
                {enviando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Registrando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Registrar crédito
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn pp-btn-outline py-3"
                onClick={() => navigate("/")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Volver
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default RegistroCredito;