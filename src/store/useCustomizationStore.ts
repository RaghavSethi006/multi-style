import { create } from 'zustand';

export type Framework = 'react' | 'angular' | 'streamlit' | 'tkinter' | 'winui3';

export interface ButtonConfig {
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  padding: number;
  width: number;
  height: number;
  elevation: number;
  prefixIcon: string;
  suffixIcon: string;
  hoverEffect: boolean;
  focusEffect: boolean;
  disabledState: boolean;
  animation: 'none' | 'hover-glow' | 'pulse' | 'bounce';
}

interface CustomizationState {
  selectedCategory: string;
  selectedComponent: string;
  selectedFramework: Framework;
  showCodeView: boolean;
  buttonConfig: ButtonConfig;
  setSelectedCategory: (category: string) => void;
  setSelectedComponent: (component: string) => void;
  setSelectedFramework: (framework: Framework) => void;
  toggleCodeView: () => void;
  updateButtonConfig: (updates: Partial<ButtonConfig>) => void;
  resetButtonConfig: () => void;
}

const defaultButtonConfig: ButtonConfig = {
  text: 'Click Me',
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 500,
  backgroundColor: '#3B82F6',
  textColor: '#FFFFFF',
  borderColor: '#3B82F6',
  borderWidth: 0,
  borderRadius: 12,
  padding: 12,
  width: 140,
  height: 48,
  elevation: 2,
  prefixIcon: '',
  suffixIcon: '',
  hoverEffect: true,
  focusEffect: true,
  disabledState: false,
  animation: 'hover-glow',
};

export const useCustomizationStore = create<CustomizationState>((set) => ({
  selectedCategory: 'Buttons',
  selectedComponent: 'Standard Button',
  selectedFramework: 'react',
  showCodeView: false,
  buttonConfig: defaultButtonConfig,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  setSelectedFramework: (framework) => set({ selectedFramework: framework }),
  toggleCodeView: () => set((state) => ({ showCodeView: !state.showCodeView })),
  updateButtonConfig: (updates) =>
    set((state) => ({
      buttonConfig: { ...state.buttonConfig, ...updates },
    })),
  resetButtonConfig: () => set({ buttonConfig: defaultButtonConfig }),
}));
