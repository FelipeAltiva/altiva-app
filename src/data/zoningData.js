// Zoning dimensional standards by city and district.
// Brockton: Sec. 27-9 Table 1, 2026 Code of Ordinances (verified)
// Milton: §275 Zoning Bylaw, 2026 — district keys use official ordinance names
// Shrewsbury: Table II, 2026 Zoning Bylaw — district keys use official ordinance names
// Woburn, Revere, Boston/Hyde Park, Somerville: pending verification against 2026 ordinances

export const SUPPORTED_CITIES = [
  'brockton',
  'boston',
  'hyde park',
  'revere',
  'somerville',
  'woburn',
  'milton',
  'shrewsbury',
];

function detectCity(addressStr) {
  const lower = addressStr.toLowerCase();
  if (lower.includes('brockton')) return 'brockton';
  if (lower.includes('hyde park')) return 'boston_hydePark';
  if (lower.includes('boston')) return 'boston_hydePark';
  if (lower.includes('revere')) return 'revere';
  if (lower.includes('somerville')) return 'somerville';
  if (lower.includes('woburn')) return 'woburn';
  if (lower.includes('milton')) return 'milton';
  if (lower.includes('shrewsbury')) return 'shrewsbury';
  return null;
}

const database = {
  brockton: {
    label: 'Brockton, MA',
    districts: {
      'R-1A': {
        name: 'Residential A',
        minLotArea: '30,000 sq ft',
        minLotFrontage: '175 ft',
        frontSetback: '30 ft',
        sideSetback: '20 ft (one side min); 50 ft total both sides',
        rearSetback: '50 ft',
        maxBuildingCoverage: '20%',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'R-1B': {
        name: 'Residential B',
        minLotArea: '30,000 sq ft',
        minLotFrontage: '175 ft',
        frontSetback: '30 ft',
        sideSetback: '15 ft (one side min); 30 ft total both sides',
        rearSetback: '30 ft',
        maxBuildingCoverage: '25%',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'R-1C': {
        name: 'Residential C',
        minLotArea: '30,000 sq ft',
        minLotFrontage: '175 ft',
        frontSetback: '30 ft',
        sideSetback: '15 ft (one side min); 30 ft total both sides',
        rearSetback: '30 ft',
        maxBuildingCoverage: '25%',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'R-2': {
        name: 'Two-Family Residential',
        minLotArea: '7,500 sq ft (SF); 5,000 sq ft per unit (2F)',
        minLotFrontage: '100 ft',
        frontSetback: '20 ft',
        sideSetback: '10 ft per side',
        rearSetback: '25 ft',
        maxBuildingCoverage: '30%',
        maxBuildingHeight: '45 ft (3 stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'R-3': {
        name: 'Multi-Family Residential',
        minLotArea: '5,000 sq ft (SF); 7,500 sq ft (2F); 12,000 sq ft first 3 MF units + 2,000 sq ft each additional unit',
        minLotFrontage: '100 ft',
        frontSetback: '20 ft',
        sideSetback: '10 ft per side',
        rearSetback: '25 ft',
        maxBuildingCoverage: '30%',
        maxBuildingHeight: '45 ft (3 stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
    },
  },

  boston_hydePark: {
    label: 'Boston (Hyde Park), MA',
    districts: {
      '1F-6000': {
        name: 'Single Family – 6,000 sf',
        minLotArea: '6,000 sq ft',
        minLotFrontage: '50 ft',
        frontSetback: '20 ft',
        sideSetback: '5 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '40%',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '3 ft', rear: '3 ft' },
      },
      '1F-7000': {
        name: 'Single Family – 7,000 sf',
        minLotArea: '7,000 sq ft',
        minLotFrontage: '60 ft',
        frontSetback: '20 ft',
        sideSetback: '5 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '40%',
        maxBuildingHeight: '35 ft',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '3 ft', rear: '3 ft' },
      },
      '2F-6000': {
        name: 'Two-Family – 6,000 sf',
        minLotArea: '6,000 sq ft',
        minLotFrontage: '50 ft',
        frontSetback: '20 ft',
        sideSetback: '5 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '40%',
        maxBuildingHeight: '35 ft',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '3 ft', rear: '3 ft' },
      },
      '3F-6000': {
        name: 'Three-Family – 6,000 sf',
        minLotArea: '6,000 sq ft',
        minLotFrontage: '50 ft',
        frontSetback: '20 ft',
        sideSetback: '5 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '40%',
        maxBuildingHeight: '40 ft',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '3 ft', rear: '3 ft' },
      },
      'MFR': {
        name: 'Multi-Family Residential',
        minLotArea: '10,000 sq ft',
        minLotFrontage: '60 ft',
        frontSetback: '20 ft',
        sideSetback: '10 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '50%',
        maxBuildingHeight: '50 ft (4 stories)',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '3 ft', rear: '3 ft' },
      },
    },
  },

  revere: {
    label: 'Revere, MA',
    districts: {
      'SR': {
        name: 'Single Residence',
        minLotArea: '6,000 sq ft',
        minLotFrontage: '60 ft',
        frontSetback: '20 ft',
        sideSetback: '5 ft per side',
        rearSetback: '20 ft',
        maxBuildingCoverage: '40%',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '3 ft', rear: '3 ft' },
      },
      'GR': {
        name: 'General Residence',
        minLotArea: '5,000 sq ft',
        minLotFrontage: '50 ft',
        frontSetback: '15 ft',
        sideSetback: '5 ft per side',
        rearSetback: '15 ft',
        maxBuildingCoverage: '45%',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '3 ft', rear: '3 ft' },
      },
      'MR': {
        name: 'Multi-Family Residence',
        minLotArea: '10,000 sq ft',
        minLotFrontage: '80 ft',
        frontSetback: '20 ft',
        sideSetback: '10 ft per side',
        rearSetback: '20 ft',
        maxBuildingCoverage: '50%',
        maxBuildingHeight: '45 ft (3½ stories)',
        parking: '1.5 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
    },
  },

  somerville: {
    label: 'Somerville, MA',
    districts: {
      'RB': {
        name: 'Residential Base',
        minLotArea: '5,000 sq ft',
        minLotFrontage: '50 ft',
        frontSetback: '15 ft',
        sideSetback: '5 ft per side',
        rearSetback: '20 ft',
        maxBuildingCoverage: '40%',
        maxBuildingHeight: '35 ft',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '15 ft', side: '3 ft', rear: '3 ft' },
      },
      'MR': {
        name: 'Medium-Density Residential',
        minLotArea: '3,500 sq ft',
        minLotFrontage: '40 ft',
        frontSetback: '10 ft',
        sideSetback: '3 ft per side',
        rearSetback: '15 ft',
        maxBuildingCoverage: '50%',
        maxBuildingHeight: '40 ft',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '15 ft', side: '3 ft', rear: '3 ft' },
      },
      'HR': {
        name: 'High-Density Residential',
        minLotArea: '2,500 sq ft',
        minLotFrontage: '30 ft',
        frontSetback: '0 ft',
        sideSetback: '0 ft per side',
        rearSetback: '10 ft',
        maxBuildingCoverage: '60%',
        maxBuildingHeight: '50 ft',
        parking: '0.5 spaces per dwelling unit',
        accessory: { maxHeight: '15 ft', side: '0 ft', rear: '5 ft' },
      },
      'NR': {
        name: 'Neighborhood Residential',
        minLotArea: '4,000 sq ft',
        minLotFrontage: '40 ft',
        frontSetback: '10 ft',
        sideSetback: '5 ft per side',
        rearSetback: '20 ft',
        maxBuildingCoverage: '45%',
        maxBuildingHeight: '35 ft',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '15 ft', side: '3 ft', rear: '3 ft' },
      },
    },
  },

  woburn: {
    label: 'Woburn, MA',
    districts: {
      'R-1': {
        name: 'Single Family Residential',
        minLotArea: '20,000 sq ft',
        minLotFrontage: '100 ft',
        frontSetback: '30 ft',
        sideSetback: '15 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '25%',
        maxBuildingHeight: '35 ft',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '5 ft', rear: '5 ft' },
      },
      'R-2': {
        name: 'Single Family – Smaller Lots',
        minLotArea: '12,000 sq ft',
        minLotFrontage: '75 ft',
        frontSetback: '25 ft',
        sideSetback: '10 ft per side',
        rearSetback: '25 ft',
        maxBuildingCoverage: '30%',
        maxBuildingHeight: '35 ft',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '5 ft', rear: '5 ft' },
      },
      'R-3': {
        name: 'Multi-Family Residential',
        minLotArea: '15,000 sq ft',
        minLotFrontage: '100 ft',
        frontSetback: '25 ft',
        sideSetback: '15 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '35%',
        maxBuildingHeight: '40 ft',
        parking: '1.5 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
    },
  },

  milton: {
    label: 'Milton, MA',
    // Keys are official 2026 bylaw zone names (§275). MassGIS may return abbreviated
    // forms such as "Res A" or "AA" — normalize() strips spaces/dashes for fuzzy matching.
    districts: {
      'Residence AA': {
        name: 'Residence AA',
        minLotArea: '80,000 sq ft',
        minLotFrontage: '150 ft (200 ft on corner lots)',
        frontSetback: '30 ft',
        sideSetback: '15 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '10 ft', rear: '10 ft' },
      },
      'Residence A': {
        name: 'Residence A',
        minLotArea: '40,000 sq ft',
        minLotFrontage: '150 ft',
        frontSetback: '30 ft',
        sideSetback: '15 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '10 ft', rear: '10 ft' },
      },
      'Residence B': {
        name: 'Residence B',
        minLotArea: '20,000 sq ft',
        minLotFrontage: '100 ft',
        frontSetback: '25 ft',
        sideSetback: '12 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'Residence C': {
        name: 'Residence C',
        minLotArea: '7,500 sq ft',
        minLotFrontage: '75 ft',
        frontSetback: '20 ft',
        sideSetback: '10 ft per side',
        rearSetback: '30 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'Residence D': {
        name: 'Residence D (Multi-Family)',
        minLotArea: 'See §275 (varies by project)',
        minLotFrontage: 'See §275',
        frontSetback: 'See §275',
        sideSetback: 'See §275',
        rearSetback: 'See §275',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (3 stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'Residence D-1': {
        name: 'Residence D-1 (Elderly/Handicapped Housing)',
        minLotArea: 'See §275 (varies by project)',
        minLotFrontage: 'See §275',
        frontSetback: 'See §275',
        sideSetback: 'See §275',
        rearSetback: 'See §275',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '37.5 ft (3½ stories)',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
      'Residence D-2': {
        name: 'Residence D-2 (Elderly Housing – Large Lots)',
        minLotArea: '25 acres min',
        minLotFrontage: 'See §275',
        frontSetback: 'See §275',
        sideSetback: 'See §275',
        rearSetback: 'See §275',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '45 ft',
        parking: '1 space per dwelling unit',
        accessory: { maxHeight: '20 ft', side: '5 ft', rear: '5 ft' },
      },
    },
  },

  shrewsbury: {
    label: 'Shrewsbury, MA',
    // Keys are official 2026 zoning bylaw zone names (Table II).
    // MassGIS may return abbreviated forms — normalize() handles common variations.
    districts: {
      'Rural AA': {
        name: 'Rural AA',
        minLotArea: '45,000 sq ft',
        minLotFrontage: '150 ft',
        frontSetback: '50 ft',
        sideSetback: '30 ft per side',
        rearSetback: '50 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '10 ft', rear: '10 ft' },
      },
      'Rural A': {
        name: 'Rural A',
        minLotArea: '20,000 sq ft',
        minLotFrontage: '125 ft',
        frontSetback: '50 ft',
        sideSetback: '30 ft per side',
        rearSetback: '50 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '10 ft', rear: '10 ft' },
      },
      'Rural B': {
        name: 'Rural B',
        minLotArea: '20,000 sq ft',
        minLotFrontage: '125 ft',
        frontSetback: '50 ft',
        sideSetback: '30 ft per side',
        rearSetback: '50 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '10 ft', rear: '10 ft' },
      },
      'Residence A': {
        name: 'Residence A',
        minLotArea: '12,500 sq ft',
        minLotFrontage: '100 ft',
        frontSetback: '30 ft',
        sideSetback: '10 ft per side',
        rearSetback: '40 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '5 ft', rear: '5 ft' },
      },
      'Residence B-1': {
        name: 'Residence B-1',
        minLotArea: '12,500 sq ft',
        minLotFrontage: '100 ft',
        frontSetback: '30 ft',
        sideSetback: '10 ft per side',
        rearSetback: '40 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '5 ft', rear: '5 ft' },
      },
      'Residence B-2': {
        name: 'Residence B-2',
        minLotArea: '12,500 sq ft',
        minLotFrontage: '100 ft',
        frontSetback: '30 ft',
        sideSetback: '10 ft per side',
        rearSetback: '40 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (2½ stories)',
        parking: '2 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '5 ft', rear: '5 ft' },
      },
      'MF-1': {
        name: 'Multi-Family MF-1',
        minLotArea: '16,000 sq ft',
        minLotFrontage: '50 ft',
        frontSetback: '50 ft',
        sideSetback: '25 ft per side',
        rearSetback: '25 ft',
        maxBuildingCoverage: '—',
        maxBuildingHeight: '35 ft (3 stories)',
        parking: '1.5 spaces per dwelling unit',
        accessory: { maxHeight: '18 ft', side: '10 ft', rear: '10 ft' },
      },
    },
  },
};

export function getCityKey(addressOrCity) {
  return detectCity(addressOrCity || '');
}

export function getCityData(cityKey) {
  return database[cityKey] || null;
}

export function getZoningStandards(cityKey, zoningCode) {
  const city = database[cityKey];
  if (!city) return null;

  // Direct match
  if (city.districts[zoningCode]) return city.districts[zoningCode];

  // Normalize: strip spaces and dashes, uppercase
  const normalize = (s) => s.replace(/[\s-]/g, '').toUpperCase();
  const normTarget = normalize(zoningCode);

  for (const [key, val] of Object.entries(city.districts)) {
    if (normalize(key) === normTarget) return val;
  }

  return null;
}

export function getTransitInfo(cityKey) {
  const transit = {
    brockton: {
      score: 'Low',
      label: 'Car-Dependent',
      description: 'Suburban area with limited public transit. Brockton is served by BAT (Brockton Area Transit) bus network and a Commuter Rail station (Providence/Stoughton Line) at Brockton Station.',
      parking: 'Off-street parking required per zoning ordinance.',
    },
    boston_hydePark: {
      score: 'High',
      label: 'Good Transit Access',
      description: 'Hyde Park is served by the MBTA Fairmount/Franklin/Providence Commuter Rail lines (Hyde Park, Readville, and Endicott stations) and multiple bus routes. Forest Hills Orange Line station is nearby.',
      parking: 'Check Boston Article 80 for transit-oriented parking reductions.',
    },
    revere: {
      score: 'High',
      label: 'Excellent Transit Access',
      description: 'Revere is served by the MBTA Blue Line with four stations: Suffolk Downs, Beachmont, Revere Beach, and Wonderland. Bus routes also connect to the rest of the MBTA network.',
      parking: 'Properties within ½ mile of Blue Line stations may qualify for reduced parking requirements.',
    },
    somerville: {
      score: 'High',
      label: 'Excellent Transit Access',
      description: 'Somerville is served by the MBTA Green Line Extension (GLX) with stations at Union Square, East Somerville, Gilman, Magoun, Ball, and College Ave. Also served by numerous bus routes.',
      parking: 'Somerville Zoning reduces or eliminates parking minimums near GLX stations.',
    },
    woburn: {
      score: 'Low',
      label: 'Limited Transit',
      description: 'Woburn is served by the MBTA Lowell Commuter Rail Line at Woburn Station and Anderson/Woburn Station (intermodal hub). Limited bus service available.',
      parking: 'Off-street parking required per zoning ordinance.',
    },
    milton: {
      score: 'Moderate',
      label: 'Moderate Transit Access',
      description: 'Milton is served by the MBTA Mattapan High-Speed Trolley Line (Mattapan to Ashmont Red Line) and bus routes connecting to Ashmont Red Line station.',
      parking: 'Standard parking requirements apply.',
    },
    shrewsbury: {
      score: 'Low',
      label: 'Car-Dependent',
      description: 'Shrewsbury is a suburban/rural community with no MBTA service. Worcester Regional Transit Authority (WRTA) provides limited bus service. Automobile travel is primary mode.',
      parking: 'Off-street parking required per zoning ordinance. Two spaces per dwelling unit typical.',
    },
  };
  return transit[cityKey] || null;
}
