import { create } from 'zustand';

export type Framework = 'react' | 'angular' | 'streamlit' | 'tkinter' | 'winui3';
export type ComponentState = 'default' | 'hover' | 'active' | 'focus' | 'disabled';
export type PreviewBackground = 'light' | 'dark' | 'checkered';

export interface StateStyles {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  boxShadow: string;
}

export interface ComponentConfig {
  // Content
  text: string;
  placeholder: string;
  label: string;
  
  // Typography
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: 'normal' | 'italic';
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  textDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  
  // Colors
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  opacity: number;
  
  // Spacing
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  gap: number;
  
  // Size & Layout
  width: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  
  // Display & Position
  display: 'block' | 'inline' | 'flex' | 'grid' | 'inline-block' | 'none';
  position: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  zIndex: number;
  
  // Borders
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  linkBorderRadius: boolean;
  
  // Shadows
  boxShadowX: number;
  boxShadowY: number;
  boxShadowBlur: number;
  boxShadowSpread: number;
  boxShadowColor: string;
  boxShadowInset: boolean;
  
  // Effects
  glassmorphism: boolean;
  glassBlur: number;
  glassOpacity: number;
  
  // Gradient
  useGradient: boolean;
  gradientType: 'linear' | 'radial';
  gradientAngle: number;
  gradientStart: string;
  gradientEnd: string;
  
  // Transitions
  transitionDuration: number;
  transitionEasing: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  
  // State Styles
  stateStyles: {
    hover: StateStyles;
    active: StateStyles;
    focus: StateStyles;
    disabled: StateStyles;
  };
  
  // Component-specific: Button
  buttonIcon: string;
  buttonIconPosition: 'left' | 'right';
  buttonLoading: boolean;
  buttonFullWidth: boolean;
  
  // Component-specific: Input
  inputType: 'text' | 'password' | 'email' | 'number' | 'search';
  inputIcon: string;
  inputRequired: boolean;
  inputValidationState: 'none' | 'error' | 'success';
  
  // Component-specific: Card
  cardImage: string;
  cardShowHeader: boolean;
  cardShowFooter: boolean;
  cardElevation: number;
  
  // Component-specific: Modal
  modalOverlayOpacity: number;
  modalCloseOnOverlay: boolean;
  modalAnimation: 'fade' | 'slide' | 'scale';
  
  // Visibility
  visible: boolean;
}

const defaultStateStyles: StateStyles = {
  backgroundColor: '',
  textColor: '',
  borderColor: '',
  boxShadow: '',
};

export const defaultComponentConfig: ComponentConfig = {
  text: 'Click Me',
  placeholder: 'Enter text...',
  label: 'Label',
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: 1.5,
  letterSpacing: 0,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'none',
  backgroundColor: '#3B82F6',
  textColor: '#FFFFFF',
  borderColor: '#3B82F6',
  opacity: 1,
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  paddingTop: 12,
  paddingRight: 24,
  paddingBottom: 12,
  paddingLeft: 24,
  gap: 8,
  width: 'auto',
  height: 'auto',
  minWidth: '',
  maxWidth: '',
  minHeight: '',
  maxHeight: '',
  display: 'flex',
  position: 'relative',
  zIndex: 0,
  borderWidth: 0,
  borderStyle: 'solid',
  borderRadius: 12,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  linkBorderRadius: true,
  boxShadowX: 0,
  boxShadowY: 2,
  boxShadowBlur: 4,
  boxShadowSpread: 0,
  boxShadowColor: 'rgba(0,0,0,0.1)',
  boxShadowInset: false,
  glassmorphism: false,
  glassBlur: 10,
  glassOpacity: 0.2,
  useGradient: false,
  gradientType: 'linear',
  gradientAngle: 135,
  gradientStart: '#3B82F6',
  gradientEnd: '#8B5CF6',
  transitionDuration: 200,
  transitionEasing: 'ease',
  stateStyles: {
    hover: { ...defaultStateStyles, backgroundColor: '#2563EB' },
    active: { ...defaultStateStyles, backgroundColor: '#1D4ED8' },
    focus: { ...defaultStateStyles, borderColor: '#60A5FA', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)' },
    disabled: { ...defaultStateStyles, backgroundColor: '#9CA3AF', textColor: '#6B7280' },
  },
  buttonIcon: '',
  buttonIconPosition: 'left',
  buttonLoading: false,
  buttonFullWidth: false,
  inputType: 'text',
  inputIcon: '',
  inputRequired: false,
  inputValidationState: 'none',
  cardImage: '',
  cardShowHeader: true,
  cardShowFooter: true,
  cardElevation: 2,
  modalOverlayOpacity: 0.5,
  modalCloseOnOverlay: true,
  modalAnimation: 'fade',
  visible: true,
};

interface CustomizationState {
  selectedCategory: string;
  selectedComponent: string;
  selectedFramework: Framework;
  showCodeView: boolean;
  codeViewOpen: boolean;
  activeState: ComponentState;
  previewBackground: PreviewBackground;
  componentConfig: ComponentConfig;
  
  setSelectedCategory: (category: string) => void;
  setSelectedComponent: (component: string) => void;
  setSelectedFramework: (framework: Framework) => void;
  toggleCodeView: () => void;
  setCodeViewOpen: (open: boolean) => void;
  setActiveState: (state: ComponentState) => void;
  setPreviewBackground: (bg: PreviewBackground) => void;
  updateComponentConfig: (updates: Partial<ComponentConfig>) => void;
  updateStateStyles: (state: keyof ComponentConfig['stateStyles'], updates: Partial<StateStyles>) => void;
  resetComponentConfig: () => void;
}

export const useCustomizationStore = create<CustomizationState>((set) => ({
  selectedCategory: 'Buttons',
  selectedComponent: 'Standard Button',
  selectedFramework: 'react',
  showCodeView: false,
  codeViewOpen: false,
  activeState: 'default',
  previewBackground: 'light',
  componentConfig: defaultComponentConfig,
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedComponent: (component) => set({ 
    selectedComponent: component,
    componentConfig: defaultComponentConfig, // Reset config when switching components
  }),
  setSelectedFramework: (framework) => set({ selectedFramework: framework }),
  toggleCodeView: () => set((state) => ({ showCodeView: !state.showCodeView })),
  setCodeViewOpen: (open) => set({ codeViewOpen: open }),
  setActiveState: (state) => set({ activeState: state }),
  setPreviewBackground: (bg) => set({ previewBackground: bg }),
  updateComponentConfig: (updates) =>
    set((state) => ({
      componentConfig: { ...state.componentConfig, ...updates },
    })),
  updateStateStyles: (stateName, updates) =>
    set((state) => ({
      componentConfig: {
        ...state.componentConfig,
        stateStyles: {
          ...state.componentConfig.stateStyles,
          [stateName]: { ...state.componentConfig.stateStyles[stateName], ...updates },
        },
      },
    })),
  resetComponentConfig: () => set({ componentConfig: defaultComponentConfig }),
}));
