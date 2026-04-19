'use client';

import { useOrders } from '@/hooks/useOrders';
import { useNotification } from '@/components/NotificationProvider';
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  CreditCard,
  RefreshCcw,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function Dashboard() {
  const { getStats, isHydrated, resetOrders } = useOrders();
  const { addNotification } = useNotification();
  
  if (!isHydrated) return null;

  const stats = getStats();

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all simulation data?')) {
      resetOrders();
      addNotification('Simulation data reset successfully', 'info');
    }
  };

  const statCards = [
    { label: 'Total Requests', value: stats.Requested, icon: <FileText className="text-gray-500" />, color: 'bg-gray-100' },
    { label: 'Total Orders', value: stats.Ordered, icon: <ShoppingCart className="text-blue-500" />, color: 'bg-blue-100' },
    { label: 'Total Received', value: stats.Received, icon: <Package className="text-orange-500" />, color: 'bg-orange-100' },
    { label: 'Total Paid', value: stats.Paid, icon: <CreditCard className="text-green-500" />, color: 'bg-green-100' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Procurement Dashboard</h1>
          <p className="text-gray-500">Monitor your P2P lifecycle overview.</p>
        </div>
        <button 
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors bg-white shadow-sm"
        >
          <RefreshCcw size={16} />
          Reset Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between hover:border-blue-200 transition-colors group">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-500" />
            Workflow Status Tracking
          </h2>
          <div className="flex items-center justify-between max-w-2xl mx-auto py-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 -z-0"></div>
            
            {[
              { label: 'Requisition', status: 'Requested' },
              { label: 'Order', status: 'Ordered' },
              { label: 'Goods Receipt', status: 'Received' },
              { label: 'Invoice', status: 'Invoiced' },
              { label: 'Payment', status: 'Paid' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-2 group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  stats[step.status] > 0 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' 
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  {i + 1}
                </div>
                <span className={`text-xs font-bold transition-colors ${
                  stats[step.status] > 0 ? 'text-blue-600' : 'text-gray-400'
                }`}>{step.label}</span>
                {stats[step.status] > 0 && (
                  <span className="absolute -top-4 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">
                    {stats[step.status]} items
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-xl shadow-lg text-white space-y-6">
          <h2 className="text-lg font-bold opacity-90 flex items-center gap-2">
            <CreditCard size={20} />
            Financial Summary
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-blue-200 text-sm font-medium uppercase">Total Spend (Paid)</p>
              <p className="text-4xl font-bold tracking-tight">${stats.TotalSpend.toLocaleString()}</p>
            </div>
            <div className="pt-6 border-t border-blue-500/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <Clock size={14} />
                  <span>Pending Orders</span>
                </div>
                <span className="font-bold">{stats.PendingOrders}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm opacity-80">
                  <Clock size={14} />
                  <span>Pending Invoices</span>
                </div>
                <span className="font-bold">{stats.PendingInvoices}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
