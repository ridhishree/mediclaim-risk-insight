import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui';
import { getRejectionRateByProvider, getRejectionReasonsCount, getMonthlyTrend, mockClaims } from '../data/mockData';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

export function Analytics() {
  const providerData = getRejectionRateByProvider();
  const reasonsData = getRejectionReasonsCount();
  const trendData = getMonthlyTrend();

  const totalClaims = mockClaims.length;
  const rejectedClaims = mockClaims.filter(c => c.status === 'Rejected').length;
  const rejectionRate = ((rejectedClaims / totalClaims) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Claims (90 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-light text-slate-800">{totalClaims}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Rejected Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-light text-red-600">{rejectedClaims}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wider">Overall Rejection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-light text-amber-500">{rejectionRate}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
            <CardTitle>Claims Trend</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} name="Approved" />
                <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} name="Rejected" />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} name="Pending" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
            <CardTitle>Top Rejection Reasons</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reasonsData.slice(0, 5)} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" width={150} stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="value" fill="#4f46e5" radius={[0, 4, 4, 0]} name="Count" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
            <CardTitle>Rejection Rate by Provider (%)</CardTitle>
          </CardHeader>
          <CardContent className="h-80 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={providerData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} 
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="rate" fill="#ef4444" radius={[6, 6, 0, 0]} name="Rejection Rate %" barSize={40}>
                  {providerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate > 20 ? '#ef4444' : '#f59e0b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
