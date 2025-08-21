import React, { useState } from 'react';

interface CodeExampleProps {
    code: string;
    language?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({ code, language = 'tsx' }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <div className="w-full">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                    <span className="text-sm text-gray-300 font-medium">
                        {language.toUpperCase()}
                    </span>
                    <button
                        onClick={copyToClipboard}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Copy code"
                    >
                        {copied ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        )}
                    </button>
                </div>
                <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-100 font-mono leading-relaxed">
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodeExample;
