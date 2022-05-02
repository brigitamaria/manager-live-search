import React, { useEffect, useState, useRef } from 'react';
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
    const [selectedManager, setSelectedManager] = useState<MappedEmployeeWithEmail | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
            hideDropdown();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase();

        setFilteredResult(data.filter(({ firstName, lastName, name }) => {
            return name.toLowerCase().includes(lowerCaseQuery) ||
            `${firstName}${lastName}`.toLowerCase().includes(lowerCaseQuery)
        }));
    }, [data, query]);

    const hideDropdown = () => {
        setShowDropdown(false);

        const currentActiveOpt = document.querySelector(`.${cn}__opt.active`);
        currentActiveOpt && currentActiveOpt.classList.remove('active');
    }

    const handleSelect = (employee: MappedEmployeeWithEmail) => {
        setSelectedManager(employee);
        setQuery(employee.name);
        hideDropdown();
    }

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        const currentActiveOpt = document.querySelector(`.${cn}__opt.active`);

        const activateElToView = (targetEl: ChildNode | Element | null) => {
            (targetEl as HTMLElement).scrollIntoView();
            (targetEl as HTMLElement).classList.add('active');
        }

        const handleMoveActiveElement = ( 
            currentActiveEl: Element | null,
            targetedActiveEl: ChildNode | null | undefined,
            defaultActiveEl: Element | null
        ) => {
            if (currentActiveEl) {
                currentActiveEl.classList.remove('active');
                if (targetedActiveEl) {
                    activateElToView(targetedActiveEl)
                } else {
                    activateElToView(defaultActiveEl);
                }
            } else {
                activateElToView(defaultActiveEl)
            }
        };

        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                handleMoveActiveElement(
                    currentActiveOpt, 
                    currentActiveOpt?.previousSibling, 
                    document.querySelector(`.${cn}__opt:last-of-type`)
                );
                break;

            case "ArrowDown":
                e.preventDefault();
                handleMoveActiveElement(
                    currentActiveOpt, 
                    currentActiveOpt?.nextSibling, 
                    document.querySelector(`.${cn}__opt`)
                );
                break;

            case "Enter":
                if (currentActiveOpt) {
                    const employeeId = currentActiveOpt.id;
                    const matchEmployee = filteredResult.find((res) => res.id === employeeId);
                    handleSelect(matchEmployee!);
                    inputRef.current?.blur();
                }
                break;

            case "Escape":
                inputRef.current?.blur();
                hideDropdown();
                break;

            default:
                break;
        }
    };

    const handleKeyDown = (employee: MappedEmployeeWithEmail) => (e: React.KeyboardEvent) => {
        const handleMoveFocusElement = (
            currentActiveEl: Element | null,
            targetedActiveEl: ChildNode | null | undefined,
            defaultFallbackEl: HTMLElement | null
        ) => {
            if (currentActiveEl) {
                if (targetedActiveEl) {
                    (targetedActiveEl as HTMLElement).focus();
                } else {
                    defaultFallbackEl?.focus();
                }
            }
        }
        switch (e.key) {
            case "ArrowUp":
                e.preventDefault();
                handleMoveFocusElement(
                    document.activeElement, 
                    document.activeElement?.previousSibling,
                    document.querySelector(`.${cn}__opt:last-of-type`)
                );
                break;

            case "ArrowDown":
                e.preventDefault();
                handleMoveFocusElement(
                    document.activeElement, 
                    document.activeElement?.nextSibling,
                    document.querySelector(`.${cn}__opt`)
                );
                break;

            case "Enter":
                e.preventDefault();
                handleSelect(employee);
                break;

            case "Escape":
                hideDropdown();
                break;

            default:
                break;
        }
    };

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
                        setShowDropdown(true);
                        setSelectedManager(null);
                        setQuery(e.target.value);
                    }}
                    onFocus={() => { setShowDropdown(true); }}
                    aria-haspopup="listbox"
                    onKeyDown={handleInputKeyDown}
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

            <ul 
                className={`${cn}__opts ${showDropdown && filteredResult.length > 0 ? '' : 'hide'}`} 
                tabIndex={-1}
                role="listbox"
                aria-activedescendant={selectedManager?.id}
            >
                {filteredResult.map((datum) => {
                    const { id, firstName, lastName, name, email, jobLevel } = datum;
                    return (
                        <li 
                            className={`${cn}__opt`}
                            tabIndex={0} 
                            key={id} 
                            id={id}
                            onClick={() => { handleSelect(datum); }}
                            role="option"
                            aria-selected={selectedManager?.id === id}
                            aria-owns={id}
                            onKeyDown={handleKeyDown(datum)}
                        >
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