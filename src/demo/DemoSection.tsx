import React from 'react';

interface DemoSectionProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const DemoSection: React.FC<DemoSectionProps> = ({ title, description, children }) => {
    return (
        <section className="mb-12 bg-white rounded-lg shadow-sm border p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex items-start justify-center">
                    {children}
                </div>
                <div className="flex items-start">
                    {/* Code example will be rendered here by parent */}
                </div>
            </div>
        </section>
    );
};

export default DemoSection;
