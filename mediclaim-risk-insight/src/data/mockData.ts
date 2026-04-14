export type ClaimStatus = 'Approved' | 'Rejected' | 'Pending';

export interface Claim {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  provider: string;
  department: string;
  status: ClaimStatus;
  rejectionReason?: string;
}

const providers = ['Blue Cross', 'Medicare', 'Aetna', 'Cigna', 'UnitedHealthcare'];
const departments = ['Cardiology', 'Orthopedics', 'Emergency', 'Pediatrics', 'Neurology', 'Oncology'];
const rejectionReasons = [
  'Missing Patient Information',
  'Incorrect Coding (ICD-10)',
  'Service Not Covered',
  'Duplicate Claim',
  'Prior Authorization Required',
  'Provider Out of Network',
  'Timely Filing Limit Expired'
];

const generateMockClaims = (count: number): Claim[] => {
  const claims: Claim[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const statusRand = Math.random();
    let status: ClaimStatus = 'Approved';
    if (statusRand > 0.8) status = 'Rejected';
    else if (statusRand > 0.65) status = 'Pending';

    const date = new Date(now.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000); // Last 90 days

    claims.push({
      id: `CLM-${Math.floor(10000 + Math.random() * 90000)}`,
      patientName: `Patient ${i + 1}`,
      date: date.toISOString().split('T')[0],
      amount: Math.floor(500 + Math.random() * 15000),
      provider: providers[Math.floor(Math.random() * providers.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      status,
      rejectionReason: status === 'Rejected' ? rejectionReasons[Math.floor(Math.random() * rejectionReasons.length)] : undefined,
    });
  }

  return claims.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const mockClaims = generateMockClaims(250);

// Analytics Data Helpers
export const getRejectionRateByProvider = () => {
  const providerStats: Record<string, { total: number; rejected: number }> = {};
  
  mockClaims.forEach(claim => {
    if (!providerStats[claim.provider]) {
      providerStats[claim.provider] = { total: 0, rejected: 0 };
    }
    providerStats[claim.provider].total += 1;
    if (claim.status === 'Rejected') {
      providerStats[claim.provider].rejected += 1;
    }
  });

  return Object.entries(providerStats).map(([provider, stats]) => ({
    name: provider,
    rate: Math.round((stats.rejected / stats.total) * 100),
    total: stats.total,
    rejected: stats.rejected
  })).sort((a, b) => b.rate - a.rate);
};

export const getRejectionReasonsCount = () => {
  const reasons: Record<string, number> = {};
  mockClaims.forEach(claim => {
    if (claim.status === 'Rejected' && claim.rejectionReason) {
      reasons[claim.rejectionReason] = (reasons[claim.rejectionReason] || 0) + 1;
    }
  });

  return Object.entries(reasons).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
};

export const getMonthlyTrend = () => {
  const months: Record<string, { approved: number; rejected: number; pending: number }> = {};
  
  mockClaims.forEach(claim => {
    const month = claim.date.substring(0, 7); // YYYY-MM
    if (!months[month]) {
      months[month] = { approved: 0, rejected: 0, pending: 0 };
    }
    if (claim.status === 'Approved') months[month].approved += 1;
    if (claim.status === 'Rejected') months[month].rejected += 1;
    if (claim.status === 'Pending') months[month].pending += 1;
  });

  return Object.entries(months).map(([name, stats]) => ({
    name,
    ...stats
  })).sort((a, b) => a.name.localeCompare(b.name));
};
