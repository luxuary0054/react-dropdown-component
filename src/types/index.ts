export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  [key: string]: any;
}

export interface DropdownProps {
  // Basic props
  options: DropdownOption[];
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
  
  // Selection mode
  multiple?: boolean;
  
  // Search functionality
  searchable?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (searchValue: string) => void;
  
  // Portal support
  usePortal?: boolean;
  portalContainer?: HTMLElement;
  
  // Customization
  renderOption?: (option: DropdownOption, isSelected: boolean, isHighlighted: boolean) => React.ReactNode;
  renderSelected?: (selectedOptions: DropdownOption[]) => React.ReactNode;
  
  // Toggle features
  enableSearch?: boolean;
  enableClear?: boolean;
  enableSelectAll?: boolean;
  
  // Styling
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  selectedOptionClassName?: string;
  
  // Z-index
  zIndex?: number;
  
  // Callbacks
  onOpen?: () => void;
  onClose?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  
  // Accessibility
  id?: string;
  name?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface DropdownState {
  isOpen: boolean;
  searchValue: string;
  highlightedIndex: number;
  selectedOptions: DropdownOption[];
}
