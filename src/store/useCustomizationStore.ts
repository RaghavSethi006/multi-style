import { create } from 'zustand';

export type Framework = 'react' | 'angular' | 'streamlit' | 'tkinter' | 'winui3';

export interface ComponentConfig {
  // Content
  text: string;
  placeholder?: string;
  label?: string;
  
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
  top: string;
  left: string;
  right: string;
  bottom: string;
  zIndex: number;
  
  // Borders
  borderWidth: number;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  
  // Shadows
  boxShadow: string;
  textShadow: string;
  
  // Backgrounds
  backgroundImage: string;
  backgroundPosition: string;
  backgroundRepeat: 'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y';
  backgroundSize: 'auto' | 'cover' | 'contain';
  backgroundAttachment: 'scroll' | 'fixed';
  gradient: string;
  
  // Flexbox
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  alignContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'stretch';
  flexGrow: number;
  flexShrink: number;
  order: number;
  
  // Grid
  gridTemplateColumns: string;
  gridTemplateRows: string;
  gridGap: number;
  
  // Transitions & Animations
  transitionProperty: string;
  transitionDuration: number;
  transitionDelay: number;
  transitionTimingFunction: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  animation: string;
  animationDuration: number;
  animationIterationCount: number | 'infinite';
  animationTimingFunction: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  animationDirection: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  animationFillMode: 'none' | 'forwards' | 'backwards' | 'both';
  
  // Component-specific
  prefixIcon?: string;
  suffixIcon?: string;
  variant?: string;
  type?: string;
  options?: string[];
  rows?: number;
  columns?: number;
  
  // States
  hoverEffect: boolean;
  focusEffect: boolean;
  disabledState: boolean;
}

interface CustomizationState {
  selectedCategory: string;
  selectedComponent: string;
  selectedFramework: Framework;
  showCodeView: boolean;
  componentConfig: ComponentConfig;
  setSelectedCategory: (category: string) => void;
  setSelectedComponent: (component: string) => void;
  setSelectedFramework: (framework: Framework) => void;
  toggleCodeView: () => void;
  updateComponentConfig: (updates: Partial<ComponentConfig>) => void;
  resetComponentConfig: () => void;
}

const defaultComponentConfig: ComponentConfig = {
  text: 'Click Me',
  placeholder: '',
  label: '',
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
  top: '',
  left: '',
  right: '',
  bottom: '',
  zIndex: 0,
  borderWidth: 0,
  borderStyle: 'solid',
  borderRadius: 12,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  textShadow: '',
  backgroundImage: '',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundAttachment: 'scroll',
  gradient: '',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'stretch',
  flexGrow: 0,
  flexShrink: 1,
  order: 0,
  gridTemplateColumns: '',
  gridTemplateRows: '',
  gridGap: 0,
  transitionProperty: 'all',
  transitionDuration: 300,
  transitionDelay: 0,
  transitionTimingFunction: 'ease',
  animation: 'none',
  animationDuration: 1,
  animationIterationCount: 1,
  animationTimingFunction: 'ease',
  animationDirection: 'normal',
  animationFillMode: 'none',
  prefixIcon: '',
  suffixIcon: '',
  variant: 'primary',
  type: 'button',
  options: [],
  rows: 3,
  columns: 3,
  hoverEffect: true,
  focusEffect: true,
  disabledState: false,
};

export const useCustomizationStore = create<CustomizationState>((set) => ({
  selectedCategory: 'Buttons',
  selectedComponent: 'Standard Button',
  selectedFramework: 'react',
  showCodeView: false,
  componentConfig: defaultComponentConfig,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  setSelectedFramework: (framework) => set({ selectedFramework: framework }),
  toggleCodeView: () => set((state) => ({ showCodeView: !state.showCodeView })),
  updateComponentConfig: (updates) =>
    set((state) => ({
      componentConfig: { ...state.componentConfig, ...updates },
    })),
  resetComponentConfig: () => set({ componentConfig: defaultComponentConfig }),
}));
