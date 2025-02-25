export interface FormSection {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    component: React.ReactNode;
  }
  
  export interface FormProps {
    register: any; // Replace with proper react-hook-form types if available
    watch: any;
    setValue: any;
    errors?: any;
  }
  
  export interface AddressProps extends FormProps {
    sameAsCurrent: boolean;
    setSameAsCurrent: (value: boolean) => void;
  }