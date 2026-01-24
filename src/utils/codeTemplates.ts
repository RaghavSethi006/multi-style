import { ComponentConfig } from '@/store/useCustomizationStore';

// Helper to compute box shadow string
const getBoxShadow = (config: ComponentConfig): string => {
  const inset = config.boxShadowInset ? 'inset ' : '';
  return `${inset}${config.boxShadowX}px ${config.boxShadowY}px ${config.boxShadowBlur}px ${config.boxShadowSpread}px ${config.boxShadowColor}`;
};

// Helper to compute background
const getBackground = (config: ComponentConfig): string => {
  if (config.useGradient) {
    return config.gradientType === 'linear'
      ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart}, ${config.gradientEnd})`
      : `radial-gradient(circle, ${config.gradientStart}, ${config.gradientEnd})`;
  }
  return config.backgroundColor;
};

// Helper to get border radius
const getBorderRadius = (config: ComponentConfig): string => {
  if (config.linkBorderRadius) {
    return `${config.borderRadius}px`;
  }
  return `${config.borderTopLeftRadius}px ${config.borderTopRightRadius}px ${config.borderBottomRightRadius}px ${config.borderBottomLeftRadius}px`;
};

export const generateReactCode = (config: ComponentConfig): string => {
  const hasIcon = config.buttonIcon && config.buttonIcon.length > 0;
  const iconImport = hasIcon ? `import { ${config.buttonIcon} } from 'lucide-react';\n` : '';
  
  const boxShadow = getBoxShadow(config);
  const background = getBackground(config);
  const borderRadius = getBorderRadius(config);

  return `${iconImport}const CustomButton = () => {
  return (
    <button
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
        background: '${background}',
        color: '${config.textColor}',
        border: '${config.borderWidth}px ${config.borderStyle} ${config.borderColor}',
        borderRadius: '${borderRadius}',
        padding: '${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px',
        margin: '${config.marginTop}px ${config.marginRight}px ${config.marginBottom}px ${config.marginLeft}px',
        width: '${config.buttonFullWidth ? '100%' : config.width}',
        height: '${config.height}',
        boxShadow: '${boxShadow}',
        opacity: ${config.opacity},
        cursor: 'pointer',
        display: '${config.display}',
        gap: '${config.gap}px',
        transition: 'all ${config.transitionDuration}ms ${config.transitionEasing}',
      }}
      className="inline-flex items-center justify-center"
    >
      ${hasIcon && config.buttonIconPosition === 'left' ? `<${config.buttonIcon} size={${config.fontSize}} className="mr-2" />` : ''}
      ${config.text}
      ${hasIcon && config.buttonIconPosition === 'right' ? `<${config.buttonIcon} size={${config.fontSize}} className="ml-2" />` : ''}
    </button>
  );
};

export default CustomButton;`;
};

export const generateAngularCode = (config: ComponentConfig): string => {
  const boxShadow = getBoxShadow(config);
  const background = getBackground(config);
  const borderRadius = getBorderRadius(config);

  return `<!-- component.html -->
<button
  [ngStyle]="{
    'font-family': '${config.fontFamily}',
    'font-size': '${config.fontSize}px',
    'font-weight': '${config.fontWeight}',
    'font-style': '${config.fontStyle}',
    'line-height': '${config.lineHeight}',
    'letter-spacing': '${config.letterSpacing}px',
    'text-align': '${config.textAlign}',
    'text-decoration': '${config.textDecoration}',
    'text-transform': '${config.textTransform}',
    'background': '${background}',
    'color': '${config.textColor}',
    'border': '${config.borderWidth}px ${config.borderStyle} ${config.borderColor}',
    'border-radius': '${borderRadius}',
    'padding': '${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px',
    'margin': '${config.marginTop}px ${config.marginRight}px ${config.marginBottom}px ${config.marginLeft}px',
    'width': '${config.buttonFullWidth ? '100%' : config.width}',
    'height': '${config.height}',
    'box-shadow': '${boxShadow}',
    'opacity': '${config.opacity}',
    'cursor': 'pointer',
    'display': '${config.display}',
    'gap': '${config.gap}px',
    'transition': 'all ${config.transitionDuration}ms ${config.transitionEasing}'
  }"
>
  ${config.buttonIcon && config.buttonIconPosition === 'left' ? `<mat-icon>${config.buttonIcon}</mat-icon>` : ''}
  ${config.text}
  ${config.buttonIcon && config.buttonIconPosition === 'right' ? `<mat-icon>${config.buttonIcon}</mat-icon>` : ''}
</button>

<!-- component.ts -->
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './component.html',
})
export class CustomButtonComponent {}`;
};

export const generateStreamlitCode = (config: ComponentConfig): string => {
  const boxShadow = getBoxShadow(config);
  const background = getBackground(config);
  const borderRadius = getBorderRadius(config);

  return `import streamlit as st

# Custom CSS for the button
st.markdown("""
<style>
.custom-button {
    font-family: '${config.fontFamily}';
    font-size: ${config.fontSize}px;
    font-weight: ${config.fontWeight};
    font-style: ${config.fontStyle};
    line-height: ${config.lineHeight};
    letter-spacing: ${config.letterSpacing}px;
    text-align: ${config.textAlign};
    text-decoration: ${config.textDecoration};
    text-transform: ${config.textTransform};
    background: ${background};
    color: ${config.textColor};
    border: ${config.borderWidth}px ${config.borderStyle} ${config.borderColor};
    border-radius: ${borderRadius};
    padding: ${config.paddingTop}px ${config.paddingRight}px ${config.paddingBottom}px ${config.paddingLeft}px;
    margin: ${config.marginTop}px ${config.marginRight}px ${config.marginBottom}px ${config.marginLeft}px;
    width: ${config.buttonFullWidth ? '100%' : config.width};
    height: ${config.height};
    box-shadow: ${boxShadow};
    opacity: ${config.opacity};
    cursor: pointer;
    transition: all ${config.transitionDuration}ms ${config.transitionEasing};
}

.custom-button:hover {
    background: ${config.stateStyles.hover.backgroundColor || background};
    color: ${config.stateStyles.hover.textColor || config.textColor};
}
</style>
""", unsafe_allow_html=True)

# Button
if st.button("${config.text}", key="custom_button"):
    st.write("Button clicked!")`;
};

export const generateTkinterCode = (config: ComponentConfig): string => {
  // Convert hex to RGB for Tkinter
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `#${result[1]}${result[2]}${result[3]}` : hex;
  };

  return `import tkinter as tk
from tkinter import ttk

class CustomButton:
    def __init__(self, parent):
        self.button = tk.Button(
            parent,
            text="${config.text}",
            font=("${config.fontFamily}", ${Math.round(config.fontSize * 0.75)}),
            bg="${hexToRgb(config.backgroundColor)}",
            fg="${hexToRgb(config.textColor)}",
            activebackground="${hexToRgb(config.stateStyles.active.backgroundColor || config.backgroundColor)}",
            activeforeground="${hexToRgb(config.stateStyles.active.textColor || config.textColor)}",
            relief="flat",
            borderwidth=${config.borderWidth},
            padx=${config.paddingLeft},
            pady=${config.paddingTop},
            cursor="hand2"
        )
        
        # Hover effect
        self.button.bind("<Enter>", self.on_enter)
        self.button.bind("<Leave>", self.on_leave)
    
    def on_enter(self, e):
        self.button.config(bg="${hexToRgb(config.stateStyles.hover.backgroundColor || config.backgroundColor)}")
    
    def on_leave(self, e):
        self.button.config(bg="${hexToRgb(config.backgroundColor)}")

# Usage
root = tk.Tk()
root.title("Custom Button")
btn = CustomButton(root)
btn.button.pack(padx=20, pady=20)
root.mainloop()`;
};

export const generateWinUI3Code = (config: ComponentConfig): string => {
  return `<!-- XAML -->
<Button
    Content="${config.text}"
    FontFamily="${config.fontFamily}"
    FontSize="${config.fontSize}"
    FontWeight="${config.fontWeight === 700 ? 'Bold' : config.fontWeight === 500 ? 'Medium' : 'Normal'}"
    FontStyle="${config.fontStyle === 'italic' ? 'Italic' : 'Normal'}"
    Foreground="${config.textColor}"
    Background="${config.backgroundColor}"
    BorderBrush="${config.borderColor}"
    BorderThickness="${config.borderWidth}"
    CornerRadius="${config.borderRadius}"
    Padding="${config.paddingLeft},${config.paddingTop},${config.paddingRight},${config.paddingBottom}"
    Margin="${config.marginLeft},${config.marginTop},${config.marginRight},${config.marginBottom}"
    Width="${config.buttonFullWidth ? 'Auto' : config.width}"
    Height="${config.height}"
    Opacity="${config.opacity}"
    HorizontalAlignment="Center"
    VerticalAlignment="Center">
    <Button.Resources>
        <Style TargetType="Button">
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="Button">
                        <Grid>
                            <VisualStateManager.VisualStateGroups>
                                <VisualStateGroup x:Name="CommonStates">
                                    <VisualState x:Name="Normal"/>
                                    <VisualState x:Name="PointerOver">
                                        <Storyboard>
                                            <ColorAnimation 
                                                Storyboard.TargetName="ButtonBackground"
                                                Storyboard.TargetProperty="(Border.Background).(SolidColorBrush.Color)"
                                                To="${config.stateStyles.hover.backgroundColor || config.backgroundColor}"
                                                Duration="0:0:0.${config.transitionDuration}"/>
                                        </Storyboard>
                                    </VisualState>
                                </VisualStateGroup>
                            </VisualStateManager.VisualStateGroups>
                            <Border x:Name="ButtonBackground"
                                Background="{TemplateBinding Background}"
                                BorderBrush="{TemplateBinding BorderBrush}"
                                BorderThickness="{TemplateBinding BorderThickness}"
                                CornerRadius="${config.borderRadius}">
                                <ContentPresenter
                                    HorizontalAlignment="Center"
                                    VerticalAlignment="Center"/>
                            </Border>
                        </Grid>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
        </Style>
    </Button.Resources>
</Button>`;
};
