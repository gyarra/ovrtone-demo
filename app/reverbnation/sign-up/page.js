export default function CreateAccountStep() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="rn-field-label block">First Name *</label>
          <input className="rn-field-input" placeholder="First name" />
        </div>
        <div>
          <label className="rn-field-label block">Last Name *</label>
          <input className="rn-field-input" placeholder="Last name" />
          <div className="rn-field-note">Used for account management & payouts</div>
        </div>
      </div>

      <div className="mb-4">
        <label className="rn-field-label block">Email Address *</label>
        <input className="rn-field-input" type="email" placeholder="artist@example.com" />
        <div className="rn-field-note">Must be unique — used for login and notifications</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="rn-field-label block">Password *</label>
          <input className="rn-field-input" type="password" placeholder="••••••••" />
          <div className="rn-field-note">Minimum 8 characters</div>
        </div>
        <div>
          <label className="rn-field-label block">Confirm Password *</label>
          <input className="rn-field-input" type="password" placeholder="••••••••" />
        </div>
      </div>

      <div className="flex items-start gap-2 mt-4 p-3 rounded" style={{ border: "1px solid var(--rn-section-border)" }}>
        <input type="checkbox" className="mt-0.5" />
        <span className="text-[13px]" style={{ color: "var(--rn-slate-600)" }}>
          I agree to the{" "}
          <span className="underline" style={{ color: "var(--rn-blue)" }}>Terms of Service</span>{" "}
          and{" "}
          <span className="underline" style={{ color: "var(--rn-blue)" }}>Privacy Policy</span>
        </span>
      </div>
    </div>
  );
}
