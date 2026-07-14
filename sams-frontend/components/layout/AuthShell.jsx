import Link from "next/link";

/**
 * AuthShell
 * Split-screen frame shared by /login and /register.
 * Left: branded panel carrying the campus image + the same
 *       serif/gold identity as the marketing site.
 * Right: the actual form, passed in as children.
 *
 * Props:
 *  - eyebrow: small label above the brand heading
 *  - heading: serif headline for the brand panel
 *  - body: supporting copy for the brand panel
 *  - children: the form markup for the right-hand panel
 */
export default function AuthShell({ eyebrow, heading, body, children }) {
    return (
        <div className="auth-shell">
            <div className="auth-brand">
                <div
                    className="auth-brand-bg"
                    style={{ backgroundImage: "url('/images/hero-usjhd.png')" }}
                />
                <div className="auth-brand-overlay" />

                <div className="auth-brand-top">
                    <Link href="/" className="auth-brand-logo">
                        SAMS
                    </Link>
                </div>

                <div className="auth-brand-content">
                    <div className="auth-brand-eyebrow">{eyebrow}</div>
                    <h1 className="auth-brand-heading">{heading}</h1>
                    <p className="auth-brand-body">{body}</p>
                </div>

                <div className="auth-brand-bottom">
                    Faculty of Computing · University of Sri Jayewardenepura
                </div>
            </div>

            <div className="auth-form-side">
                <div className="auth-card">{children}</div>
            </div>
        </div>
    );
}