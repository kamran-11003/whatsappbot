// ─── Service Link Configuration ──────────────────────────────────────────────
// Structure: services[departmentKey][provinceKey] = { url, note }
// provinceKey: 'sindh' | 'punjab' | 'kp' | 'federal'
// departmentKey: matches DEPARTMENTS array index

const DEPARTMENTS = [
  'View Complaint',         // 0
  'NADRA',                  // 1
  'Police',                 // 2
  'Traffic Police',         // 3
  'K Electric',             // 4
  'KMC',                    // 5
  'Sui Gas',                // 6
  'Water Board',            // 7
  'Pakistan Bait ul Maal',  // 8
  'Benazir Income Support', // 9
  'Zakat & Ushr',           // 10
  'Immigration & Passport', // 11
  'Pakistan Customs',       // 12
];

const DEPARTMENTS_UR = [
  'شکایت دیکھیں',
  'نادرا',
  'پولیس',
  'ٹریفک پولیس',
  'کے الیکٹرک',
  'کے ایم سی',
  'سوئی گیس',
  'واٹر بورڈ',
  'پاکستان بیت المال',
  'بے نظیر انکم سپورٹ',
  'زکوٰۃ و عشر',
  'امیگریشن اینڈ پاسپورٹ',
  'پاکستان کسٹمز',
];

const PROVINCES = ['Sindh', 'Punjab', 'Khyber Pakhtunkhwa', 'Federal / ICT'];
const PROVINCES_UR = ['سندھ', 'پنجاب', 'خیبر پختونخوا', 'وفاقی / آئی سی ٹی'];

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

const PROVINCE_KEYS = ['sindh', 'punjab', 'kp', 'federal'];

function getService(deptIndex, provinceIndex) {
  const provinceKey = PROVINCE_KEYS[provinceIndex];
  const deptData    = services[deptIndex];
  if (!deptData || !deptData[provinceKey]) return null;
  return deptData[provinceKey];
}

module.exports = { DEPARTMENTS, DEPARTMENTS_UR, PROVINCES, PROVINCES_UR, PROVINCE_KEYS, getService };
