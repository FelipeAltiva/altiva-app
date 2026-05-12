function SummaryRow({ label, badge, badgeClass, note }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      padding: '13px 0',
      borderBottom: '1px solid var(--gray-200)',
    }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)' }}>{label}</span>
        {note && (
          <p style={{ fontSize: '0.82rem', color: 'var(--gray-600)', marginTop: 3 }}>{note}</p>
        )}
      </div>
      <span className={`badge ${badgeClass}`} style={{ flexShrink: 0, marginTop: 2 }}>
        {badge}
      </span>
    </div>
  );
}

export default function FeasibilitySummary({ parcel, standards }) {
  const lotArea = parcel.lotAreaSqFt;
  const minLot = standards ? parseNumericFt(standards.minLotArea) : null;

  const isConforming = minLot === null || lotArea >= minLot;
  const expansionPotential = computeExpansion(lotArea, minLot, standards);
  const aduEligible = checkADU(lotArea);

  return (
    <div style={{
      background: 'var(--green)',
      borderRadius: 'var(--radius-lg)',
      padding: '28px 32px',
      color: '#fff',
    }}>
      <p style={{
        fontSize: '0.68rem',
        fontWeight: 800,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--terra)',
        borderLeft: '3px solid var(--terra)',
        paddingLeft: 10,
        marginBottom: 20,
      }}>
        Feasibility Summary
      </p>

      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '4px 16px' }}>
        <SummaryRow
          label="Zoning Status"
          badge={isConforming ? 'Conforming' : 'Nonconforming Lot'}
          badgeClass={isConforming ? 'badge-green' : 'badge-red'}
          note={
            !isConforming && minLot
              ? `Lot is ${parcel.lotAreaSqFt.toLocaleString()} sf vs. ${minLot.toLocaleString()} sf required. Pre-existing nonconforming status may allow limited improvements.`
              : undefined
          }
        />
        <SummaryRow
          label="Rear / Side Addition"
          badge="Feasible"
          badgeClass="badge-green"
          note="Addition is feasible provided setbacks are maintained and nonconformity is not increased."
        />
        <SummaryRow
          label="Expansion Potential"
          badge={expansionPotential.label}
          badgeClass={expansionPotential.class}
          note={expansionPotential.note}
        />
        <SummaryRow
          label="ADU / Additional Unit"
          badge={aduEligible ? 'Likely Permitted By-Right' : 'Verify with Building Dept.'}
          badgeClass={aduEligible ? 'badge-green' : 'badge-orange'}
          note="Massachusetts ADU Law (M.G.L. c. 40A §3, eff. 2025) may allow by-right ADU. Confirm with local Building Department."
        />
        <div style={{ padding: '14px 0', fontSize: '0.88rem', color: 'rgba(255,255,255,0.75)' }}>
          <strong style={{ color: '#fff' }}>Overall: </strong>
          Property offers {expansionPotential.label.toLowerCase()} expansion potential.
          {!isConforming ? ' As a pre-existing nonconforming lot, improvements are viable provided the existing nonconformity is not increased.' : ' Lot meets minimum dimensional requirements.'}
        </div>
      </div>
    </div>
  );
}

function parseNumericFt(str) {
  if (!str) return null;
  const match = str.replace(/,/g, '').match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

function computeExpansion(lotArea, minLot, standards) {
  if (!minLot || !standards) {
    return { label: 'Moderate', class: 'badge-orange', note: 'Constrained by setback and coverage requirements.' };
  }
  const ratio = lotArea / minLot;
  if (ratio >= 1.5) return { label: 'High', class: 'badge-green', note: 'Lot size provides good development flexibility.' };
  if (ratio >= 0.8) return { label: 'Moderate', class: 'badge-orange', note: 'Constrained by lot size, setbacks, and coverage requirements.' };
  return { label: 'Limited', class: 'badge-red', note: 'Lot size significantly below minimum; expansion options are constrained.' };
}

function checkADU(lotArea) {
  return lotArea >= 3000;
}
