import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from '../src';
import type { DropdownOption } from '../src/types';

// Mock options as specified
const mockOptions: DropdownOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option with icon' },
    { value: 'option3', label: 'Long Long Option 3' },
    { value: 'option4', label: 'Long Long Long Option 4' },
    { value: 'option5', label: 'Long Long Long Long Option 5' },
    { value: 'option6', label: 'Long Long Long Long Long Option 6' },
];

const meta: Meta<typeof Dropdown> = {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        // 1. Searchable Dropdown
        searchable: {
            control: 'boolean',
            description: 'Enable search functionality within the dropdown',
            defaultValue: false,
        },
        searchPlaceholder: {
            control: 'text',
            description: 'Placeholder text for search input',
            defaultValue: 'Search options...',
        },

        // 2. Portal Support
        usePortal: {
            control: 'boolean',
            description: 'Render dropdown in a portal to avoid overflow issues',
            defaultValue: false,
        },

        // 3. Single or Multiple Selection
        multiple: {
            control: 'boolean',
            description: 'Enable multiple option selection',
            defaultValue: false,
        },

        // 4. Customizable Option Rendering (using renderOption)
        renderOption: {
            control: 'boolean',
            description: 'Enable custom option rendering with icons',
            defaultValue: false,
        },

        // 5. Search Filtering (controlled by searchable)
        // This is handled by the searchable control above

        // 6. Toggle Features
        enableClear: {
            control: 'boolean',
            description: 'Show clear button to reset selection',
            defaultValue: false,
        },
        enableSelectAll: {
            control: 'boolean',
            description: 'Show select all option (only for multiple selection)',
            defaultValue: false,
        },

        // 7. Z-Index Compatibility
        zIndex: {
            control: { type: 'number', min: 1, max: 9999, step: 1 },
            description: 'Z-index for the dropdown menu (default: 1000)',
            defaultValue: 1000,
        },

        // Additional controls
        placeholder: {
            control: 'text',
            description: 'Placeholder text when no option is selected',
            defaultValue: 'Select an option...',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the dropdown',
            defaultValue: false,
        },
        className: {
            control: 'text',
            description: 'Custom CSS classes for the dropdown container',
            defaultValue: 'w-80',
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Main story with all controls
export const SelectDropdownField: Story = {
    render: (args) => {
        const [value, setValue] = useState<string | number | (string | number)[]>(args.multiple ? [] : '');
        const [searchValue, setSearchValue] = useState<string>('');

        // Create options with custom rendering if enabled
        const options = args.renderOption
            ? mockOptions.map((option, index) => ({
                ...option,
                icon: ['🍎', '⭐', '🚀', '💎', '🌟', '🎯'][index] || '📌'
            }))
            : mockOptions;

        // Custom option renderer
        const renderOption = args.renderOption
            ? (option: DropdownOption, isSelected: boolean, isHighlighted: boolean) => (
                <div
                    className={`
                        px-3 py-2 text-sm transition-colors flex items-center gap-2
                        ${isHighlighted ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'}
                        ${isSelected ? 'bg-blue-50 text-blue-900' : 'text-gray-900'}
                    `}
                >
                    <span className="text-lg">{option.icon}</span>
                    <span>{option.label}</span>
                    {isSelected && <span className="ml-auto text-blue-600">✓</span>}
                </div>
            )
            : undefined;

        return (
            <div className="flex w-full justify-between items-center space-x-36 min-w-[95vw]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <Dropdown
                    {...args}
                    options={options}
                    value={value}
                    onChange={(val) => setValue(val)}
                    searchValue={searchValue}
                    onSearchChange={setSearchValue}
                    renderOption={renderOption}
                    className='flex-1'
                />

                {/* Z-index test overlay */}
                {args.zIndex > 1000 && (
                    <div
                        className="absolute inset-0 bg-red-500 opacity-20 pointer-events-none"
                        style={{ zIndex: args.zIndex - 1 }}
                    >
                        <div className="p-4 text-white">
                            Test overlay with z-index {args.zIndex - 1}
                        </div>
                    </div>
                )}
            </div>
        );
    },
    args: {
        options: mockOptions,
        placeholder: 'Select an option...',
        searchable: false,
        searchPlaceholder: 'Search options...',
        usePortal: false,
        multiple: false,
        renderOption: false,
        enableClear: false,
        enableSelectAll: false,
        zIndex: 1000,
        disabled: false,
        className: 'w-80',
    },
    decorators: [
        (Story) => (
            <div className="relative" style={{ minHeight: '400px' }}>
                <Story />
            </div>
        ),
    ],
};
