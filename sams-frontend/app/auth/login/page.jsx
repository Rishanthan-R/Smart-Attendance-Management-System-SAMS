"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "../../../components/layout/AuthShell";
import RoleToggle from "../../../components/ui/RoleToggle";

function IconEye({ open }) {
    return open ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 7 11 7a20.4 20.4 0 0 1-2.16 3.19" />
            <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    );
}

export default function LoginPage() {
    const router = useRouter();
    const [role, setRole] = useState("student"); // UI intent only — the backend is the source of truth
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ identifier: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, roleHint: role }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "We couldn't sign you in with those details.");
                return;
            }

            // The backend returns the verified role — always trust this over roleHint.
            const destination =
                data.role === "lecturer" ? "/dashboard/lecturer" : "/dashboard/student";
            router.push(destination);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            eyebrow="Welcome back"
            heading={
                <>
                    Sign in to<br /><em>continue.</em>
                </>
            }
            body="Access live sessions, attendance history, and eligibility status the moment you sign in."
        >
            <div className="section-label">Account Access</div>
            <h2 className="auth-heading">Sign in to SAMS</h2>
            <p className="auth-subtext">
                Choose your account type, then enter your university credentials.
            </p>

            <div className="form-group">
                <span className="form-label">I am signing in as</span>
                <RoleToggle value={role} onChange={setRole} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label className="form-label" htmlFor="identifier">
                        {role === "lecturer" ? "Staff Email" : "University Email"}
                    </label>
                    <input
                        id="identifier"
                        name="identifier"
                        type="text"
                        autoComplete="username"
                        placeholder={role === "lecturer" ? "e.g. j.perera@sjp.ac.lk" : "e.g. sc21123@sjp.ac.lk"}
                        className="form-input"
                        value={form.identifier}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <label className="form-label" htmlFor="password">Password</label>
                        <Link href="/forgot-password" className="auth-inline-link">Forgot password?</Link>
                    </div>
                    <div className="input-wrap">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            className="form-input"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="input-icon-btn"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <IconEye open={showPassword} />
                        </button>
                    </div>
                </div>

                {error && <div className="form-error" role="alert">{error}</div>}

                <button type="submit" className="btn-ink auth-submit-btn" disabled={loading}>
                    {loading ? "Signing In…" : "Sign In"}
                </button>
            </form>

            <p className="auth-switch">
                Don't have an account? <Link href="/auth/register">Create one</Link>
            </p>
        </AuthShell>
    );
}