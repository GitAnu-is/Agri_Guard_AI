import type { PackagingRecommendation, TransportInput, TransportRiskResult } from '../types';

export const vehicleTypes = ['Small lorry (open)', 'Small lorry (covered)', 'Refrigerated truck', 'Three-wheeler', 'Tractor trailer'];
export const roadConditions = ['Good (A-grade metalled)', 'Fair (B-grade metalled)', 'Poor (gravel)', 'Very poor (unpaved rural)'];
export const packagingTypes = ['Woven polypropylene sack', 'Plastic crate', 'Ventilated corrugated produce box', 'Bulk loose (unpackaged)', 'Wooden crate'];
export const packagingMaterials = ['Polypropylene', 'HDPE plastic', 'Corrugated fibreboard', 'Timber', 'None'];
export const storageConditions = ['Ambient (unventilated)', 'Ambient (ventilated)', 'Cooled 13–15 °C', 'Refrigerated 8–10 °C'];
export const cropSensitivities = ['Low', 'Moderate', 'High', 'Very high'];
export const cropMaturities = ['Immature', 'Mature green', 'Breaking / turning', 'Fully ripe'];

export const defaultTransportInput: TransportInput = {
  crop: 'Banana',
  distanceKm: 62,
  durationHours: 2.5,
  vehicleType: 'Small lorry (open)',
  roadCondition: 'Fair (B-grade metalled)',
  temperature: 31,
  humidity: 78,
  cropSensitivity: 'High',
  cropMaturity: 'Breaking / turning',
  packagingType: 'Woven polypropylene sack',
  packagingMaterial: 'Polypropylene',
  storageCondition: 'Ambient (unventilated)',
  origin: 'Meewitiya, Gampaha',
  destination: 'Manning Market, Colombo'
};

/** SAMPLE DATA — demo output of the transportation risk component. */
export const mockTransportRisk: TransportRiskResult = {
  damageProbability: 68,
  riskLevel: 'Medium',
  factors: [
  { feature: 'Distance', contribution: 24, direction: 'positive', note: '62 km on mixed road classes.' },
  { feature: 'Road condition', contribution: 22, direction: 'positive', note: 'B-grade metalled sections increase vibration load.' },
  { feature: 'Temperature', contribution: 19, direction: 'positive', note: '31 °C in an unventilated load accelerates ripening.' },
  { feature: 'Humidity', contribution: 14, direction: 'positive', note: '78% RH raises rot risk in sacks.' },
  { feature: 'Travel duration', contribution: 12, direction: 'positive', note: '2.5 hours exposure without cooling.' },
  { feature: 'Packaging', contribution: 9, direction: 'positive', note: 'Woven sacks provide no cushioning or ventilation.' },
  { feature: 'Vehicle type', contribution: -6, direction: 'negative', note: 'Lorry suspension reduces shock versus three-wheeler.' },
  { feature: 'Crop maturity', contribution: -4, direction: 'negative', note: 'Breaking-stage fruit tolerates handling better than fully ripe.' }],

  route: [
  { name: 'Meewitiya, Gampaha', lat: 7.0917, lng: 79.9999, note: 'Origin — farm collection point' },
  { name: 'Ja-Ela junction', lat: 7.0744, lng: 79.8917, note: 'Fair road, moderate vibration segment' },
  { name: 'Wattala', lat: 6.9897, lng: 79.8918, note: 'Congestion — added exposure time' },
  { name: 'Manning Market, Colombo', lat: 6.9394, lng: 79.8653, note: 'Destination — wholesale market' }],

  explanation:
  'Transportation risk is Medium because distance and road condition together account for 46% of the predicted damage probability, amplified by high ambient temperature and humidity in an unventilated load. Vehicle type and crop maturity reduce the risk slightly. Upgrading packaging is the single largest controllable lever in this consignment.',
  modelUsed: 'Random Forest + CatBoost ensemble (demo) · SHAP'
};

/** SAMPLE VALUES — indicative packaging guidance for demonstration. */
export const packagingRecommendations: PackagingRecommendation[] = [
{
  crop: 'Banana',
  recommended: 'Ventilated Corrugated Produce Box',
  material: 'Double-wall corrugated fibreboard, 18 kg capacity',
  ventilation: 'Side and end vents, 5% of surface area',
  cushioning: 'Perforated polyethylene liner with pad base',
  stacking: 'Maximum 4 boxes high, cross-stacked and strapped',
  storageTemp: '13 – 15 °C',
  humidity: '85 – 90% RH',
  damageReduction: 18,
  current: { name: 'Woven polypropylene sack', damageRisk: 68, ventilation: 'None', cushioning: 'None' },
  proposed: { name: 'Ventilated corrugated produce box', damageRisk: 50, ventilation: 'High', cushioning: 'Liner + base pad' }
},
{
  crop: 'Pineapple',
  recommended: 'Single-layer Ventilated Carton',
  material: 'Double-wall corrugated fibreboard with crown cavity',
  ventilation: 'End vents, 4% of surface area',
  cushioning: 'Moulded pulp tray, crown upward',
  stacking: 'Maximum 3 cartons high, no cross-loading',
  storageTemp: '8 – 12 °C',
  humidity: '85 – 90% RH',
  damageReduction: 14,
  current: { name: 'Bulk loose (unpackaged)', damageRisk: 61, ventilation: 'Open but uncontrolled', cushioning: 'None' },
  proposed: { name: 'Single-layer ventilated carton', damageRisk: 47, ventilation: 'Moderate', cushioning: 'Moulded pulp tray' }
},
{
  crop: 'Black Pepper',
  recommended: 'Food-grade Woven Sack with Moisture Barrier',
  material: 'Laminated polypropylene with inner liner',
  ventilation: 'Low — moisture exclusion prioritised',
  cushioning: 'Not required for dried berries',
  stacking: 'Palletised, maximum 6 bags high, off-floor',
  storageTemp: '20 – 25 °C',
  humidity: 'Below 60% RH',
  damageReduction: 9,
  current: { name: 'Plain woven sack', damageRisk: 34, ventilation: 'Uncontrolled', cushioning: 'None' },
  proposed: { name: 'Laminated sack with moisture barrier', damageRisk: 25, ventilation: 'Controlled', cushioning: 'Not applicable' }
}];


export const handlingChecklist = [
{
  phase: 'Before Transportation',
  items: [
  'Inspect crop for visible defects, rot and over-ripe units',
  'Confirm packaging matches the AI recommendation for the crop',
  'Check vehicle cleanliness, load bed condition and cover',
  'Check the weather forecast for the travel window']

},
{
  phase: 'During Transportation',
  items: [
  'Avoid excessive vibration — reduce speed on gravel segments',
  'Maintain recommended temperature and ventilation conditions',
  'Avoid overloading and exceeding stacking height limits',
  'Minimise idle time in direct sunlight']

},
{
  phase: 'After Transportation',
  items: [
  'Inspect quality on arrival and re-grade if required',
  'Record damage counts and defect types',
  'Update logistics history for model retraining',
  'Report recurring damage patterns to the agricultural officer']

}];


export const transportRiskTrend = [
{ month: 'Mar', risk: 74, damage: 12.1 },
{ month: 'Apr', risk: 71, damage: 11.4 },
{ month: 'May', risk: 69, damage: 10.8 },
{ month: 'Jun', risk: 66, damage: 9.9 },
{ month: 'Jul', risk: 68, damage: 10.2 },
{ month: 'Aug', risk: 62, damage: 8.7 }];


export const packagingEffectiveness = [
{ packaging: 'Bulk loose', damage: 24.6 },
{ packaging: 'Woven sack', damage: 18.2 },
{ packaging: 'Wooden crate', damage: 13.4 },
{ packaging: 'Plastic crate', damage: 9.8 },
{ packaging: 'Ventilated box', damage: 7.1 }];