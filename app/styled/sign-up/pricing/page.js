export default function PricingStep() {
  return (
    <div>
      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="rn-field-label block">Hourly Rate * (USD)</label>
          <input className="rn-field-input" placeholder="$250" type="number" min={50} />
          <div className="rn-field-note">Minimum $50/hr · Visible to logged-in users only</div>
        </div>
        <div>
          <label className="rn-field-label block">Minimum Hours</label>
          <select className="rn-field-input">
            <option>1 hour</option>
            <option>2 hours</option>
            <option>3 hours</option>
            <option>4 hours</option>
          </select>
        </div>
      </div>

      {/* Event Types */}
      <div className="mb-6">
        <label className="rn-field-label block mb-2">Event Types</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {["Weddings", "Corporate", "Bars & Clubs", "Private Parties", "Festivals", "Other"].map((t) => (
            <label key={t} className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: "var(--rn-slate-700)" }}>
              <input type="checkbox" />
              {t}
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <label className="rn-field-label block">Languages</label>
        <input className="rn-field-input" placeholder="e.g. English, Spanish" />
      </div>

      {/* Service Area */}
      <div className="mb-6">
        <label className="rn-field-label block">Service Area</label>
        <input className="rn-field-input" placeholder="e.g. Manhattan, Brooklyn, Queens" />
      </div>

      {/* Gig Requirements */}
      <div>
        <label className="rn-field-label block">Gig Requirements</label>
        <textarea
          className="rn-textarea"
          placeholder="e.g. Power supply (2 standard outlets minimum), parking / load-in access, minimum stage area..."
          rows={4}
        />
        <div className="rn-field-note">What do you need from the venue or client?</div>
      </div>
    </div>
  );
}
