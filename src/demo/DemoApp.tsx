import React, { useState } from 'react';
import Dropdown from '../components/Dropdown';
import { DropdownOption } from '../types';
import CodeExample from './CodeExample';

const DemoApp: React.FC = () => {
    const [basicValue, setBasicValue] = useState<string>('');
    const [multipleValue, setMultipleValue] = useState<string[]>([]);
    const [searchableValue, setSearchableValue] = useState<string>('');
    const [customValue, setCustomValue] = useState<string>('');

    // Type-safe onChange handlers
    const handleBasicChange = (value: string | number | (string | number)[]) => {
        setBasicValue(value as string);
    };

    const handleMultipleChange = (value: string | number | (string | number)[]) => {
        setMultipleValue(value as string[]);
    };

    const handleSearchableChange = (value: string | number | (string | number)[]) => {
        setSearchableValue(value as string);
    };

    const handleCustomChange = (value: string | number | (string | number)[]) => {
        setCustomValue(value as string);
    };

    // Sample data
    const countries: DropdownOption[] = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'au', label: 'Australia' },
        { value: 'br', label: 'Brazil' },
        { value: 'in', label: 'India' },
        { value: 'cn', label: 'China' },
    ];

    const fruits: DropdownOption[] = [
        { value: 'apple', label: '🍎 Apple' },
        { value: 'banana', label: '🍌 Banana' },
        { value: 'orange', label: '🍊 Orange' },
        { value: 'grape', label: '🍇 Grape' },
        { value: 'strawberry', label: '🍓 Strawberry' },
        { value: 'mango', label: '🥭 Mango' },
        { value: 'pineapple', label: '🍍 Pineapple' },
        { value: 'watermelon', label: '🍉 Watermelon' },
    ];

    const technologies: DropdownOption[] = [
        { value: 'react', label: 'React', disabled: false },
        { value: 'vue', label: 'Vue.js', disabled: false },
        { value: 'angular', label: 'Angular', disabled: false },
        { value: 'svelte', label: 'Svelte', disabled: false },
        { value: 'nextjs', label: 'Next.js', disabled: false },
        { value: 'nuxt', label: 'Nuxt.js', disabled: false },
        { value: 'gatsby', label: 'Gatsby', disabled: false },
        { value: 'remix', label: 'Remix', disabled: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                React Dropdown Component
                            </h1>
                            <p className="mt-1 text-sm text-gray-500">
                                A comprehensive, customizable dropdown component for React
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/luxuary0054/react-dropdown-component"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                </svg>
                                GitHub
                            </a>
                            <a
                                href="https://luxuary0054.github.io/react-dropdown-component"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Storybook
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Features Overview */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Searchable</h3>
                            <p className="text-gray-600">Built-in search functionality with customizable search behavior</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Select</h3>
                            <p className="text-gray-600">Support for single and multiple selection modes</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M5 7h6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customizable</h3>
                            <p className="text-gray-600">Fully customizable styling and rendering options</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessible</h3>
                            <p className="text-gray-600">Full keyboard navigation and ARIA support</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Portal Support</h3>
                            <p className="text-gray-600">Render dropdown in portals to avoid z-index issues</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">TypeScript</h3>
                            <p className="text-gray-600">Built with TypeScript for better developer experience</p>
                        </div>
                    </div>
                </section>

                {/* Basic Dropdown */}
                <section className="mb-12 bg-white rounded-lg shadow-sm border p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Dropdown</h2>
                        <p className="text-gray-600">Simple single-select dropdown with default styling</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex items-start justify-center">
                            <div className="w-64">
                                <Dropdown
                                    options={countries}
                                    value={basicValue}
                                    onChange={handleBasicChange}
                                    placeholder="Select a country..."
                                />
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CodeExample
                                code={`const [value, setValue] = useState('');

<Dropdown
  options={countries}
  value={value}
  onChange={setValue}
  placeholder="Select a country..."
/>`}
                            />
                        </div>
                    </div>
                </section>

                {/* Multiple Selection */}
                <section className="mb-12 bg-white rounded-lg shadow-sm border p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Multiple Selection</h2>
                        <p className="text-gray-600">Select multiple options with chips display</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex items-start justify-center">
                            <div className="w-80">
                                <Dropdown
                                    options={fruits}
                                    value={multipleValue}
                                    onChange={handleMultipleChange}
                                    multiple={true}
                                    placeholder="Select fruits..."
                                    enableSelectAll={true}
                                    enableClear={true}
                                />
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CodeExample
                                code={`const [value, setValue] = useState([]);

<Dropdown
  options={fruits}
  value={value}
  onChange={setValue}
  multiple={true}
  placeholder="Select fruits..."
  enableSelectAll={true}
  enableClear={true}
/>`}
                            />
                        </div>
                    </div>
                </section>

                {/* Searchable Dropdown */}
                <section className="mb-12 bg-white rounded-lg shadow-sm border p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Searchable Dropdown</h2>
                        <p className="text-gray-600">Filter options by typing in the search box</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex items-start justify-center">
                            <div className="w-80">
                                <Dropdown
                                    options={technologies}
                                    value={searchableValue}
                                    onChange={handleSearchableChange}
                                    searchable={true}
                                    searchPlaceholder="Search technologies..."
                                    placeholder="Select a technology..."
                                />
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CodeExample
                                code={`const [value, setValue] = useState('');

<Dropdown
  options={technologies}
  value={value}
  onChange={setValue}
  searchable={true}
  searchPlaceholder="Search technologies..."
  placeholder="Select a technology..."
/>`}
                            />
                        </div>
                    </div>
                </section>

                {/* Custom Styling */}
                <section className="mb-12 bg-white rounded-lg shadow-sm border p-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Custom Styling</h2>
                        <p className="text-gray-600">Customize the appearance with CSS classes</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="flex items-start justify-center">
                            <div className="w-80">
                                <Dropdown
                                    options={countries}
                                    value={customValue}
                                    onChange={handleCustomChange}
                                    placeholder="Select with custom styling..."
                                    className="border-2 border-purple-300 rounded-lg"
                                    dropdownClassName="border-purple-300 shadow-xl"
                                    optionClassName="hover:bg-purple-50 hover:text-purple-900"
                                />
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CodeExample
                                code={`<Dropdown
  options={countries}
  value={value}
  onChange={setValue}
  placeholder="Select with custom styling..."
  className="border-2 border-purple-300 rounded-lg"
  dropdownClassName="border-purple-300 shadow-xl"
  optionClassName="hover:bg-purple-50 hover:text-purple-900"
/>`}
                            />
                        </div>
                    </div>
                </section>

                {/* Installation */}
                <section className="mt-16 bg-white rounded-lg shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Installation</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">NPM</h3>
                            <CodeExample
                                code="npm install react-dropdown-component"
                                language="bash"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Yarn</h3>
                            <CodeExample
                                code="yarn add react-dropdown-component"
                                language="bash"
                            />
                        </div>
                    </div>
                </section>

                {/* Usage */}
                <section className="mt-8 bg-white rounded-lg shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Usage</h2>
                    <CodeExample
                        code={`import { Dropdown } from 'react-dropdown-component';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select an option..."
    />
  );
}`}
                        language="tsx"
                    />
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-gray-300">
                            Made with by {' '}
                            <a
                                href="https://github.com/luxuary0054"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300"
                            >
                                Christian Suson
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default DemoApp;
