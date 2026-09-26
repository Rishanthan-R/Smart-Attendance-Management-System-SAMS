"use client";
import { useState, useEffect } from "react";

export default function AdminmodulesPage() {
  const [modules, setmodules] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search/Filter
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    department: "",
    batch: "",
    lecturer_id: ""
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("sams_token");
      
      // Fetch modules
      const subRes = await fetch("http://localhost:5000/api/admin/modules", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (subRes.ok) {
        const subData = await subRes.json();
        setmodules(subData.data.modules || []);
      }

      // Fetch users to filter lecturers
      const userRes = await fetch("http://localhost:5000/api/admin/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (userRes.ok) {
        const userData = await userRes.json();
        const lecs = userData.data.users.filter(u => u.role === "lecturer");
        setLecturers(lecs);
      }

      // Fetch departments
      const deptRes = await fetch("http://localhost:5000/api/admin/departments", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (deptRes.ok) {
        const deptData = await deptRes.json();
        setDepartments(deptData.data.departments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredmodules = modules.filter(s => {
    return s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (s.department && s.department.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ name: "", code: "", department: "", batch: "", lecturer_id: "" });
    setErrorMsg("");
    setSuccessMsg("");
    setShowModal(true);
  };

  const handleOpenEdit = (module) => {
    setEditingId(module.id);
    setFormData({
      name: module.name || "",
      code: module.code || "",
      department: module.department || "",
      batch: module.batch || "",
      lecturer_id: module.lecturer_id || ""
    });
    setErrorMsg("");
    setSuccessMsg("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("sams_token");
      const url = editingId 
        ? `http://localhost:5000/api/admin/modules/${editingId}`
        : `http://localhost:5000/api/admin/modules`;
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(`module ${editingId ? 'updated' : 'created'} successfully!`);
        fetchData();
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg("");
        }, 1500);
      } else {
        setErrorMsg(data.message || "Failed to save module");
      }
    } catch (err) {
      setErrorMsg("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteModule = async (id) => {
    if (deleteConfirm !== id) { setDeleteConfirm(id); return; }
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch(`http://localhost:5000/api/admin/modules/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      if (res.ok) { fetchData(); }
    } catch (err) { console.error(err); }
    finally { setDeleteConfirm(null); }
  };

  return (
    <div style={{ width: "100%", paddingBottom: "64px", position: "relative" }}>
      {/* Page Header */}
      <div style={{ backgroundColor: "var(--cream-dark)", padding: "48px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "var(--ink)", margin: 0 }}>
              module Registry
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "16px", margin: "16px 0 0 0" }}>
              Manage academic modules and lecturer assignments
            </p>
          </div>
          <div>
            <button className="btn-gold" onClick={handleOpenCreate}>
              + Add New module
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        
        {/* Search */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
          <div className="input-group" style={{ flex: "1", margin: 0 }}>
            <input 
              type="text" 
              className="auth-input" 
              placeholder="Search by module name or code..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: "var(--white)" }}
            />
          </div>
        </div>

        {/* modules Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: "var(--ink-muted)" }}>Loading modules...</div>
        ) : (
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>module Info</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Department</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Assigned Lecturer</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredmodules.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: "48px", textAlign: "center", color: "var(--ink-muted)" }}>No modules found.</td>
                  </tr>
                ) : (
                  filteredmodules.map((s) => (
                    <tr key={s.id} style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "var(--cream)"} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                      <td style={{ padding: "20px 24px" }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>{s.name}</div>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)", marginTop: "4px" }}>{s.code} • Batch: {s.batch || 'N/A'}</div>
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {s.department || '—'}
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {s.profiles?.full_name || s.lecturer?.full_name || 'Unassigned'}
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <button 
                          onClick={() => handleOpenEdit(s)}
                          style={{ background: "none", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, cursor: "pointer", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}
                          onMouseOver={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                          onMouseOut={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteModule(s.id)}
                          style={{ background: "none", border: `1px solid ${deleteConfirm === s.id ? "#e74c3c" : "var(--border)"}`, padding: "6px 12px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, cursor: "pointer", color: deleteConfirm === s.id ? "#e74c3c" : "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "8px" }}
                          onMouseOver={e => { e.currentTarget.style.backgroundColor = "rgba(231,76,60,0.1)"; e.currentTarget.style.color = "#e74c3c"; e.currentTarget.style.borderColor = "#e74c3c"; }}
                          onMouseOut={e => { if (deleteConfirm !== s.id) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.borderColor = "var(--border)"; } }}
                        >{deleteConfirm === s.id ? "Confirm?" : "Delete"}</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* module Modal */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ backgroundColor: "var(--cream)", padding: "40px", borderRadius: "var(--radius)", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ink)", margin: 0 }}>
                {editingId ? "Edit module" : "Add New module"}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "var(--ink-muted)" }}>×</button>
            </div>
            
            {errorMsg && <div style={{ backgroundColor: "rgba(231, 76, 60, 0.1)", color: "#c0392b", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(231, 76, 60, 0.2)" }}>{errorMsg}</div>}
            {successMsg && <div style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(46, 204, 113, 0.2)" }}>{successMsg}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">module NAME</label>
                <input type="text" className="auth-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Data Structures" />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">module CODE</label>
                  <input type="text" className="auth-input" required value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder="e.g. CS101" />
                </div>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">BATCH</label>
                  <input type="text" className="auth-input" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} placeholder="e.g. 2021" />
                </div>
              </div>

              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">DEPARTMENT</label>
                <select className="auth-input" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} style={{ appearance: "none" }}>
                  <option value="" disabled>Select Department</option>
                  {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>

              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">ASSIGNED LECTURER</label>
                <select className="auth-input" required value={formData.lecturer_id} onChange={e => setFormData({...formData, lecturer_id: e.target.value})}>
                  <option value="" disabled>Select a Lecturer</option>
                  {lecturers.map(l => (
                    <option key={l.id} value={l.id}>{l.full_name} ({l.employee_id || 'No ID'})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button type="button" className="btn-outline-ink" onClick={() => setShowModal(false)} disabled={submitting}>Cancel</button>
                <button type="submit" className="btn-gold" disabled={submitting}>{submitting ? "Saving..." : (editingId ? "Save Changes" : "Create module")}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
