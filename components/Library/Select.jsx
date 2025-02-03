// src/components/ui/Select.jsx

import { useTheme } from 'next-themes';
const Select = ({ id, value, onChange, options }) => {
    const {theme} = useTheme();
    return (
    <select
    id={id}
      value={value}
       onChange={onChange}
      className={`border rounded px-4 py-2  focus:outline-none focus:ring-2
                 ${theme === 'dark' ? 'bg-gray-800 text-gray-100 focus:ring-gray-600' : 'bg-gray-100 text-gray-700  focus:ring-blue-400'} `}
         >
        {options.map(option => (
          <option key={option.value} value={option.value}>
              {option.label}
        </option>
       ))}
   </select>
    );
};
export { Select }