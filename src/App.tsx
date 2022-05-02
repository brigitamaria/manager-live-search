import { useEffect, useState } from 'react';
import InputAutocomplete from './ui/components/InputAutocomplete';
import { MappedEmployeeWithEmail } from './ui/types';
import { getEmployees } from './datasource';
import { mapEmployeesWithAccountEmail } from './helpers/mapEmployeesWithAccountEmail';

import './App.scss';

function App() {
  const [employees, setEmployees] = useState<MappedEmployeeWithEmail[]>([])

  useEffect(() => {
    getEmployees().then((res) => {
      setEmployees(mapEmployeesWithAccountEmail(res))
    });
  }, [])

  return (
    <div className="App">
      <InputAutocomplete data={employees} />
    </div>
  );
}

export default App;
