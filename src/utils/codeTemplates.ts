import { ComponentConfig } from '@/store/useCustomizationStore';

export const generateReactCode = (config: ComponentConfig): string => {
  const iconImports = [];
  if (config.prefixIcon) iconImports.push(config.prefixIcon);
  if (config.suffixIcon) iconImports.push(config.suffixIcon);

  const iconImportStatement =
    iconImports.length > 0
      ? `import { ${iconImports.join(', ')} } from 'lucide-react';\n`
      : '';

  return `${iconImportStatement}
const CustomComponent = () => {
  return (
    <button
      className="transition-all"
      style={{
        fontFamily: '${config.fontFamily}',
        fontSize: '${config.fontSize}px',
        fontWeight: ${config.fontWeight},
        fontStyle: '${config.fontStyle}',
        lineHeight: ${config.lineHeight},
        letterSpacing: '${config.letterSpacing}px',
        textAlign: '${config.textAlign}',
        textDecoration: '${config.textDecoration}',
        textTransform: '${config.textTransform}',
        backgroundColor: '${config.backgroundColor}',
        color: '${config.textColor}',
        border: '${config.borderWidth}px ${config.borderStyle} ${config.borderColor}',
        borderRadius: '${config.borderRadius}px',
        padding: '${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px',
        margin: '${config.marginTop}px ${config.marginRight}px ${config.marginBottom}px ${config.marginLeft}px',
        width: '${config.width}',
        height: '${config.height}',
        minWidth: '${config.minWidth}',
        maxWidth: '${config.maxWidth}',
        minHeight: '${config.minHeight}',
        maxHeight: '${config.maxHeight}',
        boxShadow: '${config.boxShadow}',
        textShadow: '${config.textShadow}',
        opacity: ${config.opacity},
        cursor: ${config.disabledState ? "'not-allowed'" : "'pointer'"},
        display: '${config.display}',
        position: '${config.position}',
        top: '${config.top}',
        left: '${config.left}',
        right: '${config.right}',
        bottom: '${config.bottom}',
        zIndex: ${config.zIndex},
        flexDirection: '${config.flexDirection}',
        justifyContent: '${config.justifyContent}',
        alignItems: '${config.alignItems}',
        gap: '${config.gap}px',
        transition: '${config.transitionProperty} ${config.transitionDuration}ms ${config.transitionTimingFunction} ${config.transitionDelay}ms',
        backgroundImage: '${config.gradient || config.backgroundImage}',
        backgroundPosition: '${config.backgroundPosition}',
        backgroundRepeat: '${config.backgroundRepeat}',
        backgroundSize: '${config.backgroundSize}',
        backgroundAttachment: '${config.backgroundAttachment}',
      }}
      ${config.disabledState ? 'disabled' : ''}
    >
      ${config.prefixIcon ? `<${config.prefixIcon} size={20} />` : ''}
      {${JSON.stringify(config.text)}}
      ${config.suffixIcon ? `<${config.suffixIcon} size={20} />` : ''}
    </button>
  );
};

export default CustomComponent;`;
};

export const generateAngularCode = (config: ComponentConfig): string => {
  return `<!-- custom-component.component.html -->
<button
  class="custom-button"
  [disabled]="${config.disabledState}"
  [ngStyle]="{
    'font-family': '${config.fontFamily}',
    'font-size': '${config.fontSize}px',
    'font-weight': ${config.fontWeight},
    'font-style': '${config.fontStyle}',
    'line-height': ${config.lineHeight},
    'letter-spacing': '${config.letterSpacing}px',
    'text-align': '${config.textAlign}',
    'text-decoration': '${config.textDecoration}',
    'text-transform': '${config.textTransform}',
    'background-color': '${config.backgroundColor}',
    'color': '${config.textColor}',
    'border': '${config.borderWidth}px ${config.borderStyle} ${config.borderColor}',
    'border-radius': '${config.borderRadius}px',
    'padding': '${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px',
    'margin': '${config.marginTop}px ${config.marginRight}px ${config.marginBottom}px ${config.marginLeft}px',
    'width': '${config.width}',
    'height': '${config.height}',
    'box-shadow': '${config.boxShadow}',
    'opacity': ${config.opacity},
    'cursor': ${config.disabledState ? "'not-allowed'" : "'pointer'"},
    'display': '${config.display}',
    'position': '${config.position}',
    'z-index': ${config.zIndex}
  }"
>
  ${config.prefixIcon ? `<mat-icon>${config.prefixIcon.toLowerCase()}</mat-icon>` : ''}
  ${config.text}
  ${config.suffixIcon ? `<mat-icon>${config.suffixIcon.toLowerCase()}</mat-icon>` : ''}
</button>

<!-- custom-component.component.ts -->
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.css']
})
export class CustomComponentComponent {}`;
};

export const generateStreamlitCode = (config: ComponentConfig): string => {
  return `import streamlit as st

# Custom component with Streamlit
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
    font-style: ${config.fontStyle};
    line-height: ${config.lineHeight};
    letter-spacing: ${config.letterSpacing}px;
    text-align: ${config.textAlign};
    text-decoration: ${config.textDecoration};
    text-transform: ${config.textTransform};
    background-color: ${config.backgroundColor};
    color: ${config.textColor};
    border: ${config.borderWidth}px ${config.borderStyle} ${config.borderColor};
    border-radius: ${config.borderRadius}px;
    padding: ${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px;
    width: ${config.width};
    height: ${config.height};
    box-shadow: ${config.boxShadow};
    cursor: ${config.disabledState ? 'not-allowed' : 'pointer'};
    opacity: ${config.opacity};
    transition: all ${config.transitionDuration}ms ${config.transitionTimingFunction};
}

.stButton > button:hover {
    ${config.hoverEffect ? `transform: translateY(-2px);` : ''}
}
</style>
""", unsafe_allow_html=True)`;
};

export const generateTkinterCode = (config: ComponentConfig): string => {
  return `import tkinter as tk
from tkinter import ttk

class CustomComponent:
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
            padx=${config.paddingLeft},
            pady=${config.paddingTop},
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
root.title("Custom Component")
custom_btn = CustomComponent(root)
custom_btn.button.pack(padx=20, pady=20)
root.mainloop()`;
};

export const generateWinUI3Code = (config: ComponentConfig): string => {
  return `<!-- CustomComponent.xaml -->
<Button
    x:Name="CustomButton"
    Content="${config.text}"
    Width="${config.width}"
    Height="${config.height}"
    IsEnabled="${!config.disabledState}"
    CornerRadius="${config.borderRadius}"
    Padding="${config.paddingLeft},${config.paddingTop},${config.paddingRight},${config.paddingBottom}"
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

const lightenColor = (color: string): string => {
  return color;
};
