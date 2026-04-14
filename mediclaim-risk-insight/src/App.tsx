import { useState } from 'react';
import { Activity, FileText, LayoutDashboard, Settings, Bell, UserCircle, Search } from 'lucide-react';
import { Analytics } from './components/Analytics';
import { ClaimsTable } from './components/ClaimsTable';
import { ClaimPredictor } from './components/ClaimPredictor';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'claims' | 'predictor'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-none">MediClaim AI</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mt-1 font-semibold">Billing Intelligence</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('claims')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === 'claims' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <FileText className="h-4 w-4" />
            Claims Directory
          </button>
          <button 
            onClick={() => setActiveTab('predictor')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${activeTab === 'predictor' ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Activity className="h-4 w-4" />
            AI Predictor
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all text-sm font-medium">
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-semibold text-slate-800">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'claims' && 'Claims Directory'}
            {activeTab === 'predictor' && 'Submit & Analyze Claim'}
          </h2>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patient or claim ID..." 
                className="pl-9 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-full text-sm w-64 transition-all outline-none"
              />
            </div>
            
            <button className="p-2 text-slate-400 hover:text-slate-600 relative transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-700 leading-none">Sarah Jenkins</p>
                <p className="text-xs text-slate-500 mt-1">Billing Manager</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                SJ
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'overview' && <Analytics />}
            {activeTab === 'claims' && <ClaimsTable />}
            {activeTab === 'predictor' && <ClaimPredictor />}
          </div>
        </div>
      </main>
    </div>
  );
}
