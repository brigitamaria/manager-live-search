import { useEffect, useState, useRef } from 'react';
import { MappedEmployeeWithEmail } from '../../types';
import Avatar from '../Avatar';
import chevronDown from '../../assets/chevron-down.svg';

import './inputAutocomplete.scss'

type InputAutocompleteProps = {
    data: MappedEmployeeWithEmail[]
}

const cn = "input-autocomplete";

const InputAutocomplete = ({
    data
}: InputAutocompleteProps) => {
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredResult, setFilteredResult] = useState(data);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            setShowDropdown(false);
          }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase();

        setFilteredResult(data.filter(({ firstName, lastName, name }) => {
            return name.toLowerCase().includes(lowerCaseQuery) ||
            `${firstName}${lastName}`.toLowerCase().includes(lowerCaseQuery)
        }))
    }, [query]);

    const handleSelect = (employee: MappedEmployeeWithEmail) => {
        setQuery(employee.name);
        setShowDropdown(false);
    }

    return (
        <div className={cn}>
            <label htmlFor="search">Select manager using dropdown:</label>
            <div className={`${cn}__input-wrapper`}>
                <input 
                    ref={inputRef}
                    type="text" 
                    id="search" 
                    autoComplete="off" 
                    placeholder="Select Manager"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    onFocus={() => { setShowDropdown(true); }}
                />
                <img 
                    src={chevronDown} 
                    alt="" 
                    width={16} 
                    height={16}
                    className={`${cn}__chevron ${showDropdown? 'up' : 'down'}`}
                />
            </div>

            {showDropdown && filteredResult.length === 0 && query.length > 0 && (
                <p>Zero result match your query. Please try to change your query.</p>
            )}

            <ul className={`${cn}__opts ${showDropdown && filteredResult.length > 0 ? '' : 'hide'}`}>
                {filteredResult.map((datum) => {
                    const { id, firstName, lastName, name, email, jobLevel } = datum;
                    return (
                        <li key={id} onClick={() => { handleSelect(datum); }}>
                            <Avatar
                                initials={`${firstName.charAt(0)}${lastName.charAt(0)}`}
                                jobLevel={jobLevel}
                            />
                            <div>
                                <p className={`${cn}__name`}>{name}</p>
                                <p className={`${cn}__email`}>{email}</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
};

export default InputAutocomplete;