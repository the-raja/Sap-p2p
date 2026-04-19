import { useState } from 'react';
import { Search } from 'lucide-react';
import StatusBadge from './StatusBadge';

const DataTable = ({ columns, data, actions }) => {
  const [search, setSearch] = useState('');

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (val) =>
        val &&
        val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search records..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {filteredData.length} records found
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/80 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.length > 0 ? (
              filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/30 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                      {col.key === 'status' ? (
                        <StatusBadge status={row[col.key]} />
                      ) : col.key === 'price' || col.key === 'total' ? (
                        `$${Number(row[col.key]).toLocaleString()}`
                      ) : col.render ? (
                        col.render(row[col.key], row)
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-500 italic bg-white">
                  No records matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
