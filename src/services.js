// ─── Service Configuration ────────────────────────────────────────────────────
// New flow: Location (3) → Service (8)
// Locations: islamabad | punjab | kpk
// Services:  0=Vehicle Registration, 1=Property Tax, 2=Domicile Certificate,
//            3=Birth Certificate, 4=Health Services, 5=Electricity Bill,
//            6=Water Bill, 7=All Services

const LOCATIONS    = ['Islamabad', 'Punjab', 'Khyber Pakhtunkhwa (KPK)'];
const LOCATIONS_UR = ['اسلام آباد', 'پنجاب', 'خیبر پختونخواہ'];
const LOCATION_KEYS = ['islamabad', 'punjab', 'kpk'];

const SERVICES = [
  '🚗 Vehicle Registration',    // 0
  '🏠 Property Tax',            // 1
  '💳 Domicile Certificate',    // 2
  '📄 Birth Certificate',       // 3
  '🏥 Health Services',         // 4
  '⚡ Electricity Bill',        // 5
  '💧 Water Bill',              // 6
  '📋 All Services',            // 7
];

const SERVICES_UR = [
  '🚗 گاڑی کی رجسٹریشن',      // 0
  '🏠 جائیداد ٹیکس',           // 1
  '💳 ڈومیسائل سرٹیفکیٹ',     // 2
  '📄 پیدائش سرٹیفکیٹ',       // 3
  '🏥 صحت کی خدمات',           // 4
  '⚡ بجلی بل',                 // 5
  '💧 پانی بل',                // 6
  '📋 تمام خدمات',             // 7
];

// Keep old exports for backwards-compat (used nowhere new)
const DEPARTMENTS    = SERVICES;
const DEPARTMENTS_UR = SERVICES_UR;
const PROVINCES      = LOCATIONS;
const PROVINCES_UR   = LOCATIONS_UR;

// ─── Populate with your official URLs ────────────────────────────────────────
// Replace placeholder URLs with actual government portal links.
// If a service is not available for a province, set it to null.

const services = {
  0: { // View Complaint
    sindh:   { url: 'https://gov.sindh.gov.pk/complaints', note: 'Sindh Government online complaint portal' },
    punjab:  { url: 'https://cm.punjab.gov.pk/complaints', note: 'Punjab Chief Minister complaint cell' },
    kp:      { url: 'https://cm.kpk.gov.pk/complaints', note: 'KP CM complaint portal' },
    federal: { url: 'https://www.pakistan.gov.pk/complaints', note: 'Federal complaint management system' },
  },
  1: { // NADRA
    sindh:   { url: 'https://id.nadra.gov.pk', note: 'Apply for CNIC, NICOP, Smart Card & Birth Certificate' },
    punjab:  { url: 'https://id.nadra.gov.pk', note: 'Apply for CNIC, NICOP, Smart Card & Birth Certificate' },
    kp:      { url: 'https://id.nadra.gov.pk', note: 'Apply for CNIC, NICOP, Smart Card & Birth Certificate' },
    federal: { url: 'https://id.nadra.gov.pk', note: 'Apply for CNIC, NICOP, Smart Card & Birth Certificate' },
  },
  2: { // Police
    sindh:   { url: 'https://sindhpolice.gov.pk', note: 'Sindh Police — FIR, verification & services' },
    punjab:  { url: 'https://punjabpolice.gov.pk', note: 'Punjab Police — FIR, verification & services' },
    kp:      { url: 'https://kppolice.gov.pk', note: 'KP Police — FIR, verification & services' },
    federal: { url: 'https://islamabadpolice.gov.pk', note: 'Islamabad Capital Territory Police' },
  },
  3: { // Traffic Police
    sindh:   { url: 'https://trafficpolice.sindh.gov.pk', note: 'Sindh Traffic Police — license & challan' },
    punjab:  { url: 'https://ltp.punjab.gov.pk', note: 'Lahore Traffic Police — license & challan services' },
    kp:      { url: 'https://kppolice.gov.pk/traffic', note: 'KP Traffic Police services' },
    federal: { url: 'https://itp.punjab.gov.pk', note: 'ICT Traffic Police' },
  },
  4: { // K Electric
    sindh:   { url: 'https://www.ke.com.pk', note: 'K-Electric — bill payment, outage report & complaint' },
    punjab:  null,
    kp:      null,
    federal: null,
  },
  5: { // KMC
    sindh:   { url: 'https://www.kmc.gos.pk', note: 'Karachi Metropolitan Corporation — civic services' },
    punjab:  null,
    kp:      null,
    federal: null,
  },
  6: { // Sui Gas
    sindh:   { url: 'https://www.ssgc.com.pk', note: 'Sui Southern Gas Company — bill & complaint' },
    punjab:  { url: 'https://www.sngpl.com.pk', note: 'Sui Northern Gas Pipelines — bill & complaint' },
    kp:      { url: 'https://www.sngpl.com.pk', note: 'Sui Northern Gas Pipelines — bill & complaint' },
    federal: { url: 'https://www.sngpl.com.pk', note: 'Sui Northern Gas Pipelines — bill & complaint' },
  },
  7: { // Water Board
    sindh:   { url: 'https://www.kwsb.gos.pk', note: 'Karachi Water & Sewerage Board — bill & complaint' },
    punjab:  { url: 'https://wasa.punjab.gov.pk', note: 'WASA Punjab — water services' },
    kp:      { url: 'https://pesco.gov.pk', note: 'KP Water services portal' },
    federal: { url: 'https://cda.gov.pk', note: 'CDA Water Management — Islamabad' },
  },
  8: { // Pakistan Bait ul Maal
    sindh:   { url: 'https://pbm.gov.pk', note: 'Pakistan Bait ul Maal — financial assistance application' },
    punjab:  { url: 'https://pbm.gov.pk', note: 'Pakistan Bait ul Maal — financial assistance application' },
    kp:      { url: 'https://pbm.gov.pk', note: 'Pakistan Bait ul Maal — financial assistance application' },
    federal: { url: 'https://pbm.gov.pk', note: 'Pakistan Bait ul Maal — financial assistance application' },
  },
  9: { // Benazir Income Support
    sindh:   { url: 'https://www.bisp.gov.pk', note: 'BISP — check eligibility, registration & payment status' },
    punjab:  { url: 'https://www.bisp.gov.pk', note: 'BISP — check eligibility, registration & payment status' },
    kp:      { url: 'https://www.bisp.gov.pk', note: 'BISP — check eligibility, registration & payment status' },
    federal: { url: 'https://www.bisp.gov.pk', note: 'BISP — check eligibility, registration & payment status' },
  },
  10: { // Zakat & Ushr
    sindh:   { url: 'https://www.zakat.gov.pk', note: 'Zakat & Ushr Department — registration & distribution' },
    punjab:  { url: 'https://www.zakat.gov.pk', note: 'Zakat & Ushr Department — registration & distribution' },
    kp:      { url: 'https://www.zakat.gov.pk', note: 'Zakat & Ushr Department — registration & distribution' },
    federal: { url: 'https://www.zakat.gov.pk', note: 'Zakat & Ushr Department — registration & distribution' },
  },
  11: { // Immigration & Passport
    sindh:   { url: 'https://dgip.gov.pk', note: 'Directorate General of Immigration & Passports — apply & track' },
    punjab:  { url: 'https://dgip.gov.pk', note: 'Directorate General of Immigration & Passports — apply & track' },
    kp:      { url: 'https://dgip.gov.pk', note: 'Directorate General of Immigration & Passports — apply & track' },
    federal: { url: 'https://dgip.gov.pk', note: 'Directorate General of Immigration & Passports — apply & track' },
  },
  12: { // Pakistan Customs
    sindh:   { url: 'https://www.fbr.gov.pk/customs', note: 'FBR Customs — declarations, WeBOC & trade services' },
    punjab:  { url: 'https://www.fbr.gov.pk/customs', note: 'FBR Customs — declarations, WeBOC & trade services' },
    kp:      { url: 'https://www.fbr.gov.pk/customs', note: 'FBR Customs — declarations, WeBOC & trade services' },
    federal: { url: 'https://www.fbr.gov.pk/customs', note: 'FBR Customs — declarations, WeBOC & trade services' },
  },
};

const LOCATION_KEY_MAP = { '1': 'islamabad', '2': 'punjab', '3': 'kpk' };

module.exports = {
  LOCATIONS, LOCATIONS_UR, LOCATION_KEYS, LOCATION_KEY_MAP,
  SERVICES, SERVICES_UR,
  // legacy aliases kept for any remaining references
  DEPARTMENTS, DEPARTMENTS_UR, PROVINCES, PROVINCES_UR,
};
