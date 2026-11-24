import { useCustomizationStore, type ComponentConfig } from '@/store/useCustomizationStore';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { AVAILABLE_ICON_NAMES } from '@/lib/icons';

const inputFieldClass =
  'w-full px-3 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring';

export const ComponentSpecificPanel = () => {
  const { selectedComponent, componentConfig, updateComponentConfig } = useCustomizationStore();

  const renderCommaListEditor = (
    id: string,
    label: string,
    items: string[],
    onChange: (next: string[]) => void
  ) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <input
        id={id}
        type="text"
        value={items.join(', ')}
        onChange={(e) =>
          onChange(
            e.target.value
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          )
        }
        placeholder="Comma-separated items"
        className={inputFieldClass}
      />
      <p className="text-xs text-muted-foreground">Separate items with commas</p>
    </div>
  );

  const renderButtonOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {selectedComponent} Options
      </h4>

      {selectedComponent !== 'Toggle Button' && (
        <div className="space-y-2">
          <Label htmlFor="btn-icon" className="text-sm font-medium">
            Icon
          </Label>
          <select
            id="btn-icon"
            value={componentConfig.buttonIcon}
            onChange={(e) => updateComponentConfig({ buttonIcon: e.target.value })}
            className={inputFieldClass}
          >
            <option value="">No Icon</option>
            {AVAILABLE_ICON_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedComponent === 'Icon Button' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="icon-btn-shape" className="text-sm font-medium">
              Shape
            </Label>
            <select
              id="icon-btn-shape"
              value={componentConfig.iconButtonShape}
              onChange={(e) =>
                updateComponentConfig({ iconButtonShape: e.target.value as 'square' | 'circle' })
              }
              className={inputFieldClass}
            >
              <option value="square">Square</option>
              <option value="circle">Circle</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon-btn-tooltip" className="text-sm font-medium">
              Tooltip Text
            </Label>
            <input
              id="icon-btn-tooltip"
              type="text"
              value={componentConfig.iconButtonTooltip}
              onChange={(e) => updateComponentConfig({ iconButtonTooltip: e.target.value })}
              className={inputFieldClass}
            />
          </div>
        </>
      )}

      {selectedComponent === 'FAB Button' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="fab-position" className="text-sm font-medium">
              Position
            </Label>
            <select
              id="fab-position"
              value={componentConfig.fabPosition}
              onChange={(e) =>
                updateComponentConfig({
                  fabPosition: e.target.value as ComponentConfig['fabPosition'],
                })
              }
              className={inputFieldClass}
            >
              <option value="bottom-right">Bottom Right</option>
              <option value="bottom-left">Bottom Left</option>
              <option value="top-right">Top Right</option>
              <option value="top-left">Top Left</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="fab-extended" className="text-sm font-medium">
              Extended Label
            </Label>
            <Switch
              id="fab-extended"
              checked={componentConfig.fabExtended}
              onCheckedChange={(checked) => updateComponentConfig({ fabExtended: checked })}
            />
          </div>
        </>
      )}

      {selectedComponent === 'Toggle Button' && (
        <>
          <div className="flex items-center justify-between">
            <Label htmlFor="toggle-selected" className="text-sm font-medium">
              Selected State
            </Label>
            <Switch
              id="toggle-selected"
              checked={componentConfig.toggleSelected}
              onCheckedChange={(checked) => updateComponentConfig({ toggleSelected: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="toggle-on-label" className="text-sm font-medium">
              On Label
            </Label>
            <input
              id="toggle-on-label"
              type="text"
              value={componentConfig.toggleOnLabel}
              onChange={(e) => updateComponentConfig({ toggleOnLabel: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="toggle-off-label" className="text-sm font-medium">
              Off Label
            </Label>
            <input
              id="toggle-off-label"
              type="text"
              value={componentConfig.toggleOffLabel}
              onChange={(e) => updateComponentConfig({ toggleOffLabel: e.target.value })}
              className={inputFieldClass}
            />
          </div>
        </>
      )}

      {(selectedComponent === 'Standard Button' || selectedComponent === 'Outline Button') && (
        <>
          {componentConfig.buttonIcon && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Icon Position</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateComponentConfig({ buttonIconPosition: 'left' })}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    componentConfig.buttonIconPosition === 'left'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Left
                </button>
                <button
                  type="button"
                  onClick={() => updateComponentConfig({ buttonIconPosition: 'right' })}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    componentConfig.buttonIconPosition === 'right'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Right
                </button>
              </div>
            </div>
          )}

          {selectedComponent === 'Standard Button' && (
            <div className="flex items-center justify-between">
              <Label htmlFor="btn-loading" className="text-sm font-medium">
                Loading State
              </Label>
              <Switch
                id="btn-loading"
                checked={componentConfig.buttonLoading}
                onCheckedChange={(checked) => updateComponentConfig({ buttonLoading: checked })}
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <Label htmlFor="btn-full-width" className="text-sm font-medium">
              Full Width
            </Label>
            <Switch
              id="btn-full-width"
              checked={componentConfig.buttonFullWidth}
              onCheckedChange={(checked) => updateComponentConfig({ buttonFullWidth: checked })}
            />
          </div>
        </>
      )}
    </div>
  );

  const renderTextOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {selectedComponent} Options
      </h4>

      {selectedComponent === 'Heading' && (
        <div className="space-y-2">
          <Label htmlFor="heading-level" className="text-sm font-medium">
            Heading Level
          </Label>
          <select
            id="heading-level"
            value={componentConfig.headingLevel}
            onChange={(e) =>
              updateComponentConfig({ headingLevel: Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6 })
            }
            className={inputFieldClass}
          >
            {[1, 2, 3, 4, 5, 6].map((lvl) => (
              <option key={lvl} value={lvl}>
                H{lvl}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedComponent === 'Label' && (
        <div className="flex items-center justify-between">
          <Label htmlFor="label-required" className="text-sm font-medium">
            Required Indicator (*)
          </Label>
          <Switch
            id="label-required"
            checked={componentConfig.inputRequired}
            onCheckedChange={(checked) => updateComponentConfig({ inputRequired: checked })}
          />
        </div>
      )}

      {selectedComponent === 'Blockquote' && (
        <div className="space-y-2">
          <Label htmlFor="quote-author" className="text-sm font-medium">
            Author Attribution
          </Label>
          <input
            id="quote-author"
            type="text"
            value={componentConfig.blockquoteAuthor}
            onChange={(e) => updateComponentConfig({ blockquoteAuthor: e.target.value })}
            className={inputFieldClass}
          />
        </div>
      )}

      {(selectedComponent === 'Code Block' || selectedComponent === 'Code Editor') && (
        <>
          <div className="space-y-2">
            <Label htmlFor="code-lang" className="text-sm font-medium">
              Language
            </Label>
            <select
              id="code-lang"
              value={componentConfig.codeLanguage}
              onChange={(e) => updateComponentConfig({ codeLanguage: e.target.value })}
              className={inputFieldClass}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="code-content" className="text-sm font-medium">
              Code Content
            </Label>
            <textarea
              id="code-content"
              rows={5}
              value={componentConfig.codeContent}
              onChange={(e) => updateComponentConfig({ codeContent: e.target.value })}
              className={`${inputFieldClass} font-mono text-xs`}
            />
          </div>
        </>
      )}
    </div>
  );

  const renderInputOptions = () => {
    if (selectedComponent === 'Range Slider') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Range Slider Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="slider-label" className="text-sm font-medium">
              Label
            </Label>
            <input
              id="slider-label"
              type="text"
              value={componentConfig.label}
              onChange={(e) => updateComponentConfig({ label: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <Label htmlFor="slider-min" className="text-xs text-muted-foreground">
                Min
              </Label>
              <input
                id="slider-min"
                type="number"
                value={componentConfig.sliderMin}
                onChange={(e) => updateComponentConfig({ sliderMin: Number(e.target.value) })}
                className={inputFieldClass}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="slider-max" className="text-xs text-muted-foreground">
                Max
              </Label>
              <input
                id="slider-max"
                type="number"
                value={componentConfig.sliderMax}
                onChange={(e) => updateComponentConfig({ sliderMax: Number(e.target.value) })}
                className={inputFieldClass}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="slider-step" className="text-xs text-muted-foreground">
                Step
              </Label>
              <input
                id="slider-step"
                type="number"
                min={1}
                value={componentConfig.sliderStep}
                onChange={(e) => updateComponentConfig({ sliderStep: Math.max(1, Number(e.target.value)) })}
                className={inputFieldClass}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Current Value</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.sliderValue}</span>
            </div>
            <Slider
              value={[componentConfig.sliderValue]}
              onValueChange={([value]) => updateComponentConfig({ sliderValue: value })}
              min={componentConfig.sliderMin}
              max={componentConfig.sliderMax}
              step={componentConfig.sliderStep}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="slider-show-val" className="text-sm font-medium">
              Show Value
            </Label>
            <Switch
              id="slider-show-val"
              checked={componentConfig.sliderShowValue}
              onCheckedChange={(checked) => updateComponentConfig({ sliderShowValue: checked })}
            />
          </div>
        </div>
      );
    }

    if (selectedComponent === 'File Upload') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            File Upload Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="file-label" className="text-sm font-medium">
              Label
            </Label>
            <input
              id="file-label"
              type="text"
              value={componentConfig.label}
              onChange={(e) => updateComponentConfig({ label: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="file-accept" className="text-sm font-medium">
              Accepted Types
            </Label>
            <input
              id="file-accept"
              type="text"
              value={componentConfig.fileAccept}
              onChange={(e) => updateComponentConfig({ fileAccept: e.target.value })}
              placeholder="image/*,.pdf"
              className={inputFieldClass}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="file-multiple" className="text-sm font-medium">
              Allow Multiple
            </Label>
            <Switch
              id="file-multiple"
              checked={componentConfig.fileMultiple}
              onCheckedChange={(checked) => updateComponentConfig({ fileMultiple: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="file-dnd" className="text-sm font-medium">
              Drag & Drop Hint
            </Label>
            <Switch
              id="file-dnd"
              checked={componentConfig.fileDragDrop}
              onCheckedChange={(checked) => updateComponentConfig({ fileDragDrop: checked })}
            />
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Color Picker') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Color Picker Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="color-picker-label" className="text-sm font-medium">
              Label
            </Label>
            <input
              id="color-picker-label"
              type="text"
              value={componentConfig.label}
              onChange={(e) => updateComponentConfig({ label: e.target.value })}
              className={inputFieldClass}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Input Options
        </h4>

        <div className="space-y-2">
          <Label htmlFor="input-placeholder" className="text-sm font-medium">
            Placeholder
          </Label>
          <input
            id="input-placeholder"
            type="text"
            value={componentConfig.placeholder}
            onChange={(e) => updateComponentConfig({ placeholder: e.target.value })}
            className={inputFieldClass}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="input-label" className="text-sm font-medium">
            Label
          </Label>
          <input
            id="input-label"
            type="text"
            value={componentConfig.label}
            onChange={(e) => updateComponentConfig({ label: e.target.value })}
            className={inputFieldClass}
          />
        </div>

        {selectedComponent === 'Text Field' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="input-type" className="text-sm font-medium">
                Input Type
              </Label>
              <select
                id="input-type"
                value={componentConfig.inputType}
                onChange={(e) =>
                  updateComponentConfig({
                    inputType: e.target.value as ComponentConfig['inputType'],
                  })
                }
                className={inputFieldClass}
              >
                <option value="text">Text</option>
                <option value="password">Password</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="search">Search</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="input-helper" className="text-sm font-medium">
                Helper Text
              </Label>
              <input
                id="input-helper"
                type="text"
                value={componentConfig.inputHelperText}
                onChange={(e) => updateComponentConfig({ inputHelperText: e.target.value })}
                placeholder="Optional helper or error text"
                className={inputFieldClass}
              />
            </div>
          </>
        )}

        {selectedComponent === 'Text Area' && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-sm font-medium">Rows</Label>
                <span className="text-sm text-muted-foreground">{componentConfig.textareaRows}</span>
              </div>
              <Slider
                value={[componentConfig.textareaRows]}
                onValueChange={([value]) => updateComponentConfig({ textareaRows: value })}
                min={2}
                max={12}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea-resize" className="text-sm font-medium">
                Resize
              </Label>
              <select
                id="textarea-resize"
                value={componentConfig.textareaResize}
                onChange={(e) =>
                  updateComponentConfig({
                    textareaResize: e.target.value as ComponentConfig['textareaResize'],
                  })
                }
                className={inputFieldClass}
              >
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
                <option value="both">Both</option>
                <option value="none">None</option>
              </select>
            </div>
          </>
        )}

        {selectedComponent === 'Search Field' && (
          <div className="flex items-center justify-between">
            <Label htmlFor="search-clearable" className="text-sm font-medium">
              Clear Button
            </Label>
            <Switch
              id="search-clearable"
              checked={componentConfig.searchClearable}
              onCheckedChange={(checked) => updateComponentConfig({ searchClearable: checked })}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="input-validation" className="text-sm font-medium">
            Validation State
          </Label>
          <select
            id="input-validation"
            value={componentConfig.inputValidationState}
            onChange={(e) =>
              updateComponentConfig({
                inputValidationState: e.target.value as ComponentConfig['inputValidationState'],
              })
            }
            className={inputFieldClass}
          >
            <option value="none">None</option>
            <option value="success">Success</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="input-required" className="text-sm font-medium">
            Required
          </Label>
          <Switch
            id="input-required"
            checked={componentConfig.inputRequired}
            onCheckedChange={(checked) => updateComponentConfig({ inputRequired: checked })}
          />
        </div>
      </div>
    );
  };

  const renderSelectorOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {selectedComponent} Options
      </h4>

      <div className="space-y-2">
        <Label htmlFor="selector-label" className="text-sm font-medium">
          Label
        </Label>
        <input
          id="selector-label"
          type="text"
          value={componentConfig.label}
          onChange={(e) => updateComponentConfig({ label: e.target.value })}
          className={inputFieldClass}
        />
      </div>

      {selectedComponent === 'Checkbox' && (
        <>
          <div className="flex items-center justify-between">
            <Label htmlFor="chk-checked" className="text-sm font-medium">
              Checked
            </Label>
            <Switch
              id="chk-checked"
              checked={componentConfig.checkboxChecked}
              onCheckedChange={(checked) => updateComponentConfig({ checkboxChecked: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="chk-indeterminate" className="text-sm font-medium">
              Indeterminate
            </Label>
            <Switch
              id="chk-indeterminate"
              checked={componentConfig.checkboxIndeterminate}
              onCheckedChange={(checked) =>
                updateComponentConfig({ checkboxIndeterminate: checked })
              }
            />
          </div>
        </>
      )}

      {selectedComponent === 'Radio Group' &&
        renderCommaListEditor(
          'radio-options',
          'Radio Options',
          componentConfig.radioOptions,
          (next) => updateComponentConfig({ radioOptions: next })
        )}

      {selectedComponent === 'Switch' && (
        <>
          <div className="flex items-center justify-between">
            <Label htmlFor="sw-checked" className="text-sm font-medium">
              Enabled
            </Label>
            <Switch
              id="sw-checked"
              checked={componentConfig.switchChecked}
              onCheckedChange={(checked) => updateComponentConfig({ switchChecked: checked })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sw-size" className="text-sm font-medium">
              Switch Size
            </Label>
            <select
              id="sw-size"
              value={componentConfig.switchSize}
              onChange={(e) =>
                updateComponentConfig({ switchSize: e.target.value as 'sm' | 'md' | 'lg' })
              }
              className={inputFieldClass}
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sw-pos" className="text-sm font-medium">
              Label Position
            </Label>
            <select
              id="sw-pos"
              value={componentConfig.switchLabelPosition}
              onChange={(e) =>
                updateComponentConfig({
                  switchLabelPosition: e.target.value as 'left' | 'right',
                })
              }
              className={inputFieldClass}
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
            </select>
          </div>
        </>
      )}

      {(selectedComponent === 'Dropdown' || selectedComponent === 'Autocomplete') && (
        <>
          <div className="space-y-2">
            <Label htmlFor="dd-placeholder" className="text-sm font-medium">
              Placeholder
            </Label>
            <input
              id="dd-placeholder"
              type="text"
              value={
                selectedComponent === 'Dropdown'
                  ? componentConfig.dropdownPlaceholder
                  : componentConfig.placeholder
              }
              onChange={(e) =>
                selectedComponent === 'Dropdown'
                  ? updateComponentConfig({ dropdownPlaceholder: e.target.value })
                  : updateComponentConfig({ placeholder: e.target.value })
              }
              className={inputFieldClass}
            />
          </div>
          {renderCommaListEditor(
            'dd-options',
            'Options',
            componentConfig.dropdownOptions,
            (next) => updateComponentConfig({ dropdownOptions: next })
          )}
        </>
      )}
    </div>
  );

  const renderNavigationOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {selectedComponent} Options
      </h4>

      {selectedComponent === 'Nav Bar' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="nav-orient" className="text-sm font-medium">
              Orientation
            </Label>
            <select
              id="nav-orient"
              value={componentConfig.navbarOrientation}
              onChange={(e) =>
                updateComponentConfig({
                  navbarOrientation: e.target.value as 'horizontal' | 'vertical',
                })
              }
              className={inputFieldClass}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
          {renderCommaListEditor('nav-items', 'Menu Items', componentConfig.navbarItems, (next) =>
            updateComponentConfig({ navbarItems: next })
          )}
        </>
      )}

      {selectedComponent === 'Tabs' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="tabs-variant" className="text-sm font-medium">
              Variant
            </Label>
            <select
              id="tabs-variant"
              value={componentConfig.tabVariant}
              onChange={(e) =>
                updateComponentConfig({
                  tabVariant: e.target.value as ComponentConfig['tabVariant'],
                })
              }
              className={inputFieldClass}
            >
              <option value="default">Default</option>
              <option value="pills">Pills</option>
              <option value="underline">Underline</option>
            </select>
          </div>
          {renderCommaListEditor('tabs-items', 'Tab Labels', componentConfig.tabItems, (next) =>
            updateComponentConfig({ tabItems: next })
          )}
        </>
      )}

      {selectedComponent === 'Breadcrumbs' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="bc-sep" className="text-sm font-medium">
              Separator
            </Label>
            <select
              id="bc-sep"
              value={componentConfig.breadcrumbSeparator}
              onChange={(e) =>
                updateComponentConfig({
                  breadcrumbSeparator: e.target.value as ComponentConfig['breadcrumbSeparator'],
                })
              }
              className={inputFieldClass}
            >
              <option value="chevron">Chevron (›)</option>
              <option value="slash">Slash (/)</option>
              <option value="arrow">Arrow (→)</option>
            </select>
          </div>
          {renderCommaListEditor('bc-items', 'Path Items', componentConfig.breadcrumbItems, (next) =>
            updateComponentConfig({ breadcrumbItems: next })
          )}
        </>
      )}

      {selectedComponent === 'Pagination' && (
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="pg-total" className="text-xs text-muted-foreground">
              Total Items
            </Label>
            <input
              id="pg-total"
              type="number"
              min={1}
              value={componentConfig.paginationTotal}
              onChange={(e) =>
                updateComponentConfig({ paginationTotal: Math.max(1, Number(e.target.value)) })
              }
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="pg-size" className="text-xs text-muted-foreground">
              Page Size
            </Label>
            <input
              id="pg-size"
              type="number"
              min={1}
              value={componentConfig.paginationPageSize}
              onChange={(e) =>
                updateComponentConfig({ paginationPageSize: Math.max(1, Number(e.target.value)) })
              }
              className={inputFieldClass}
            />
          </div>
        </div>
      )}

      {selectedComponent === 'Stepper' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="stepper-orient" className="text-sm font-medium">
              Orientation
            </Label>
            <select
              id="stepper-orient"
              value={componentConfig.stepperOrientation}
              onChange={(e) =>
                updateComponentConfig({
                  stepperOrientation: e.target.value as 'horizontal' | 'vertical',
                })
              }
              className={inputFieldClass}
            >
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>
          {renderCommaListEditor('stepper-steps', 'Steps', componentConfig.stepperSteps, (next) =>
            updateComponentConfig({ stepperSteps: next })
          )}
        </>
      )}
    </div>
  );

  const renderCardOptions = () => (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        {selectedComponent} Options
      </h4>

      {selectedComponent === 'Profile Card' ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="prof-name" className="text-sm font-medium">
              Name
            </Label>
            <input
              id="prof-name"
              type="text"
              value={componentConfig.profileName}
              onChange={(e) => updateComponentConfig({ profileName: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prof-role" className="text-sm font-medium">
              Role
            </Label>
            <input
              id="prof-role"
              type="text"
              value={componentConfig.profileRole}
              onChange={(e) => updateComponentConfig({ profileRole: e.target.value })}
              className={inputFieldClass}
            />
          </div>
        </>
      ) : selectedComponent === 'Accordion' ? (
        <div className="flex items-center justify-between">
          <Label htmlFor="acc-multi" className="text-sm font-medium">
            Allow Multiple Open
          </Label>
          <Switch
            id="acc-multi"
            checked={componentConfig.accordionAllowMultiple}
            onCheckedChange={(checked) => updateComponentConfig({ accordionAllowMultiple: checked })}
          />
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="card-title" className="text-sm font-medium">
              Card Title
            </Label>
            <input
              id="card-title"
              type="text"
              value={componentConfig.cardTitle}
              onChange={(e) => updateComponentConfig({ cardTitle: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-subtitle" className="text-sm font-medium">
              Card Subtitle
            </Label>
            <input
              id="card-subtitle"
              type="text"
              value={componentConfig.cardSubtitle}
              onChange={(e) => updateComponentConfig({ cardSubtitle: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          {selectedComponent === 'Image Card' && (
            <div className="space-y-2">
              <Label htmlFor="card-img" className="text-sm font-medium">
                Image URL
              </Label>
              <input
                id="card-img"
                type="url"
                value={componentConfig.cardImage}
                onChange={(e) => updateComponentConfig({ cardImage: e.target.value })}
                className={inputFieldClass}
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <Label htmlFor="card-header" className="text-sm font-medium">
              Show Header
            </Label>
            <Switch
              id="card-header"
              checked={componentConfig.cardShowHeader}
              onCheckedChange={(checked) => updateComponentConfig({ cardShowHeader: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="card-footer" className="text-sm font-medium">
              Show Footer
            </Label>
            <Switch
              id="card-footer"
              checked={componentConfig.cardShowFooter}
              onCheckedChange={(checked) => updateComponentConfig({ cardShowFooter: checked })}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Elevation</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.cardElevation}</span>
            </div>
            <Slider
              value={[componentConfig.cardElevation]}
              onValueChange={([value]) => updateComponentConfig({ cardElevation: value })}
              min={0}
              max={5}
              step={1}
            />
          </div>
        </>
      )}
    </div>
  );

  const renderFeedbackOptions = () => {
    if (selectedComponent === 'Alert' || selectedComponent === 'Toast') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            {selectedComponent} Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="alert-type" className="text-sm font-medium">
              Severity
            </Label>
            <select
              id="alert-type"
              value={componentConfig.alertType}
              onChange={(e) =>
                updateComponentConfig({ alertType: e.target.value as ComponentConfig['alertType'] })
              }
              className={inputFieldClass}
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          {selectedComponent === 'Alert' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="alert-title" className="text-sm font-medium">
                  Title
                </Label>
                <input
                  id="alert-title"
                  type="text"
                  value={componentConfig.alertTitle}
                  onChange={(e) => updateComponentConfig({ alertTitle: e.target.value })}
                  className={inputFieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="alert-msg" className="text-sm font-medium">
                  Message
                </Label>
                <input
                  id="alert-msg"
                  type="text"
                  value={componentConfig.alertMessage}
                  onChange={(e) => updateComponentConfig({ alertMessage: e.target.value })}
                  className={inputFieldClass}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="alert-icon" className="text-sm font-medium">
                  Show Icon
                </Label>
                <Switch
                  id="alert-icon"
                  checked={componentConfig.alertShowIcon}
                  onCheckedChange={(checked) => updateComponentConfig({ alertShowIcon: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="alert-dismiss" className="text-sm font-medium">
                  Dismissible
                </Label>
                <Switch
                  id="alert-dismiss"
                  checked={componentConfig.alertDismissible}
                  onCheckedChange={(checked) => updateComponentConfig({ alertDismissible: checked })}
                />
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="toast-pos" className="text-sm font-medium">
                Position
              </Label>
              <select
                id="toast-pos"
                value={componentConfig.toastPosition}
                onChange={(e) =>
                  updateComponentConfig({
                    toastPosition: e.target.value as ComponentConfig['toastPosition'],
                  })
                }
                className={inputFieldClass}
              >
                <option value="top-left">Top Left</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
                <option value="bottom-left">Bottom Left</option>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
              </select>
            </div>
          )}
        </div>
      );
    }

    if (selectedComponent === 'Badge') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Badge Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="badge-content" className="text-sm font-medium">
              Badge Text
            </Label>
            <input
              id="badge-content"
              type="text"
              value={componentConfig.badgeContent}
              onChange={(e) => updateComponentConfig({ badgeContent: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="badge-variant" className="text-sm font-medium">
              Variant
            </Label>
            <select
              id="badge-variant"
              value={componentConfig.badgeVariant}
              onChange={(e) =>
                updateComponentConfig({
                  badgeVariant: e.target.value as ComponentConfig['badgeVariant'],
                })
              }
              className={inputFieldClass}
            >
              <option value="default">Default</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
              <option value="destructive">Destructive</option>
            </select>
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Progress Bar') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Progress Options
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Value</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.progressValue}%</span>
            </div>
            <Slider
              value={[componentConfig.progressValue]}
              onValueChange={([value]) => updateComponentConfig({ progressValue: value })}
              min={0}
              max={100}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-size" className="text-sm font-medium">
              Size
            </Label>
            <select
              id="prog-size"
              value={componentConfig.progressSize}
              onChange={(e) =>
                updateComponentConfig({ progressSize: e.target.value as 'sm' | 'md' | 'lg' })
              }
              className={inputFieldClass}
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="prog-variant" className="text-sm font-medium">
              Style
            </Label>
            <select
              id="prog-variant"
              value={componentConfig.progressVariant}
              onChange={(e) =>
                updateComponentConfig({
                  progressVariant: e.target.value as ComponentConfig['progressVariant'],
                })
              }
              className={inputFieldClass}
            >
              <option value="default">Solid</option>
              <option value="striped">Striped</option>
              <option value="animated">Animated</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="prog-label" className="text-sm font-medium">
              Show Label
            </Label>
            <Switch
              id="prog-label"
              checked={componentConfig.progressShowLabel}
              onCheckedChange={(checked) => updateComponentConfig({ progressShowLabel: checked })}
            />
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Skeleton') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Skeleton Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="skel-variant" className="text-sm font-medium">
              Shape
            </Label>
            <select
              id="skel-variant"
              value={componentConfig.skeletonVariant}
              onChange={(e) =>
                updateComponentConfig({
                  skeletonVariant: e.target.value as ComponentConfig['skeletonVariant'],
                })
              }
              className={inputFieldClass}
            >
              <option value="rectangular">Rectangular</option>
              <option value="text">Text Line</option>
              <option value="circular">Circular</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skel-anim" className="text-sm font-medium">
              Animation
            </Label>
            <select
              id="skel-anim"
              value={componentConfig.skeletonAnimation}
              onChange={(e) =>
                updateComponentConfig({
                  skeletonAnimation: e.target.value as ComponentConfig['skeletonAnimation'],
                })
              }
              className={inputFieldClass}
            >
              <option value="pulse">Pulse</option>
              <option value="wave">Wave</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Tooltip') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Tooltip Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="tt-content" className="text-sm font-medium">
              Tooltip Text
            </Label>
            <input
              id="tt-content"
              type="text"
              value={componentConfig.tooltipContent}
              onChange={(e) => updateComponentConfig({ tooltipContent: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tt-pos" className="text-sm font-medium">
              Placement
            </Label>
            <select
              id="tt-pos"
              value={componentConfig.tooltipPosition}
              onChange={(e) =>
                updateComponentConfig({
                  tooltipPosition: e.target.value as ComponentConfig['tooltipPosition'],
                })
              }
              className={inputFieldClass}
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tt-trigger" className="text-sm font-medium">
              Trigger
            </Label>
            <select
              id="tt-trigger"
              value={componentConfig.tooltipTrigger}
              onChange={(e) =>
                updateComponentConfig({ tooltipTrigger: e.target.value as 'hover' | 'click' })
              }
              className={inputFieldClass}
            >
              <option value="hover">Hover</option>
              <option value="click">Click</option>
            </select>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Modal Options
        </h4>
        <div className="space-y-2">
          <Label htmlFor="modal-title" className="text-sm font-medium">
            Title
          </Label>
          <input
            id="modal-title"
            type="text"
            value={componentConfig.modalTitle}
            onChange={(e) => updateComponentConfig({ modalTitle: e.target.value })}
            className={inputFieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modal-size" className="text-sm font-medium">
            Size
          </Label>
          <select
            id="modal-size"
            value={componentConfig.modalSize}
            onChange={(e) =>
              updateComponentConfig({ modalSize: e.target.value as ComponentConfig['modalSize'] })
            }
            className={inputFieldClass}
          >
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="full">Full Width</option>
          </select>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Overlay Opacity</Label>
            <span className="text-sm text-muted-foreground">
              {Math.round(componentConfig.modalOverlayOpacity * 100)}%
            </span>
          </div>
          <Slider
            value={[componentConfig.modalOverlayOpacity * 100]}
            onValueChange={([value]) => updateComponentConfig({ modalOverlayOpacity: value / 100 })}
            min={0}
            max={100}
            step={5}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="modal-close-overlay" className="text-sm font-medium">
            Close on Overlay Click
          </Label>
          <Switch
            id="modal-close-overlay"
            checked={componentConfig.modalCloseOnOverlay}
            onCheckedChange={(checked) => updateComponentConfig({ modalCloseOnOverlay: checked })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="modal-show-close" className="text-sm font-medium">
            Show Close Button
          </Label>
          <Switch
            id="modal-show-close"
            checked={componentConfig.modalShowClose}
            onCheckedChange={(checked) => updateComponentConfig({ modalShowClose: checked })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="modal-anim" className="text-sm font-medium">
            Animation
          </Label>
          <select
            id="modal-anim"
            value={componentConfig.modalAnimation}
            onChange={(e) =>
              updateComponentConfig({
                modalAnimation: e.target.value as ComponentConfig['modalAnimation'],
              })
            }
            className={inputFieldClass}
          >
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="scale">Scale</option>
          </select>
        </div>
      </div>
    );
  };

  const renderListDataMediaOptions = () => {
    if (selectedComponent.includes('List')) {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            List Options
          </h4>
          {renderCommaListEditor('list-items', 'List Items', componentConfig.listItems, (next) =>
            updateComponentConfig({ listItems: next })
          )}
          {selectedComponent === 'Simple List' && (
            <div className="space-y-2">
              <Label htmlFor="list-marker" className="text-sm font-medium">
                Marker Style
              </Label>
              <select
                id="list-marker"
                value={componentConfig.listStyleType}
                onChange={(e) =>
                  updateComponentConfig({
                    listStyleType: e.target.value as ComponentConfig['listStyleType'],
                  })
                }
                className={inputFieldClass}
              >
                <option value="disc">Disc</option>
                <option value="circle">Circle</option>
                <option value="square">Square</option>
                <option value="decimal">Numbered</option>
                <option value="none">None</option>
              </select>
            </div>
          )}
          {selectedComponent === 'Icon List' && (
            <div className="space-y-2">
              <Label htmlFor="list-icon" className="text-sm font-medium">
                Bullet Icon
              </Label>
              <select
                id="list-icon"
                value={componentConfig.listIconName}
                onChange={(e) => updateComponentConfig({ listIconName: e.target.value })}
                className={inputFieldClass}
              >
                {AVAILABLE_ICON_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      );
    }

    if (selectedComponent === 'Table') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Table Options
          </h4>
          {renderCommaListEditor(
            'table-cols',
            'Columns',
            componentConfig.tableColumns,
            (next) => updateComponentConfig({ tableColumns: next })
          )}
          <div className="flex items-center justify-between">
            <Label htmlFor="tbl-striped" className="text-sm font-medium">
              Striped Rows
            </Label>
            <Switch
              id="tbl-striped"
              checked={componentConfig.tableStriped}
              onCheckedChange={(checked) => updateComponentConfig({ tableStriped: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="tbl-bordered" className="text-sm font-medium">
              Bordered
            </Label>
            <Switch
              id="tbl-bordered"
              checked={componentConfig.tableBordered}
              onCheckedChange={(checked) => updateComponentConfig({ tableBordered: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="tbl-hover" className="text-sm font-medium">
              Row Hover Highlight
            </Label>
            <Switch
              id="tbl-hover"
              checked={componentConfig.tableHoverable}
              onCheckedChange={(checked) => updateComponentConfig({ tableHoverable: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="tbl-compact" className="text-sm font-medium">
              Compact Padding
            </Label>
            <Switch
              id="tbl-compact"
              checked={componentConfig.tableCompact}
              onCheckedChange={(checked) => updateComponentConfig({ tableCompact: checked })}
            />
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Grid') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Grid Options
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Columns</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.gridColumns}</span>
            </div>
            <Slider
              value={[componentConfig.gridColumns]}
              onValueChange={([value]) => updateComponentConfig({ gridColumns: value })}
              min={1}
              max={6}
              step={1}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Grid Gap</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.gridGap}px</span>
            </div>
            <Slider
              value={[componentConfig.gridGap]}
              onValueChange={([value]) => updateComponentConfig({ gridGap: value })}
              min={0}
              max={32}
              step={2}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Items</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.gridItems}</span>
            </div>
            <Slider
              value={[componentConfig.gridItems]}
              onValueChange={([value]) => updateComponentConfig({ gridItems: value })}
              min={1}
              max={12}
              step={1}
            />
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Timeline') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Timeline Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="tl-orient" className="text-sm font-medium">
              Orientation
            </Label>
            <select
              id="tl-orient"
              value={componentConfig.timelineOrientation}
              onChange={(e) =>
                updateComponentConfig({
                  timelineOrientation: e.target.value as 'vertical' | 'horizontal',
                })
              }
              className={inputFieldClass}
            >
              <option value="vertical">Vertical</option>
              <option value="horizontal">Horizontal</option>
            </select>
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Carousel') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Carousel Options
          </h4>
          {renderCommaListEditor(
            'car-slides',
            'Slides',
            componentConfig.carouselItems,
            (next) => updateComponentConfig({ carouselItems: next })
          )}
          <div className="flex items-center justify-between">
            <Label htmlFor="car-auto" className="text-sm font-medium">
              Autoplay
            </Label>
            <Switch
              id="car-auto"
              checked={componentConfig.carouselAutoplay}
              onCheckedChange={(checked) => updateComponentConfig({ carouselAutoplay: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="car-dots" className="text-sm font-medium">
              Show Dots
            </Label>
            <Switch
              id="car-dots"
              checked={componentConfig.carouselShowDots}
              onCheckedChange={(checked) => updateComponentConfig({ carouselShowDots: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="car-arrows" className="text-sm font-medium">
              Show Arrows
            </Label>
            <Switch
              id="car-arrows"
              checked={componentConfig.carouselShowArrows}
              onCheckedChange={(checked) => updateComponentConfig({ carouselShowArrows: checked })}
            />
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Image') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Image Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="img-src" className="text-sm font-medium">
              Image URL
            </Label>
            <input
              id="img-src"
              type="url"
              value={componentConfig.imageSrc}
              onChange={(e) => updateComponentConfig({ imageSrc: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="img-alt" className="text-sm font-medium">
              Alt Text
            </Label>
            <input
              id="img-alt"
              type="text"
              value={componentConfig.imageAlt}
              onChange={(e) => updateComponentConfig({ imageAlt: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="img-fit" className="text-sm font-medium">
              Object Fit
            </Label>
            <select
              id="img-fit"
              value={componentConfig.imageObjectFit}
              onChange={(e) =>
                updateComponentConfig({
                  imageObjectFit: e.target.value as ComponentConfig['imageObjectFit'],
                })
              }
              className={inputFieldClass}
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="fill">Fill</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Avatar') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Avatar Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="av-fallback" className="text-sm font-medium">
              Initials Fallback
            </Label>
            <input
              id="av-fallback"
              type="text"
              maxLength={4}
              value={componentConfig.avatarFallback}
              onChange={(e) => updateComponentConfig({ avatarFallback: e.target.value })}
              className={inputFieldClass}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="av-size" className="text-sm font-medium">
              Size
            </Label>
            <select
              id="av-size"
              value={componentConfig.avatarSize}
              onChange={(e) =>
                updateComponentConfig({
                  avatarSize: e.target.value as ComponentConfig['avatarSize'],
                })
              }
              className={inputFieldClass}
            >
              <option value="xs">XS</option>
              <option value="sm">SM</option>
              <option value="md">MD</option>
              <option value="lg">LG</option>
              <option value="xl">XL</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="av-shape" className="text-sm font-medium">
              Shape
            </Label>
            <select
              id="av-shape"
              value={componentConfig.avatarShape}
              onChange={(e) =>
                updateComponentConfig({ avatarShape: e.target.value as 'circle' | 'square' })
              }
              className={inputFieldClass}
            >
              <option value="circle">Circle</option>
              <option value="square">Rounded Square</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="av-status" className="text-sm font-medium">
              Status Indicator
            </Label>
            <select
              id="av-status"
              value={componentConfig.avatarStatus}
              onChange={(e) =>
                updateComponentConfig({
                  avatarStatus: e.target.value as ComponentConfig['avatarStatus'],
                })
              }
              className={inputFieldClass}
            >
              <option value="none">None</option>
              <option value="online">Online</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>
        </div>
      );
    }

    if (selectedComponent === 'Icon') {
      return (
        <div className="space-y-6">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Icon Options
          </h4>
          <div className="space-y-2">
            <Label htmlFor="icon-name" className="text-sm font-medium">
              Icon
            </Label>
            <select
              id="icon-name"
              value={componentConfig.iconName}
              onChange={(e) => updateComponentConfig({ iconName: e.target.value })}
              className={inputFieldClass}
            >
              {AVAILABLE_ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Icon Size</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.iconSize}px</span>
            </div>
            <Slider
              value={[componentConfig.iconSize]}
              onValueChange={([value]) => updateComponentConfig({ iconSize: value })}
              min={12}
              max={96}
              step={2}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-sm font-medium">Stroke Width</Label>
              <span className="text-sm text-muted-foreground">{componentConfig.iconStrokeWidth}</span>
            </div>
            <Slider
              value={[componentConfig.iconStrokeWidth]}
              onValueChange={([value]) => updateComponentConfig({ iconStrokeWidth: value })}
              min={1}
              max={4}
              step={0.5}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  const getComponentOptions = () => {
    if (selectedComponent.includes('Button')) return renderButtonOptions();
    if (
      ['Heading', 'Paragraph', 'Label', 'Blockquote', 'Code Block', 'Code Editor'].includes(
        selectedComponent
      )
    ) {
      return renderTextOptions();
    }
    if (
      [
        'Text Field',
        'Text Area',
        'Password Input',
        'Search Field',
        'Number Input',
        'File Upload',
        'Color Picker',
        'Range Slider',
      ].includes(selectedComponent)
    ) {
      return renderInputOptions();
    }
    if (
      ['Checkbox', 'Radio Group', 'Switch', 'Dropdown', 'Autocomplete'].includes(selectedComponent)
    ) {
      return renderSelectorOptions();
    }
    if (
      ['Nav Bar', 'Tabs', 'Breadcrumbs', 'Pagination', 'Stepper'].includes(selectedComponent)
    ) {
      return renderNavigationOptions();
    }
    if (['Basic Card', 'Image Card', 'Profile Card', 'Accordion'].includes(selectedComponent)) {
      return renderCardOptions();
    }
    if (
      ['Alert', 'Toast', 'Modal', 'Badge', 'Progress Bar', 'Skeleton', 'Tooltip'].includes(
        selectedComponent
      )
    ) {
      return renderFeedbackOptions();
    }

    const extra = renderListDataMediaOptions();
    if (extra) return extra;

    return (
      <div className="p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          Use Style, Text, Size, FX, and States tabs to customize {selectedComponent}.
        </p>
      </div>
    );
  };

  return <div className="space-y-6">{getComponentOptions()}</div>;
};
