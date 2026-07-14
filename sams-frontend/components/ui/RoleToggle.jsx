"use client";

/**
 * RoleToggle
 * Segmented control used on both the login and register pages
 * to let the person declare whether they're continuing as a
 * Student or a Lecturer. Admin is intentionally not an option —
 * admin accounts are provisioned directly, not self-registered.
 *
 * Props:
 *  - value: "student" | "lecturer"
 *  - onChange: (nextRole: string) => void
 *  - options: optional override, defaults to Student / Lecturer
 */
export default function RoleToggle({ value, onChange, options }) {
    const roles = options || [
        { id: "student", label: "Student" },
        { id: "lecturer", label: "Lecturer" },
    ];

    return (
        <div className="role-toggle" role="tablist" aria-label="Select account type">
            {roles.map((r) => (
                <button
                    key={r.id}
                    type="button"
                    role="tab"
                    aria-selected={value === r.id}
                    className={`role-btn ${value === r.id ? "active" : ""}`}
                    onClick={() => onChange(r.id)}
                >
                    {r.label}
                </button>
            ))}
        </div>
    );
}