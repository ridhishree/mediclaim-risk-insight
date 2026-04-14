import { useState } from 'react';
import { mockClaims } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, Input, Badge } from './ui';
import { Search, Filter } from 'lucide-react';

export function ClaimsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredClaims = mockClaims.filter(claim => {
    const matchesSearch = claim.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          claim.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Recent Claims</CardTitle>
            <p className="text-sm text-slate-500 mt-1">Manage and track all submitted claims</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search claims..." 
                className="pl-9 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select 
                className="h-10 w-full sm:w-auto appearance-none rounded-lg border border-slate-300 bg-white pl-9 pr-8 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Claim ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Provider</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClaims.slice(0, 20).map((claim) => (
                <tr key={claim.id} className="bg-white hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{claim.id}</td>
                  <td className="px-6 py-4 text-slate-600">{claim.date}</td>
                  <td className="px-6 py-4 text-slate-600">{claim.patientName}</td>
                  <td className="px-6 py-4 text-slate-600">{claim.provider}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">${claim.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      claim.status === 'Approved' ? 'success' :
                      claim.status === 'Rejected' ? 'destructive' : 'warning'
                    }>
                      {claim.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate" title={claim.rejectionReason}>
                    {claim.rejectionReason || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredClaims.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 font-medium">No claims found matching your criteria.</p>
              <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
          {filteredClaims.length > 20 && (
            <div className="text-center py-4 text-sm text-slate-500 bg-slate-50 border-t border-slate-100">
              Showing 20 of {filteredClaims.length} claims.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
