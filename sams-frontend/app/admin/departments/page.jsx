"use client";
import { useState, useEffect } from "react";

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    status: "active"
  });

  const fetchDepartments = async () => {
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch("http://localhost:5000/api/admin/departments", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setDepartments(data.data.departments || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const token = localStorage.getItem("sams_token");
        const res = await fetch("http://localhost:5000/api/admin/departments", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (!ignore) setDepartments(data.data.departments || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, []);

  const filteredDepartments = departments.filter(d =>
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ name: "", code: "", status: "active" });
    setErrorMsg("");
    setSuccessMsg("");
    setShowModal(true);
  };

  const handleOpenEdit = (dept) => {
    setEditingId(dept.id);
    setFormData({
      name: dept.name || "",
      code: dept.code || "",
      status: dept.status || "active"
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
        ? `http://localhost:5000/api/admin/departments/${editingId}`
        : `http://localhost:5000/api/admin/departments`;

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
        setSuccessMsg(`Department ${editingId ? 'updated' : 'created'} successfully!`);
        fetchDepartments();
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg("");
        }, 1500);
      } else {
        setErrorMsg(data.message || "Failed to save department");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDepartment = async (id) => {
    if (deleteConfirm !== id) { setDeleteConfirm(id); return; }
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch(`http://localhost:5000/api/admin/departments/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      if (res.ok) { fetchDepartments(); }
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
              Department Registry
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "16px", margin: "16px 0 0 0" }}>
              Manage faculty departments and status
            </p>
          </div>
          <div>
            <button className="btn-gold" onClick={handleOpenCreate}>
              + Add New Department
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
              placeholder="Search by department name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: "var(--white)" }}
            />
          </div>
        </div>

        {/* Departments Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: "var(--ink-muted)" }}>Loading departments...</div>
        ) : (
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Department Info</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Status</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Created Date</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepartments.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: "48px", textAlign: "center", color: "var(--ink-muted)" }}>No departments found.</td>
                  </tr>
                ) : (
                  filteredDepartments.map((d) => (
                    <tr key={d.id} style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "var(--cream)"} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                      <td style={{ padding: "20px 24px" }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>{d.name}</div>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)", marginTop: "4px" }}>CODE: {d.code}</div>
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <span style={{
                          backgroundColor: d.status === 'active' ? "rgba(46, 204, 113, 0.1)" : "rgba(231, 76, 60, 0.1)",
                          color: d.status === 'active' ? "#27ae60" : "#e74c3c",
                          padding: "4px 8px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase"
                        }}>
                          {d.status}
                        </span>
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {new Date(d.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <button
                          onClick={() => handleOpenEdit(d)}
                          style={{ background: "none", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, cursor: "pointer", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}
                          onMouseOver={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                          onMouseOut={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(d.id)}
                          style={{ background: "none", border: `1px solid ${deleteConfirm === d.id ? "#e74c3c" : "var(--border)"}`, padding: "6px 12px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, cursor: "pointer", color: deleteConfirm === d.id ? "#e74c3c" : "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginLeft: "8px" }}
                          onMouseOver={e => { e.currentTarget.style.backgroundColor = "rgba(231,76,60,0.1)"; e.currentTarget.style.color = "#e74c3c"; e.currentTarget.style.borderColor = "#e74c3c"; }}
                          onMouseOut={e => { if (deleteConfirm !== d.id) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.borderColor = "var(--border)"; } }}
                        >{deleteConfirm === d.id ? "Confirm?" : "Delete"}</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Department Modal */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ backgroundColor: "var(--cream)", padding: "40px", borderRadius: "var(--radius)", width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ink)", margin: 0 }}>
                {editingId ? "Edit Department" : "Add New Department"}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "var(--ink-muted)" }}>×</button>
            </div>

            {errorMsg && <div style={{ backgroundColor: "rgba(231, 76, 60, 0.1)", color: "#c0392b", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(231, 76, 60, 0.2)" }}>{errorMsg}</div>}
            {successMsg && <div style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(46, 204, 113, 0.2)" }}>{successMsg}</div>}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">DEPARTMENT NAME</label>
                <input type="text" className="auth-input" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Faculty of Computing" />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">DEPARTMENT CODE</label>
                  <input type="text" className="auth-input" required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} placeholder="e.g. FOC" />
                </div>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">STATUS</label>
                  <select className="auth-input" required value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button type="button" className="btn-outline-ink" onClick={() => setShowModal(false)} disabled={submitting}>Cancel</button>
                <button type="submit" className="btn-gold" disabled={submitting}>{submitting ? "Saving..." : (editingId ? "Save Changes" : "Create Department")}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
