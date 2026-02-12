export const LAKE_MOCK_DATA = {
  name: 'Laguna de Bay',
  alternateName: 'Laguna Lake',
  watershed: 'Laguna de Bay Basin',
  region: 'Region IV-A (CALABARZON)',
  province: 'Laguna',
  municipality:
    'San Pedro, Biñan, Sta. Rosa City, Cabuyao, Calamba, Los Baños, Bay, Calauan, Victoria, Pila, Sta. Cruz, Lumban, Kalayaan, Paete, Pakil, Pangil, Siniloan, Mabitac',
  classification: 'Class C',
  surfaceArea: '927.0715 km² (92707.15 ha)',
  surfaceElevation: '2.0 m',
  averageDepth: '2.8 m',
  tributaries: [
    'Santa Rosa River',
    'Tunasan River',
    'Pila River',
    'Calauan River',
    'Los Baños River',
    'San Juan River',
    'Cabuyao River',
    'Bumbungan River',
    'Marikina River',
    'San Cristobal River',
    'Tanay River',
    'Morong River',
    'Baras River',
    'Biñan River',
    'San Pedro River',
    'Angono River',
    'Pililla River',
    'Santa Maria River',
    'Siniloan River',
    'Pangil River',
    'Santa Cruz River',
    'Pasig River (via Napindan) ★',
  ],
}

export const WATER_QUALITY_METRICS = [
  { id: 'ammonia', name: 'Ammonia (mg/L)', rule: 'Max (DAO 2021-19: 0.06 mg/L)' },
  { id: 'bod', name: 'Biochemical Oxygen Demand (mg/L)', rule: 'Max (DAO 2021-19: 7 mg/L)' },
  { id: 'chloride', name: 'Chloride (mg/L)', rule: 'Max (DAO 2021-19: 350 mg/L)' },
  { id: 'do', name: 'Dissolved Oxygen (mg/L)', rule: 'Min (DAO 2021-19: 5 mg/L)' },
  { id: 'fecal', name: 'Fecal Coliform (MPN/100mL)', rule: 'Max (DAO 2021-19: 200 MPN/100mL)' },
]

export const TESTS_MOCK_DATA = [
  { date: 'May 31, 2025', station: 'Northern West Bay', source: 'Laguna Lake Development Authority' },
  { date: 'May 31, 2025', station: 'Central Bay', source: 'Laguna Lake Development Authority' },
  { date: 'May 31, 2025', station: 'Central West Bay', source: 'Laguna Lake Development Authority' },
  { date: 'May 30, 2025', station: 'East Bay', source: 'Laguna Lake Development Authority' },
  { date: 'May 1, 2025', station: 'Central Bay', source: 'Laguna Lake Development Authority' },
  { date: 'May 1, 2025', station: 'East Bay', source: 'Laguna Lake Development Authority' },
]

export const LAYERS_MOCK_DATA = [
  { title: 'Laguna de Bay', notes: '—' },
  { title: 'Laguna de Bay Basin', notes: '—' },
]
