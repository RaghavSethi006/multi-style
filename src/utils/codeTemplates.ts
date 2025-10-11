import { ButtonConfig } from '@/store/useCustomizationStore';

export const generateReactCode = (config: ButtonConfig): string => {
  const iconImports = [];
  if (config.prefixIcon) iconImports.push(config.prefixIcon);
  if (config.suffixIcon) iconImports.push(config.suffixIcon);

  const iconImportStatement =
    iconImports.length > 0
      ? `import { ${iconImports.join(', ')} } from 'lucide-react';\n`
      : '';

  const animationClass = config.animation !== 'none' ? ` animate-${config.animation}` : '';

  return `${iconImportStatement}
const CustomButton = () => {
  return (
    <button
      className="transition-all${animationClass}"
      style={{
        fontFamily: '${config.fontFamily}',
        fontSize: '${config.fontSize}px',
        fontWeight: ${config.fontWeight},
        backgroundColor: '${config.backgroundColor}',
        color: '${config.textColor}',
        border: '${config.borderWidth}px solid ${config.borderColor}',
        borderRadius: '${config.borderRadius}px',
        padding: '${config.padding}px ${config.padding * 2}px',
        width: '${config.width}px',
        height: '${config.height}px',
        boxShadow: '0 ${config.elevation}px ${config.elevation * 2}px rgba(0,0,0,0.1)',
        cursor: ${config.disabledState ? "'not-allowed'" : "'pointer'"},
        opacity: ${config.disabledState ? 0.5 : 1},
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
      }}
      ${config.disabledState ? 'disabled' : ''}
    >
      ${config.prefixIcon ? `<${config.prefixIcon} size={20} />` : ''}
      {${JSON.stringify(config.text)}}
      ${config.suffixIcon ? `<${config.suffixIcon} size={20} />` : ''}
    </button>
  );
};

export default CustomButton;`;
};

export const generateAngularCode = (config: ButtonConfig): string => {
  return `<!-- custom-button.component.html -->
<button
  class="custom-button${config.animation !== 'none' ? ` ${config.animation}` : ''}"
  [disabled]="${config.disabledState}"
  [ngStyle]="{
    'font-family': '${config.fontFamily}',
    'font-size': '${config.fontSize}px',
    'font-weight': ${config.fontWeight},
    'background-color': '${config.backgroundColor}',
    'color': '${config.textColor}',
    'border': '${config.borderWidth}px solid ${config.borderColor}',
    'border-radius': '${config.borderRadius}px',
    'padding': '${config.padding}px ${config.padding * 2}px',
    'width': '${config.width}px',
    'height': '${config.height}px',
    'box-shadow': '0 ${config.elevation}px ${config.elevation * 2}px rgba(0,0,0,0.1)',
    'cursor': ${config.disabledState ? "'not-allowed'" : "'pointer'"},
    'opacity': ${config.disabledState ? 0.5 : 1}
  }"
>
  ${config.prefixIcon ? `<mat-icon>${config.prefixIcon.toLowerCase()}</mat-icon>` : ''}
  ${config.text}
  ${config.suffixIcon ? `<mat-icon>${config.suffixIcon.toLowerCase()}</mat-icon>` : ''}
</button>

<!-- custom-button.component.ts -->
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent {}`;
};

export const generateStreamlitCode = (config: ButtonConfig): string => {
  return `import streamlit as st

# Custom button with Streamlit
if st.button(
    "${config.text}",
    key="custom_button",
    help="Custom styled button",
    disabled=${config.disabledState}
):
    st.write("Button clicked!")

# Add custom CSS styling
st.markdown("""
<style>
.stButton > button {
    font-family: ${config.fontFamily};
    font-size: ${config.fontSize}px;
    font-weight: ${config.fontWeight};
    background-color: ${config.backgroundColor};
    color: ${config.textColor};
    border: ${config.borderWidth}px solid ${config.borderColor};
    border-radius: ${config.borderRadius}px;
    padding: ${config.padding}px ${config.padding * 2}px;
    width: ${config.width}px;
    height: ${config.height}px;
    box-shadow: 0 ${config.elevation}px ${config.elevation * 2}px rgba(0,0,0,0.1);
    cursor: ${config.disabledState ? 'not-allowed' : 'pointer'};
    opacity: ${config.disabledState ? 0.5 : 1};
    transition: all 0.3s ease;
}

.stButton > button:hover {
    ${config.hoverEffect ? `transform: translateY(-2px);\n    box-shadow: 0 ${config.elevation + 2}px ${(config.elevation + 2) * 2}px rgba(0,0,0,0.15);` : ''}
}
</style>
""", unsafe_allow_html=True)`;
};

export const generateTkinterCode = (config: ButtonConfig): string => {
  return `import tkinter as tk
from tkinter import ttk

class CustomButton:
    def __init__(self, parent):
        self.button = tk.Button(
            parent,
            text="${config.text}",
            font=("${config.fontFamily}", ${config.fontSize}, "${config.fontWeight >= 600 ? 'bold' : 'normal'}"),
            bg="${config.backgroundColor}",
            fg="${config.textColor}",
            activebackground="${config.backgroundColor}",
            activeforeground="${config.textColor}",
            relief=tk.FLAT,
            borderwidth=${config.borderWidth},
            highlightthickness=0,
            cursor="${config.disabledState ? 'arrow' : 'hand2'}",
            state="${config.disabledState ? 'disabled' : 'normal'}",
            width=${Math.floor(config.width / 8)},
            height=${Math.floor(config.height / 20)},
            padx=${config.padding * 2},
            pady=${config.padding},
            command=self.on_click
        )
        
        ${config.hoverEffect ? `self.button.bind('<Enter>', self.on_hover)
        self.button.bind('<Leave>', self.on_leave)` : ''}
    
    def on_click(self):
        print("Button clicked!")
    
    ${config.hoverEffect ? `def on_hover(self, event):
        self.button.config(bg="${lightenColor(config.backgroundColor)}")
    
    def on_leave(self, event):
        self.button.config(bg="${config.backgroundColor}")` : ''}

# Usage
root = tk.Tk()
root.title("Custom Button")
custom_btn = CustomButton(root)
custom_btn.button.pack(padx=20, pady=20)
root.mainloop()`;
};

export const generateWinUI3Code = (config: ButtonConfig): string => {
  return `<!-- CustomButton.xaml -->
<Button
    x:Name="CustomButton"
    Content="${config.text}"
    Width="${config.width}"
    Height="${config.height}"
    IsEnabled="${!config.disabledState}"
    CornerRadius="${config.borderRadius}"
    Padding="${config.padding},${config.padding}"
    FontFamily="${config.fontFamily}"
    FontSize="${config.fontSize}"
    FontWeight="${config.fontWeight >= 600 ? 'Bold' : 'Normal'}"
    Background="${config.backgroundColor}"
    Foreground="${config.textColor}"
    BorderBrush="${config.borderColor}"
    BorderThickness="${config.borderWidth}">
    
    <Button.Resources>
        <Style TargetType="Button">
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="Button">
                        <Grid>
                            <Border
                                x:Name="RootBorder"
                                Background="{TemplateBinding Background}"
                                BorderBrush="{TemplateBinding BorderBrush}"
                                BorderThickness="{TemplateBinding BorderThickness}"
                                CornerRadius="{TemplateBinding CornerRadius}"
                                Padding="{TemplateBinding Padding}">
                                
                                <ContentPresenter
                                    HorizontalAlignment="Center"
                                    VerticalAlignment="Center"/>
                                
                                <Border.Shadow>
                                    <ThemeShadow />
                                </Border.Shadow>
                            </Border>
                            
                            <VisualStateManager.VisualStateGroups>
                                <VisualStateGroup x:Name="CommonStates">
                                    ${config.hoverEffect ? `<VisualState x:Name="PointerOver">
                                        <VisualState.Setters>
                                            <Setter Target="RootBorder.Translation" Value="0,-2,8"/>
                                        </VisualState.Setters>
                                    </VisualState>` : ''}
                                </VisualStateGroup>
                            </VisualStateManager.VisualStateGroups>
                        </Grid>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
        </Style>
    </Button.Resources>
</Button>`;
};

// Helper function for color manipulation (placeholder)
// In production, would use a proper color library
const lightenColor = (color: string): string => {
  return color;
};
