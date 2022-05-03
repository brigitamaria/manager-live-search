import { useEffect, useState } from 'react';
import InputAutocomplete from './ui/components/InputAutocomplete';
import { MappedEmployeeWithEmail } from './ui/types';
import { getEmployees } from './datasource';
import { mapEmployeesWithAccountEmail } from './helpers/mapEmployeesWithAccountEmail';

import './App.scss';

function App() {
  const [employees, setEmployees] = useState<MappedEmployeeWithEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getEmployees()
      .then((res) => {
        setLoading(false);
        setEmployees(mapEmployeesWithAccountEmail(res));
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [])

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : (
        <>
        {error ? 
          <p>An Error Occured. Please try again later.</p>
          : <InputAutocomplete data={employees} />
        }
        </>
      )}
    </div>
  );
}

export default App;
