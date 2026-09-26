"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters and Search
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [departments, setDepartments] = useState([]);

  // Create User Modal State
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
    fullName: "",
    department: "",
    regNumber: "",
    batch: "",
    employeeId: ""
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.data.users);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.reg_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.employee_id?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const matchesDept = deptFilter === "all" || u.department === deptFilter;
      
      return matchesSearch && matchesRole && matchesDept;
    });
  }, [users, searchTerm, roleFilter, deptFilter]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setSubmitting(true);

    try {
      const token = localStorage.getItem("sams_token");
      // Call the existing auth register endpoint
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("User created successfully!");
        setFormData({
          email: "", password: "", role: "student", fullName: "", department: "", regNumber: "", batch: "", employeeId: ""
        });
        fetchUsers(); // Refresh list
        setTimeout(() => {
          setShowModal(false);
          setSuccessMsg("");
        }, 1500);
      } else {
        setErrorMsg(data.message || "Failed to create user");
      }
    } catch (err) {
      setErrorMsg("Network error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (u) => {
    setEditingUser({ ...u, full_name: u.full_name || "", department: u.department || "", reg_number: u.reg_number || "", batch: u.batch || "", employee_id: u.employee_id || "" });
    setErrorMsg("");
    setSuccessMsg("");
    setShowEditModal(true);
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSubmitting(true);
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch(`http://localhost:5000/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ full_name: editingUser.full_name, department: editingUser.department, reg_number: editingUser.reg_number, batch: editingUser.batch, employee_id: editingUser.employee_id })
      });
      const data = await res.json();
      if (res.ok) { setSuccessMsg("User updated!"); fetchUsers(); setTimeout(() => { setShowEditModal(false); setSuccessMsg(""); }, 1200); }
      else { setErrorMsg(data.message || "Failed to update user"); }
    } catch { setErrorMsg("Network error"); }
    finally { setSubmitting(false); }
  };

  const handleDeleteUser = async (id) => {
    if (deleteConfirm !== id) { setDeleteConfirm(id); return; }
    try {
      const token = localStorage.getItem("sams_token");
      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${token}` } });
      if (res.ok) { fetchUsers(); }
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
              User Registry
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", marginTop: "16px", margin: "16px 0 0 0" }}>
              Manage students, lecturers, and administrators
            </p>
          </div>
          <div>
            <button className="btn-gold" onClick={() => setShowModal(true)}>
              + Add New User
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px" }}>
        
        {/* Filters & Search */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "32px", flexWrap: "wrap" }}>
          <div className="input-group" style={{ flex: "1 1 300px", margin: 0 }}>
            <input 
              type="text" 
              className="auth-input" 
              placeholder="Search by name, email, or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ backgroundColor: "var(--white)" }}
            />
          </div>
          <div className="input-group" style={{ flex: "0 0 200px", margin: 0 }}>
            <select 
              className="auth-input" 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ backgroundColor: "var(--white)" }}
            >
              <option value="all">All Roles</option>
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="input-group" style={{ flex: "0 0 200px", margin: 0 }}>
            <select 
              className="auth-input" 
              value={deptFilter} 
              onChange={(e) => setDeptFilter(e.target.value)}
              style={{ backgroundColor: "var(--white)" }}
            >
              <option value="all">All Departments</option>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px", color: "var(--ink-muted)" }}>Loading users...</div>
        ) : (
          <div style={{ backgroundColor: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>User</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Role</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Department</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>ID Number</th>
                  <th style={{ padding: "20px 24px", textAlign: "left", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, color: "var(--ink-muted)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ padding: "48px", textAlign: "center", color: "var(--ink-muted)" }}>No users found matching the criteria.</td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} style={{ borderBottom: "1px solid var(--border)", transition: "background-color 0.2s" }} onMouseOver={e => e.currentTarget.style.backgroundColor = "var(--cream)"} onMouseOut={e => e.currentTarget.style.backgroundColor = "transparent"}>
                      <td style={{ padding: "20px 24px" }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "var(--ink)" }}>{u.full_name}</div>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "10px", color: "var(--ink-muted)", marginTop: "4px" }}>{u.email}</div>
                      </td>
                      <td style={{ padding: "20px 24px" }}>
                        <span style={{ 
                          backgroundColor: u.role === 'admin' ? "rgba(231, 76, 60, 0.1)" : u.role === 'lecturer' ? "rgba(241, 196, 15, 0.1)" : "rgba(46, 204, 113, 0.1)", 
                          color: u.role === 'admin' ? "#e74c3c" : u.role === 'lecturer' ? "var(--gold-dark)" : "#27ae60", 
                          padding: "4px 8px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase"
                        }}>
                          {u.role}
                        </span>
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {u.department || '—'}
                      </td>
                      <td style={{ padding: "20px 24px", fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "var(--ink-light)" }}>
                        {u.role === 'student' ? u.reg_number : u.role === 'lecturer' ? u.employee_id : '—'}
                      </td>
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <button
                            onClick={() => handleOpenEdit(u)}
                            title="Edit user"
                            style={{ background: "none", border: "1px solid var(--border)", padding: "6px 12px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, cursor: "pointer", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.2s" }}
                            onMouseOver={e => { e.currentTarget.style.backgroundColor = "var(--ink)"; e.currentTarget.style.color = "var(--white)"; e.currentTarget.style.borderColor = "var(--ink)"; }}
                            onMouseOut={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                          >Edit</button>
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            title={deleteConfirm === u.id ? "Click again to confirm" : "Delete user"}
                            style={{ background: "none", border: `1px solid ${deleteConfirm === u.id ? "#e74c3c" : "var(--border)"}`, padding: "6px 12px", borderRadius: "4px", fontFamily: "'Montserrat', sans-serif", fontSize: "10px", fontWeight: 600, cursor: "pointer", color: deleteConfirm === u.id ? "#e74c3c" : "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.1em", transition: "all 0.2s" }}
                            onMouseOver={e => { e.currentTarget.style.backgroundColor = "rgba(231,76,60,0.1)"; e.currentTarget.style.color = "#e74c3c"; e.currentTarget.style.borderColor = "#e74c3c"; }}
                            onMouseOut={e => { if (deleteConfirm !== u.id) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--ink-muted)"; e.currentTarget.style.borderColor = "var(--border)"; } }}
                          >{deleteConfirm === u.id ? "Confirm" : "Delete"}</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Add User Modal */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ backgroundColor: "var(--cream)", padding: "40px", borderRadius: "var(--radius)", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ink)", margin: 0 }}>Add New User</h2>
              <button onClick={() => setShowModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "var(--ink-muted)" }}>×</button>
            </div>
            
            {errorMsg && <div style={{ backgroundColor: "rgba(231, 76, 60, 0.1)", color: "#c0392b", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(231, 76, 60, 0.2)" }}>{errorMsg}</div>}
            {successMsg && <div style={{ backgroundColor: "rgba(46, 204, 113, 0.1)", color: "#27ae60", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(46, 204, 113, 0.2)" }}>{successMsg}</div>}
            
            <form onSubmit={handleCreateUser} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              <div className="input-group">
                <label className="input-label">ROLE</label>
                <select className="auth-input" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="student">Student</option>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">FULL NAME</label>
                  <input type="text" className="auth-input" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                </div>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">EMAIL ADDRESS</label>
                  <input type="email" className="auth-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">PASSWORD</label>
                  <input type="password" className="auth-input" required minLength={6} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
                {formData.role !== 'admin' && (
                  <div className="input-group" style={{ margin: 0 }}>
                    <label className="input-label">DEPARTMENT</label>
                    <select className="auth-input" required value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} style={{ appearance: "none" }}>
                      <option value="" disabled>Select Department</option>
                      {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>
                )}
              </div>

              {formData.role === 'student' && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="input-group" style={{ margin: 0 }}>
                    <label className="input-label">REGISTRATION NUMBER</label>
                    <input type="text" className="auth-input" required={formData.role === 'student'} value={formData.regNumber} onChange={e => setFormData({...formData, regNumber: e.target.value})} />
                  </div>
                  <div className="input-group" style={{ margin: 0 }}>
                    <label className="input-label">BATCH</label>
                    <input type="text" className="auth-input" required={formData.role === 'student'} value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} />
                  </div>
                </div>
              )}

              {formData.role === 'lecturer' && (
                <div className="input-group">
                  <label className="input-label">EMPLOYEE ID</label>
                  <input type="text" className="auth-input" required={formData.role === 'lecturer'} value={formData.employeeId} onChange={e => setFormData({...formData, employeeId: e.target.value})} />
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button type="button" className="btn-outline-ink" onClick={() => setShowModal(false)} disabled={submitting}>Cancel</button>
                <button type="submit" className="btn-gold" disabled={submitting}>{submitting ? "Creating..." : "Create User"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ backgroundColor: "var(--cream)", padding: "40px", borderRadius: "var(--radius)", width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--ink)", margin: 0 }}>Edit User</h2>
              <button onClick={() => setShowEditModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "var(--ink-muted)" }}>×</button>
            </div>
            {errorMsg && <div style={{ backgroundColor: "rgba(231,76,60,0.1)", color: "#c0392b", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(231,76,60,0.2)" }}>{errorMsg}</div>}
            {successMsg && <div style={{ backgroundColor: "rgba(46,204,113,0.1)", color: "#27ae60", padding: "16px", borderRadius: "var(--radius)", marginBottom: "24px", fontSize: "14px", border: "1px solid rgba(46,204,113,0.2)" }}>{successMsg}</div>}
            <form onSubmit={handleEditUser} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">FULL NAME</label>
                <input type="text" className="auth-input" required value={editingUser.full_name} onChange={e => setEditingUser({ ...editingUser, full_name: e.target.value })} />
              </div>
              {editingUser.role !== 'admin' && (
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">DEPARTMENT</label>
                  <select className="auth-input" value={editingUser.department} onChange={e => setEditingUser({ ...editingUser, department: e.target.value })} style={{ appearance: "none" }}>
                    <option value="">Select Department</option>
                    {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                  </select>
                </div>
              )}
              {editingUser.role === 'student' && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div className="input-group" style={{ margin: 0 }}><label className="input-label">REG NUMBER</label><input type="text" className="auth-input" value={editingUser.reg_number} onChange={e => setEditingUser({ ...editingUser, reg_number: e.target.value })} /></div>
                  <div className="input-group" style={{ margin: 0 }}><label className="input-label">BATCH</label><input type="text" className="auth-input" value={editingUser.batch} onChange={e => setEditingUser({ ...editingUser, batch: e.target.value })} /></div>
                </div>
              )}
              {editingUser.role === 'lecturer' && (
                <div className="input-group" style={{ margin: 0 }}><label className="input-label">EMPLOYEE ID</label><input type="text" className="auth-input" value={editingUser.employee_id} onChange={e => setEditingUser({ ...editingUser, employee_id: e.target.value })} /></div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "12px" }}>
                <button type="button" className="btn-outline-ink" onClick={() => setShowEditModal(false)} disabled={submitting}>Cancel</button>
                <button type="submit" className="btn-gold" disabled={submitting}>{submitting ? "Saving..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
