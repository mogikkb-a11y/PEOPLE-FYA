import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../theme.css";
 
const COLUMNS = [
  { key: "nombre_cliente", label: "Cliente", icon: "bi-person" },
  { key: "cedula", label: "Cédula", icon: "bi-credit-card-2-front" },
  { key: "valor", label: "Valor", icon: "bi-cash-coin" },
  { key: "tasa_interes", label: "Tasa interés", icon: "bi-percent" },
  { key: "plazo_meses", label: "Plazo (meses)", icon: "bi-calendar-range" },
  { key: "comercial", label: "Comercial", icon: "bi-person-badge" },
  { key: "fecha_registro", label: "Fecha registro", icon: "bi-clock-history" },
];
 
const PAGE_SIZE = 10;
 
function ConsultaCreditos() {
  const [creditos, setCreditos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
 
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState(""); // ej: "valor" o "-valor"
  const [pagina, setPagina] = useState(1);
 
  const fetchCreditos = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      // Lógica de conexión intacta: GET con filtros (?search=) y ordenamiento (?ordering=)
      const params = {};
      if (search) params.search = search;
      if (ordering) params.ordering = ordering;
 
      const response = await api.get("creditos/", { params });
 
      // Soporta tanto respuesta paginada de DRF ({results: []}) como array plano
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];
 
      setCreditos(data);
      setPagina(1);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar los créditos. Intenta nuevamente.");
    } finally {
      setCargando(false);
    }
  }, [search, ordering]);
 
  useEffect(() => {
    fetchCreditos();
  }, [fetchCreditos]);
 
  const handleOrdenar = (campo) => {
    if (ordering === campo) {
      setOrdering(`-${campo}`);
    } else if (ordering === `-${campo}`) {
      setOrdering("");
    } else {
      setOrdering(campo);
    }
  };
 
  const iconoOrden = (campo) => {
    if (ordering === campo) return "bi-sort-up";
    if (ordering === `-${campo}`) return "bi-sort-down";
    return "bi-arrow-down-up";
  };
 
  const formatMoneda = (valor) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      valor
    );
 
  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    const d = new Date(fecha);
    return d.toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "2-digit" });
  };
 
  // Paginación (client-side, sobre el resultado ya filtrado/ordenado del backend)
  const totalPaginas = Math.max(1, Math.ceil(creditos.length / PAGE_SIZE));
  const creditosPagina = creditos.slice((pagina - 1) * PAGE_SIZE, pagina * PAGE_SIZE);
 
  return (
    <div className="container py-5">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="pp-heading mb-1">
            <i className="bi bi-table me-2"></i>
            Créditos registrados
          </h2>
          <p className="text-muted mb-0">
            Consulta, filtra y ordena los créditos registrados en el sistema.
          </p>
        </div>
        <Link to="/" className="btn pp-btn-outline">
          <i className="bi bi-arrow-left me-2"></i>
          Volver al inicio
        </Link>
      </div>
 
      {/* Barra de búsqueda */}
      <div className="row mb-4 g-3 align-items-center">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="bi bi-search text-primary"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Buscar por cliente, cédula, comercial..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="btn btn-outline-secondary" onClick={() => setSearch("")}>
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <span className="badge rounded-pill" style={{ background: "var(--pp-blue-100)", color: "var(--pp-blue-700)" }}>
            <i className="bi bi-collection me-1"></i>
            {creditos.length} crédito{creditos.length !== 1 ? "s" : ""} encontrados
          </span>
        </div>
      </div>
 
      {error && (
        <div className="alert alert-danger d-flex align-items-center">
          <i className="bi bi-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}
 
      {/* Tabla */}
      <div className="pp-table-wrap bg-white">
        <div className="table-responsive">
          <table className="table pp-table mb-0 align-middle">
            <thead>
              <tr>
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    className={ordering.replace("-", "") === col.key ? "active-sort" : ""}
                  >
                    <i className={`bi ${col.icon} me-1`}></i>
                    {col.label}
                    <button
                      className="sort-btn"
                      onClick={() => handleOrdenar(col.key)}
                      title={`Ordenar por ${col.label}`}
                    >
                      <i className={`bi ${iconoOrden(col.key)}`}></i>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="text-muted mt-2 mb-0">Cargando créditos...</p>
                  </td>
                </tr>
              ) : creditosPagina.length === 0 ? (
                <tr>
                  <td colSpan={COLUMNS.length} className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                    No se encontraron créditos con los criterios actuales.
                  </td>
                </tr>
              ) : (
                creditosPagina.map((credito) => (
                  <tr key={credito.id}>
                    <td className="fw-semibold">{credito.nombre_cliente}</td>
                    <td>{credito.cedula}</td>
                    <td className="pp-value-cell">{formatMoneda(credito.valor)}</td>
                    <td>
                      <span className="pp-badge-rate">{credito.tasa_interes}%</span>
                    </td>
                    <td>{credito.plazo_meses} meses</td>
                    <td>{credito.comercial}</td>
                    <td className="text-muted">{formatFecha(credito.fecha_registro)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
 
      {/* Paginación */}
      {!cargando && creditos.length > PAGE_SIZE && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${pagina === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPagina((p) => Math.max(1, p - 1))}>
                <i className="bi bi-chevron-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
              <li key={num} className={`page-item ${pagina === num ? "active" : ""}`}>
                <button className="page-link" onClick={() => setPagina(num)}>
                  {num}
                </button>
              </li>
            ))}
            <li className={`page-item ${pagina === totalPaginas ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
export default ConsultaCreditos;