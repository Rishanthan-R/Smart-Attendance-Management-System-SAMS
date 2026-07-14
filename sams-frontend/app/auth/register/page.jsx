"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthShell from "../../../components/layout/AuthShell";
import RoleToggle from "../../../components/ui/RoleToggle";

const DEPARTMENTS = [
    { value: "cs", label: "Computer Science" },
    { value: "se", label: "Software Engineering" },
    { value: "is", label: "Information Systems" },
];

const STUDENT_DEFAULTS = { fullName: "", regNumber: "", email: "", department: "", password: "", confirmPassword: "" };
const LECTURER_DEFAULTS = { fullName: "", staffId: "", email: "", department: "", password: "", confirmPassword: "" };

export default function RegisterPage() {
    const router = useRouter();
    const [role, setRole] = useState("student");
    const [form, setForm] = useState(STUDENT_DEFAULTS);
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRoleChange = (nextRole) => {
        setRole(nextRole);
        setForm(nextRole === "lecturer" ? LECTURER_DEFAULTS : STUDENT_DEFAULTS);
        setError("");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords don't match. Please check and try again.");
            return;
        }
        if (!agreed) {
            setError("Please accept the terms of use to continue.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role, ...form }),
            });
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "We couldn't create your account. Please try again.");
                return;
            }

            router.push("/auth/login");
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthShell
            eyebrow="Join SAMS"
            heading={
                <>
                    Create your<br /><em>account.</em>
                </>
            }
            body="Register as a student or a lecturer to start using GPS-verified, OTP-secured attendance."
        >
            <div className="section-label">Account Creation</div>
            <h2 className="auth-heading">Create an account</h2>
            <p className="auth-subtext">
                Registration is open to students and lecturers of the Faculty of Computing. Admin accounts are issued separately.
            </p>

            <div className="form-group">
                <span className="form-label">Register as</span>
                <RoleToggle value={role} onChange={handleRoleChange} />
            </div>

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="fullName">Full Name</label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            placeholder="e.g. Nimal Perera"
                            className="form-input"
                            value={form.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor={role === "lecturer" ? "staffId" : "regNumber"}>
                            {role === "lecturer" ? "Staff ID" : "Registration Number"}
                        </label>
                        <input
                            id={role === "lecturer" ? "staffId" : "regNumber"}
                            name={role === "lecturer" ? "staffId" : "regNumber"}
                            type="text"
                            placeholder={role === "lecturer" ? "e.g. FOC/L/0042" : "e.g. FC111234"}
                            className="form-input"
                            value={role === "lecturer" ? form.staffId : form.regNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">
                        {role === "lecturer" ? "Staff Email" : "University Email"}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder={role === "lecturer" ? "e.g. j.perera@sjp.ac.lk" : "e.g. fc111234@sjp.ac.lk"}
                        className="form-input"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="department">Department</label>
                    <select
                        id="department"
                        name="department"
                        className="form-input form-select"
                        value={form.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select your department</option>
                        {DEPARTMENTS.map((d) => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                        ))}
                    </select>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Create a password"
                            className="form-input"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            className="form-input"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength={8}
                        />
                    </div>
                </div>

                <label className="form-check">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    />
                    <span>
                        I agree to the <Link href="/terms">Terms of Use</Link> and <Link href="/privacy">Privacy Policy</Link>.
                    </span>
                </label>

                {error && <div className="form-error" role="alert">{error}</div>}

                <button type="submit" className="btn-ink auth-submit-btn" disabled={loading}>
                    {loading ? "Creating Account…" : `Create ${role === "lecturer" ? "Lecturer" : "Student"} Account`}
                </button>
            </form>

            <p className="auth-switch">
                Already have an account? <Link href="/auth/login">Sign in</Link>
            </p>
        </AuthShell>
    );
}