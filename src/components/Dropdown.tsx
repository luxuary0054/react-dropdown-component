import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { DropdownProps, DropdownOption, DropdownState } from '../types';

const Dropdown: React.FC<DropdownProps> = ({
    options = [],
    value,
    onChange,
    placeholder = 'Select an option...',
    disabled = false,
    multiple = false,
    searchable = false,
    searchPlaceholder = 'Search...',
    searchValue: externalSearchValue,
    onSearchChange,
    usePortal = false,
    portalContainer,
    renderOption,
    renderSelected,
    enableSearch = true,
    enableClear = true,
    enableSelectAll = false,
    className = '',
    dropdownClassName = '',
    optionClassName = '',
    selectedOptionClassName = '',
    zIndex = 1001,
    onOpen,
    onClose,
    onFocus,
    onBlur,
    id,
    name,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
}) => {
    const [state, setState] = useState<DropdownState>({
        isOpen: false,
        searchValue: '',
        highlightedIndex: -1,
        selectedOptions: [],
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Controlled vs uncontrolled search value
    const searchValue = externalSearchValue !== undefined ? externalSearchValue : state.searchValue;

    // Initialize selected options from value prop
    useEffect(() => {
        if (value !== undefined) {
            const selectedOpts = multiple
                ? options.filter(opt => Array.isArray(value) && value.includes(opt.value))
                : options.filter(opt => opt.value === value);
            setState(prev => ({ ...prev, selectedOptions: selectedOpts }));
        }
    }, [value, options, multiple]);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
        if (!searchable || !searchValue) return options;
        return options.filter(option =>
            option.label.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [options, searchable, searchValue]);

    // Handle search value change
    const handleSearchChange = useCallback((newSearchValue: string) => {
        if (onSearchChange) {
            onSearchChange(newSearchValue);
        } else {
            setState(prev => ({ ...prev, searchValue: newSearchValue, highlightedIndex: -1 }));
        }
    }, [onSearchChange]);

    // Handle option selection
    const handleOptionSelect = useCallback((option: DropdownOption) => {
        if (option.disabled) return;

        let newSelectedOptions: DropdownOption[];
        let newValue: string | number | (string | number)[];

        if (multiple) {
            const isSelected = state.selectedOptions.some(opt => opt.value === option.value);
            if (isSelected) {
                newSelectedOptions = state.selectedOptions.filter(opt => opt.value !== option.value);
            } else {
                newSelectedOptions = [...state.selectedOptions, option];
            }
            newValue = newSelectedOptions.map(opt => opt.value);
        } else {
            newSelectedOptions = [option];
            newValue = option.value;
            setState(prev => ({ ...prev, isOpen: false }));
        }

        setState(prev => ({ ...prev, selectedOptions: newSelectedOptions }));
        onChange?.(newValue);
    }, [multiple, state.selectedOptions, onChange]);

    // Handle select all
    const handleSelectAll = useCallback(() => {
        const enabledOptions = filteredOptions.filter(opt => !opt.disabled);
        const newValue = enabledOptions.map(opt => opt.value);
        setState(prev => ({ ...prev, selectedOptions: enabledOptions }));
        onChange?.(newValue);
    }, [filteredOptions, onChange]);

    // Handle clear all
    const handleClear = useCallback(() => {
        setState(prev => ({ ...prev, selectedOptions: [] }));
        onChange?.(multiple ? [] : '');
    }, [multiple, onChange]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (!state.isOpen) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setState(prev => ({ ...prev, isOpen: true }));
                onOpen?.();
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setState(prev => ({
                    ...prev,
                    highlightedIndex: Math.min(prev.highlightedIndex + 1, filteredOptions.length - 1)
                }));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setState(prev => ({
                    ...prev,
                    highlightedIndex: Math.max(prev.highlightedIndex - 1, -1)
                }));
                break;
            case 'Enter':
                e.preventDefault();
                if (state.highlightedIndex >= 0) {
                    handleOptionSelect(filteredOptions[state.highlightedIndex]);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setState(prev => ({ ...prev, isOpen: false }));
                onClose?.();
                break;
        }
    }, [state.isOpen, state.highlightedIndex, filteredOptions, handleOptionSelect, onOpen, onClose]);

    // Handle click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setState(prev => ({ ...prev, isOpen: false }));
                onClose?.();
            }
        };

        if (state.isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [state.isOpen, onClose]);

    // Focus management
    useEffect(() => {
        if (state.isOpen && searchable && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [state.isOpen, searchable]);

    // Toggle dropdown
    const toggleDropdown = useCallback(() => {
        if (disabled) return;
        setState(prev => ({ ...prev, isOpen: !prev.isOpen }));
        if (!state.isOpen) {
            onOpen?.();
        } else {
            onClose?.();
        }
    }, [disabled, state.isOpen, onOpen, onClose]);

    // Default option renderer
    const defaultRenderOption = (option: DropdownOption, isSelected: boolean, isHighlighted: boolean) => (
        <div
            className={`
        px-3 py-2 cursor-pointer text-sm transition-colors
        ${isHighlighted ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}
        ${isSelected ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
        ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${optionClassName}
      `}
            onClick={() => handleOptionSelect(option)}
        >
            {option.label}
        </div>
    );

    // Default selected renderer
    const defaultRenderSelected = (selectedOptions: DropdownOption[]) => {
        if (selectedOptions.length === 0) {
            return <span className="text-gray-500">{placeholder}</span>;
        }

        if (multiple) {
            return (
                <div className="flex flex-wrap gap-1">
                    {selectedOptions.map((option, index) => (
                        <span
                            key={option.value}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                        >
                            {option.label}
                            <button
                                type="button"
                                className="ml-1 text-blue-600 hover:text-blue-800"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleOptionSelect(option);
                                }}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            );
        }

        return <span className="text-gray-900">{selectedOptions[0].label}</span>;
    };

    // Dropdown content
    const dropdownContent = (
        <CSSTransition
            in={state.isOpen}
            timeout={200}
            classNames={{
                enter: 'opacity-0 transform -translate-y-2',
                enterActive: 'opacity-100 transform translate-y-0 transition-all duration-200',
                exit: 'opacity-100 transform translate-y-0',
                exitActive: 'opacity-0 transform -translate-y-2 transition-all duration-200',
            }}
            unmountOnExit
        >
            <div
                ref={dropdownRef}
                className={`
          absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg
          max-h-60 overflow-auto z-50
          ${dropdownClassName}
        `}
                style={{ zIndex }}
            >
                {/* Search input */}
                {searchable && enableSearch && (
                    <div className="p-2 border-b border-gray-200">
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder={searchPlaceholder}
                            value={searchValue}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                {/* Select All / Clear buttons */}
                {multiple && (enableSelectAll || enableClear) && (
                    <div className="flex justify-between p-2 border-b border-gray-200">
                        {enableSelectAll && (
                            <button
                                type="button"
                                onClick={handleSelectAll}
                                className="text-sm text-blue-600 hover:text-blue-800"
                            >
                                Select All
                            </button>
                        )}
                        {enableClear && state.selectedOptions.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                )}

                {/* Options list */}
                <div className="py-1">
                    {filteredOptions.length === 0 ? (
                        <div className="px-3 py-2 text-sm text-gray-500">No options found</div>
                    ) : (
                        filteredOptions.map((option, index) => {
                            const isSelected = state.selectedOptions.some(opt => opt.value === option.value);
                            const isHighlighted = index === state.highlightedIndex;

                            return (
                                <div key={option.value}>
                                    {renderOption
                                        ? (
                                            <div onClick={() => handleOptionSelect(option)}>
                                                {renderOption(option, isSelected, isHighlighted)}
                                            </div>
                                        )
                                        : defaultRenderOption(option, isSelected, isHighlighted)
                                    }
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </CSSTransition>
    );

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            id={id}
        >
            {/* Hidden input for form compatibility */}
            <input
                ref={inputRef}
                type="hidden"
                name={name}
                value={multiple ? (Array.isArray(value) ? value.join(',') : '') : String(value || '')}
            />

            {/* Main trigger button */}
            <div
                className={`
          relative w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm
          cursor-pointer transition-colors
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-gray-400'}
          ${state.isOpen ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50' : ''}
        `}
                onClick={toggleDropdown}
                onKeyDown={handleKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                tabIndex={disabled ? -1 : 0}
                role="combobox"
                aria-expanded={state.isOpen}
                aria-haspopup="listbox"
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
            >
                {/* Selected value display */}
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        {renderSelected
                            ? renderSelected(state.selectedOptions)
                            : defaultRenderSelected(state.selectedOptions)
                        }
                    </div>

                    {/* Dropdown arrow */}
                    <div className="ml-2 flex-shrink-0">
                        <svg
                            className={`w-4 h-4 text-gray-400 transition-transform ${state.isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Dropdown menu */}
            {usePortal && portalContainer
                ? createPortal(dropdownContent, portalContainer)
                : dropdownContent
            }
        </div>
    );
};

export default Dropdown;
