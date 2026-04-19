'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal, Command } from 'lucide-react';
import { useNotification } from './NotificationProvider';

const T_CODES = {
  '/DB': '/dashboard',
  'ME51N': '/requisition',
  'ME21N': '/orders',
  'MIGO': '/goods-receipt',
  'MIRO': '/invoice',
  'F-53': '/payment',
};

const CommandBar = () => {
  const [input, setInput] = useState('');
  const router = useRouter();
  const { addNotification } = useNotification();

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.toUpperCase().trim();
    
    if (T_CODES[cmd]) {
      router.push(T_CODES[cmd]);
      addNotification(`Navigating to ${cmd}`, 'info');
      setInput('');
    } else {
      addNotification(`Invalid T-Code: ${cmd}`, 'error');
    }
  };

  return (
    <div className="px-4 py-3 border-b border-gray-700 bg-gray-800/50">
      <form onSubmit={handleCommand} className="relative group">
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-400 transition-colors">
          <Terminal size={14} />
        </div>
        <input 
          type="text" 
          placeholder="Enter T-Code (e.g. ME51N)"
          className="w-full bg-gray-900 border border-gray-700 rounded px-8 py-1.5 text-xs text-blue-400 font-mono focus:outline-none focus:border-blue-500 placeholder:text-gray-600"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <Command size={12} className="text-gray-600" />
        </div>
      </form>
    </div>
  );
};

export default CommandBar;
