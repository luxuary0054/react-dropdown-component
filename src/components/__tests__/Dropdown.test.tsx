/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from '../Dropdown';
import type { DropdownOption } from '../../types';

const mockOptions: DropdownOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option with icon' },
    { value: 'option3', label: 'Long Long Option 3' },
    { value: 'option4', label: 'Long Long Long Option 4' },
    { value: 'option5', label: 'Long Long Long Long Option 5' },
    { value: 'option6', label: 'Long Long Long Long Long Option 6' },
    { value: 'disabled', label: 'Disabled Option', disabled: true },
];

describe('Dropdown Component', () => {
    const defaultProps = {
        options: mockOptions,
        onChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders with placeholder', () => {
        render(<Dropdown {...defaultProps} placeholder="Select fruit" />);
        expect(screen.getByText('Select fruit')).toBeInTheDocument();
    });

    it('opens dropdown on click', async () => {
        render(<Dropdown {...defaultProps} />);
        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);

        await waitFor(() => {
            expect(screen.getByText('Option 1')).toBeInTheDocument();
            expect(screen.getByText('Option with icon')).toBeInTheDocument();
            expect(screen.getByText('Long Long Option 3')).toBeInTheDocument();
        });
    });

    it('selects single option', async () => {
        render(<Dropdown {...defaultProps} />);
        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);

        await waitFor(() => {
            fireEvent.click(screen.getByText('Option 1'));
        });

        expect(defaultProps.onChange).toHaveBeenCalledWith('option1');
    });

    it('supports multiple selection', async () => {
        render(<Dropdown {...defaultProps} multiple={true} />);
        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);

        await waitFor(() => {
            fireEvent.click(screen.getByText('Option 1'));
            fireEvent.click(screen.getByText('Option with icon'));
        });

        expect(defaultProps.onChange).toHaveBeenCalledWith(['option1', 'option2']);
    });

    it('filters options when searchable', async () => {
        render(<Dropdown {...defaultProps} searchable={true} />);
        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);

        await waitFor(() => {
            const searchInput = screen.getByPlaceholderText('Search...');
            fireEvent.change(searchInput, { target: { value: 'Option 1' } });
        });

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.queryByText('Option with icon')).not.toBeInTheDocument();
    });

    it('disables dropdown when disabled prop is true', () => {
        render(<Dropdown {...defaultProps} disabled={true} />);
        const trigger = screen.getByRole('combobox');

        expect(trigger).toHaveAttribute('tabindex', '-1');
    });

    it('handles disabled options', async () => {
        render(<Dropdown {...defaultProps} />);
        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);

        await waitFor(() => {
            const disabledOption = screen.getByText('Disabled Option');
            expect(disabledOption).toHaveClass('opacity-50');
        });
    });

    it('supports keyboard navigation', async () => {
        render(<Dropdown {...defaultProps} />);
        const trigger = screen.getByRole('combobox');

        // Open dropdown with Enter
        fireEvent.keyDown(trigger, { key: 'Enter' });

        await waitFor(() => {
            expect(screen.getByText('Option 1')).toBeInTheDocument();
        });

        // Navigate with arrow keys to second option
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        fireEvent.keyDown(trigger, { key: 'ArrowDown' });
        fireEvent.keyDown(trigger, { key: 'Enter' });

        expect(defaultProps.onChange).toHaveBeenCalledWith('option2');
    });

    it('closes dropdown on Escape key', async () => {
        render(<Dropdown {...defaultProps} />);
        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);

        await waitFor(() => {
            expect(screen.getByText('Option 1')).toBeInTheDocument();
        });

        fireEvent.keyDown(trigger, { key: 'Escape' });

        await waitFor(() => {
            expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        });
    });

    it('supports custom option renderer', async () => {
        const renderOption = jest.fn((option) => (
            <div data-testid={`option-${option.value}`}>{option.label}</div>
        ));

        render(<Dropdown {...defaultProps} renderOption={renderOption} />);
        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);

        await waitFor(() => {
            expect(screen.getByTestId('option-option1')).toBeInTheDocument();
            expect(renderOption).toHaveBeenCalled();
        });
    });

    it('supports custom selected renderer', () => {
        const renderSelected = jest.fn((selectedOptions) => (
            <div data-testid="custom-selected">
                {selectedOptions.map(opt => opt.label).join(', ')}
            </div>
        ));

        render(
            <Dropdown
                {...defaultProps}
                renderSelected={renderSelected}
                value="option1"
            />
        );

        expect(screen.getByTestId('custom-selected')).toBeInTheDocument();
        expect(renderSelected).toHaveBeenCalled();
    });

    it('handles controlled search value', async () => {
        const onSearchChange = jest.fn();

        render(
            <Dropdown
                {...defaultProps}
                searchable={true}
                searchValue="test"
                onSearchChange={onSearchChange}
            />
        );

        const trigger = screen.getByRole('combobox');
        fireEvent.click(trigger);

        await waitFor(() => {
            const searchInput = screen.getByDisplayValue('test');
            expect(searchInput).toBeInTheDocument();
        });
    });

    it('supports select all functionality', async () => {
        render(
            <Dropdown
                {...defaultProps}
                multiple={true}
                enableSelectAll={true}
            />
        );

        const trigger = screen.getByRole('combobox');
        fireEvent.click(trigger);

        await waitFor(() => {
            const selectAllButton = screen.getByText('Select All');
            fireEvent.click(selectAllButton);
        });

        expect(defaultProps.onChange).toHaveBeenCalledWith(['option1', 'option2', 'option3', 'option4', 'option5', 'option6']);
    });

    it('supports clear functionality', async () => {
        render(
            <Dropdown
                {...defaultProps}
                multiple={true}
                enableClear={true}
                value={['option1', 'option2']}
            />
        );

        const trigger = screen.getByRole('combobox');
        fireEvent.click(trigger);

        await waitFor(() => {
            const clearButton = screen.getByText('Clear');
            fireEvent.click(clearButton);
        });

        expect(defaultProps.onChange).toHaveBeenCalledWith([]);
    });

    it('calls onOpen and onClose callbacks', async () => {
        const onOpen = jest.fn();
        const onClose = jest.fn();

        render(
            <Dropdown
                {...defaultProps}
                onOpen={onOpen}
                onClose={onClose}
            />
        );

        const trigger = screen.getByRole('combobox');

        fireEvent.click(trigger);
        expect(onOpen).toHaveBeenCalled();

        fireEvent.keyDown(trigger, { key: 'Escape' });
        expect(onClose).toHaveBeenCalled();
    });
});
