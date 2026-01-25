import { create } from 'zustand';

export type Framework = 'react' | 'angular' | 'vue' | 'html' | 'tailwind' | 'streamlit' | 'tkinter' | 'winui3';
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
  
  // ===== BUTTON COMPONENTS =====
  buttonIcon: string;
  buttonIconPosition: 'left' | 'right';
  buttonLoading: boolean;
  buttonFullWidth: boolean;
  // Icon Button specific
  iconButtonShape: 'square' | 'circle';
  iconButtonTooltip: string;
  // FAB specific
  fabPosition: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  fabExtended: boolean;
  // Toggle Button specific
  toggleSelected: boolean;
  toggleOnLabel: string;
  toggleOffLabel: string;
  
  // ===== INPUT COMPONENTS =====
  inputType: 'text' | 'password' | 'email' | 'number' | 'search';
  inputIcon: string;
  inputRequired: boolean;
  inputValidationState: 'none' | 'error' | 'success';
  inputHelperText: string;
  inputMaxLength: number;
  inputMinLength: number;
  // TextArea specific
  textareaRows: number;
  textareaResize: 'none' | 'both' | 'horizontal' | 'vertical';
  // Search specific
  searchClearable: boolean;
  // File Upload specific
  fileAccept: string;
  fileMultiple: boolean;
  fileDragDrop: boolean;
  // Range Slider specific
  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  sliderValue: number;
  sliderShowValue: boolean;
  
  // ===== SELECTOR COMPONENTS =====
  // Checkbox/Radio
  checkboxChecked: boolean;
  checkboxIndeterminate: boolean;
  radioOptions: string[];
  radioSelectedIndex: number;
  // Switch specific
  switchSize: 'sm' | 'md' | 'lg';
  switchChecked: boolean;
  switchLabelPosition: 'left' | 'right';
  // Dropdown specific
  dropdownOptions: string[];
  dropdownSelectedIndex: number;
  dropdownSearchable: boolean;
  dropdownMultiple: boolean;
  dropdownPlaceholder: string;
  
  // ===== NAVIGATION COMPONENTS =====
  // Navbar specific
  navbarOrientation: 'horizontal' | 'vertical';
  navbarItems: string[];
  navbarActiveIndex: number;
  navbarLogo: string;
  // Tabs specific
  tabItems: string[];
  tabActiveIndex: number;
  tabVariant: 'default' | 'pills' | 'underline';
  // Breadcrumbs specific
  breadcrumbItems: string[];
  breadcrumbSeparator: 'slash' | 'chevron' | 'arrow';
  // Pagination specific
  paginationTotal: number;
  paginationCurrent: number;
  paginationPageSize: number;
  paginationShowSizeChanger: boolean;
  // Stepper specific
  stepperSteps: string[];
  stepperCurrentStep: number;
  stepperOrientation: 'horizontal' | 'vertical';
  
  // ===== CARD COMPONENTS =====
  cardImage: string;
  cardShowHeader: boolean;
  cardShowFooter: boolean;
  cardElevation: number;
  cardTitle: string;
  cardSubtitle: string;
  // Profile Card specific
  profileAvatar: string;
  profileName: string;
  profileRole: string;
  // Accordion specific
  accordionItems: { title: string; content: string }[];
  accordionAllowMultiple: boolean;
  accordionDefaultOpen: number[];
  
  // ===== FEEDBACK COMPONENTS =====
  // Alert specific
  alertType: 'info' | 'success' | 'warning' | 'error';
  alertTitle: string;
  alertMessage: string;
  alertDismissible: boolean;
  alertShowIcon: boolean;
  // Toast specific
  toastPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  toastDuration: number;
  // Modal specific
  modalOverlayOpacity: number;
  modalCloseOnOverlay: boolean;
  modalAnimation: 'fade' | 'slide' | 'scale';
  modalTitle: string;
  modalShowClose: boolean;
  modalSize: 'sm' | 'md' | 'lg' | 'full';
  // Badge specific
  badgeVariant: 'default' | 'secondary' | 'outline' | 'destructive';
  badgeContent: string;
  // Progress specific
  progressValue: number;
  progressShowLabel: boolean;
  progressVariant: 'default' | 'striped' | 'animated';
  progressSize: 'sm' | 'md' | 'lg';
  // Skeleton specific
  skeletonVariant: 'text' | 'circular' | 'rectangular';
  skeletonAnimation: 'pulse' | 'wave' | 'none';
  // Tooltip specific
  tooltipContent: string;
  tooltipPosition: 'top' | 'bottom' | 'left' | 'right';
  tooltipTrigger: 'hover' | 'click';
  
  // ===== DATA DISPLAY COMPONENTS =====
  // Table specific
  tableColumns: string[];
  tableRows: string[][];
  tableStriped: boolean;
  tableBordered: boolean;
  tableHoverable: boolean;
  tableCompact: boolean;
  // Grid specific
  gridColumns: number;
  gridGap: number;
  gridItems: number;
  // Timeline specific
  timelineItems: { title: string; description: string; date: string }[];
  timelineOrientation: 'vertical' | 'horizontal';
  // Carousel specific
  carouselItems: string[];
  carouselAutoplay: boolean;
  carouselInterval: number;
  carouselShowDots: boolean;
  carouselShowArrows: boolean;
  
  // ===== MEDIA COMPONENTS =====
  // Image specific
  imageSrc: string;
  imageAlt: string;
  imageObjectFit: 'cover' | 'contain' | 'fill' | 'none';
  imageLazyLoad: boolean;
  // Avatar specific
  avatarSrc: string;
  avatarFallback: string;
  avatarSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  avatarShape: 'circle' | 'square';
  avatarStatus: 'none' | 'online' | 'offline' | 'busy';
  // Icon specific
  iconName: string;
  iconSize: number;
  iconStrokeWidth: number;
  
  // ===== LIST COMPONENTS =====
  listItems: string[];
  listStyleType: 'none' | 'disc' | 'decimal' | 'circle' | 'square';
  listIconName: string;
  listCheckable: boolean;
  listCheckedItems: number[];
  
  // ===== TEXT COMPONENTS =====
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
  codeLanguage: string;
  codeContent: string;
  blockquoteAuthor: string;
  
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
  // Content
  text: 'Click Me',
  placeholder: 'Enter text...',
  label: 'Label',
  
  // Typography
  fontFamily: 'Inter',
  fontSize: 16,
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: 1.5,
  letterSpacing: 0,
  textAlign: 'center',
  textDecoration: 'none',
  textTransform: 'none',
  
  // Colors
  backgroundColor: '#3B82F6',
  textColor: '#FFFFFF',
  borderColor: '#3B82F6',
  opacity: 1,
  
  // Spacing
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  paddingTop: 12,
  paddingRight: 24,
  paddingBottom: 12,
  paddingLeft: 24,
  gap: 8,
  
  // Size & Layout
  width: 'auto',
  height: 'auto',
  minWidth: '',
  maxWidth: '',
  minHeight: '',
  maxHeight: '',
  
  // Display & Position
  display: 'flex',
  position: 'relative',
  zIndex: 0,
  
  // Borders
  borderWidth: 0,
  borderStyle: 'solid',
  borderRadius: 12,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  linkBorderRadius: true,
  
  // Shadows
  boxShadowX: 0,
  boxShadowY: 2,
  boxShadowBlur: 4,
  boxShadowSpread: 0,
  boxShadowColor: 'rgba(0,0,0,0.1)',
  boxShadowInset: false,
  
  // Effects
  glassmorphism: false,
  glassBlur: 10,
  glassOpacity: 0.2,
  
  // Gradient
  useGradient: false,
  gradientType: 'linear',
  gradientAngle: 135,
  gradientStart: '#3B82F6',
  gradientEnd: '#8B5CF6',
  
  // Transitions
  transitionDuration: 200,
  transitionEasing: 'ease',
  
  // State Styles
  stateStyles: {
    hover: { ...defaultStateStyles, backgroundColor: '#2563EB' },
    active: { ...defaultStateStyles, backgroundColor: '#1D4ED8' },
    focus: { ...defaultStateStyles, borderColor: '#60A5FA', boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)' },
    disabled: { ...defaultStateStyles, backgroundColor: '#9CA3AF', textColor: '#6B7280' },
  },
  
  // Button defaults
  buttonIcon: '',
  buttonIconPosition: 'left',
  buttonLoading: false,
  buttonFullWidth: false,
  iconButtonShape: 'square',
  iconButtonTooltip: 'Action',
  fabPosition: 'bottom-right',
  fabExtended: false,
  toggleSelected: false,
  toggleOnLabel: 'On',
  toggleOffLabel: 'Off',
  
  // Input defaults
  inputType: 'text',
  inputIcon: '',
  inputRequired: false,
  inputValidationState: 'none',
  inputHelperText: '',
  inputMaxLength: 100,
  inputMinLength: 0,
  textareaRows: 4,
  textareaResize: 'vertical',
  searchClearable: true,
  fileAccept: '*',
  fileMultiple: false,
  fileDragDrop: true,
  sliderMin: 0,
  sliderMax: 100,
  sliderStep: 1,
  sliderValue: 50,
  sliderShowValue: true,
  
  // Selector defaults
  checkboxChecked: false,
  checkboxIndeterminate: false,
  radioOptions: ['Option 1', 'Option 2', 'Option 3'],
  radioSelectedIndex: 0,
  switchSize: 'md',
  switchChecked: false,
  switchLabelPosition: 'right',
  dropdownOptions: ['Option 1', 'Option 2', 'Option 3'],
  dropdownSelectedIndex: -1,
  dropdownSearchable: false,
  dropdownMultiple: false,
  dropdownPlaceholder: 'Select an option',
  
  // Navigation defaults
  navbarOrientation: 'horizontal',
  navbarItems: ['Home', 'About', 'Services', 'Contact'],
  navbarActiveIndex: 0,
  navbarLogo: '',
  tabItems: ['Tab 1', 'Tab 2', 'Tab 3'],
  tabActiveIndex: 0,
  tabVariant: 'default',
  breadcrumbItems: ['Home', 'Products', 'Electronics', 'Phones'],
  breadcrumbSeparator: 'chevron',
  paginationTotal: 100,
  paginationCurrent: 1,
  paginationPageSize: 10,
  paginationShowSizeChanger: true,
  stepperSteps: ['Cart', 'Shipping', 'Payment', 'Confirm'],
  stepperCurrentStep: 1,
  stepperOrientation: 'horizontal',
  
  // Card defaults
  cardImage: '',
  cardShowHeader: true,
  cardShowFooter: true,
  cardElevation: 2,
  cardTitle: 'Card Title',
  cardSubtitle: 'Card subtitle text',
  profileAvatar: '',
  profileName: 'John Doe',
  profileRole: 'Software Engineer',
  accordionItems: [
    { title: 'Section 1', content: 'Content for section 1' },
    { title: 'Section 2', content: 'Content for section 2' },
    { title: 'Section 3', content: 'Content for section 3' },
  ],
  accordionAllowMultiple: false,
  accordionDefaultOpen: [0],
  
  // Feedback defaults
  alertType: 'info',
  alertTitle: 'Information',
  alertMessage: 'This is an informational alert message.',
  alertDismissible: true,
  alertShowIcon: true,
  toastPosition: 'top-right',
  toastDuration: 3000,
  modalOverlayOpacity: 0.5,
  modalCloseOnOverlay: true,
  modalAnimation: 'fade',
  modalTitle: 'Modal Title',
  modalShowClose: true,
  modalSize: 'md',
  badgeVariant: 'default',
  badgeContent: 'Badge',
  progressValue: 60,
  progressShowLabel: true,
  progressVariant: 'default',
  progressSize: 'md',
  skeletonVariant: 'rectangular',
  skeletonAnimation: 'pulse',
  tooltipContent: 'Tooltip text',
  tooltipPosition: 'top',
  tooltipTrigger: 'hover',
  
  // Data Display defaults
  tableColumns: ['Name', 'Email', 'Role'],
  tableRows: [
    ['John Doe', 'john@example.com', 'Admin'],
    ['Jane Smith', 'jane@example.com', 'User'],
    ['Bob Johnson', 'bob@example.com', 'Editor'],
  ],
  tableStriped: true,
  tableBordered: true,
  tableHoverable: true,
  tableCompact: false,
  gridColumns: 3,
  gridGap: 16,
  gridItems: 6,
  timelineItems: [
    { title: 'Step 1', description: 'First step description', date: '2024-01-01' },
    { title: 'Step 2', description: 'Second step description', date: '2024-01-15' },
    { title: 'Step 3', description: 'Third step description', date: '2024-02-01' },
  ],
  timelineOrientation: 'vertical',
  carouselItems: ['Slide 1', 'Slide 2', 'Slide 3'],
  carouselAutoplay: true,
  carouselInterval: 3000,
  carouselShowDots: true,
  carouselShowArrows: true,
  
  // Media defaults
  imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
  imageAlt: 'Sample image',
  imageObjectFit: 'cover',
  imageLazyLoad: true,
  avatarSrc: '',
  avatarFallback: 'JD',
  avatarSize: 'md',
  avatarShape: 'circle',
  avatarStatus: 'none',
  iconName: 'Star',
  iconSize: 24,
  iconStrokeWidth: 2,
  
  // List defaults
  listItems: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
  listStyleType: 'disc',
  listIconName: 'Check',
  listCheckable: false,
  listCheckedItems: [],
  
  // Text defaults
  headingLevel: 2,
  codeLanguage: 'javascript',
  codeContent: 'const hello = "world";\nconsole.log(hello);',
  blockquoteAuthor: 'Author Name',
  
  // Visibility
  visible: true,
};

// Component-specific default overrides
export const componentDefaults: Record<string, Partial<ComponentConfig>> = {
  // BUTTONS
  'Standard Button': {
    text: 'Click Me',
    backgroundColor: '#3B82F6',
    textColor: '#FFFFFF',
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
    borderRadius: 8,
  },
  'Icon Button': {
    text: '',
    buttonIcon: 'Settings',
    iconButtonShape: 'square',
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  'FAB Button': {
    text: '',
    buttonIcon: 'Plus',
    iconButtonShape: 'circle',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderRadius: 9999,
    boxShadowY: 4,
    boxShadowBlur: 12,
    fabPosition: 'bottom-right',
  },
  'Outline Button': {
    text: 'Outline',
    backgroundColor: 'transparent',
    textColor: '#3B82F6',
    borderColor: '#3B82F6',
    borderWidth: 2,
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
    borderRadius: 8,
  },
  'Toggle Button': {
    text: 'Toggle',
    toggleSelected: false,
    toggleOnLabel: 'On',
    toggleOffLabel: 'Off',
    paddingTop: 12,
    paddingRight: 24,
    paddingBottom: 12,
    paddingLeft: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    textColor: '#374151',
  },
  
  // TEXT & TYPOGRAPHY
  'Heading': {
    text: 'Heading Text',
    fontSize: 32,
    fontWeight: 700,
    textColor: '#111827',
    backgroundColor: 'transparent',
    headingLevel: 2,
  },
  'Paragraph': {
    text: 'This is a paragraph of text that demonstrates the typography settings. You can customize the font family, size, weight, line height, and more.',
    fontSize: 16,
    fontWeight: 400,
    textColor: '#374151',
    backgroundColor: 'transparent',
    lineHeight: 1.6,
    textAlign: 'left',
  },
  'Label': {
    text: 'Form Label',
    fontSize: 14,
    fontWeight: 500,
    textColor: '#374151',
    backgroundColor: 'transparent',
  },
  'Blockquote': {
    text: 'The only way to do great work is to love what you do.',
    fontSize: 18,
    fontWeight: 400,
    fontStyle: 'italic',
    textColor: '#4B5563',
    backgroundColor: '#F9FAFB',
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 24,
    borderWidth: 4,
    borderColor: '#3B82F6',
    borderRadius: 0,
    blockquoteAuthor: 'Steve Jobs',
  },
  'Code Block': {
    text: '',
    fontSize: 14,
    fontFamily: 'monospace',
    textColor: '#E5E7EB',
    backgroundColor: '#1F2937',
    paddingTop: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    borderRadius: 8,
    codeLanguage: 'javascript',
    codeContent: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
  },
  
  // FORMS & INPUTS
  'Text Field': {
    placeholder: 'Enter text...',
    label: 'Text Field',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 14,
  },
  'Text Area': {
    placeholder: 'Enter your message...',
    label: 'Message',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 14,
    textareaRows: 4,
    textareaResize: 'vertical',
  },
  'Password Input': {
    placeholder: 'Enter password...',
    label: 'Password',
    inputType: 'password',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 10,
    paddingRight: 40,
    paddingBottom: 10,
    paddingLeft: 14,
  },
  'Search Field': {
    placeholder: 'Search...',
    label: '',
    inputType: 'search',
    inputIcon: 'Search',
    searchClearable: true,
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 9999,
    paddingTop: 10,
    paddingRight: 14,
    paddingBottom: 10,
    paddingLeft: 40,
  },
  'Number Input': {
    placeholder: '0',
    label: 'Quantity',
    inputType: 'number',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
  },
  'File Upload': {
    label: 'Upload File',
    fileDragDrop: true,
    fileMultiple: false,
    fileAccept: 'image/*',
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingTop: 32,
    paddingRight: 32,
    paddingBottom: 32,
    paddingLeft: 32,
  },
  'Color Picker': {
    label: 'Color',
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  'Range Slider': {
    label: 'Value',
    sliderMin: 0,
    sliderMax: 100,
    sliderStep: 1,
    sliderValue: 50,
    sliderShowValue: true,
  },
  
  // SELECTORS
  'Checkbox': {
    label: 'Accept terms and conditions',
    checkboxChecked: false,
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderWidth: 2,
    borderRadius: 4,
  },
  'Radio Group': {
    label: 'Select an option',
    radioOptions: ['Option 1', 'Option 2', 'Option 3'],
    radioSelectedIndex: 0,
  },
  'Switch': {
    label: 'Enable feature',
    switchChecked: false,
    switchSize: 'md',
    switchLabelPosition: 'right',
  },
  'Dropdown': {
    placeholder: 'Select an option',
    label: 'Choose',
    dropdownOptions: ['Option 1', 'Option 2', 'Option 3'],
    dropdownSelectedIndex: -1,
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
  },
  'Autocomplete': {
    placeholder: 'Type to search...',
    label: 'Search',
    dropdownOptions: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'],
    dropdownSearchable: true,
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 8,
  },
  
  // NAVIGATION
  'Nav Bar': {
    navbarOrientation: 'horizontal',
    navbarItems: ['Home', 'About', 'Services', 'Contact'],
    navbarActiveIndex: 0,
    backgroundColor: '#FFFFFF',
    textColor: '#374151',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    paddingTop: 16,
    paddingRight: 24,
    paddingBottom: 16,
    paddingLeft: 24,
  },
  'Tabs': {
    tabItems: ['Tab 1', 'Tab 2', 'Tab 3'],
    tabActiveIndex: 0,
    tabVariant: 'default',
    backgroundColor: '#FFFFFF',
    textColor: '#374151',
  },
  'Breadcrumbs': {
    breadcrumbItems: ['Home', 'Products', 'Electronics', 'Phones'],
    breadcrumbSeparator: 'chevron',
    textColor: '#6B7280',
  },
  'Pagination': {
    paginationTotal: 100,
    paginationCurrent: 1,
    paginationPageSize: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  'Stepper': {
    stepperSteps: ['Cart', 'Shipping', 'Payment', 'Confirm'],
    stepperCurrentStep: 1,
    stepperOrientation: 'horizontal',
    backgroundColor: '#FFFFFF',
    textColor: '#374151',
  },
  
  // CARDS & CONTAINERS
  'Basic Card': {
    cardTitle: 'Card Title',
    cardSubtitle: 'Card description text',
    text: 'This is the card content area. Add your content here.',
    cardShowHeader: true,
    cardShowFooter: true,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 12,
    boxShadowY: 4,
    boxShadowBlur: 6,
  },
  'Image Card': {
    cardTitle: 'Image Card',
    cardSubtitle: 'Beautiful scenery',
    cardImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    cardShowHeader: true,
    cardShowFooter: true,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  'Profile Card': {
    profileName: 'John Doe',
    profileRole: 'Software Engineer',
    profileAvatar: '',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    boxShadowY: 8,
    boxShadowBlur: 16,
  },
  'Accordion': {
    accordionItems: [
      { title: 'Section 1', content: 'Content for the first section' },
      { title: 'Section 2', content: 'Content for the second section' },
      { title: 'Section 3', content: 'Content for the third section' },
    ],
    accordionAllowMultiple: false,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
  },
  
  // FEEDBACK & INDICATORS
  'Tooltip': {
    tooltipContent: 'This is helpful information',
    tooltipPosition: 'top',
    tooltipTrigger: 'hover',
    text: 'Hover me',
  },
  'Alert': {
    alertType: 'info',
    alertTitle: 'Information',
    alertMessage: 'This is an informational message for the user.',
    alertDismissible: true,
    alertShowIcon: true,
    borderRadius: 8,
  },
  'Toast': {
    text: 'Action completed successfully',
    toastPosition: 'top-right',
    toastDuration: 3000,
    alertType: 'success',
    borderRadius: 8,
  },
  'Modal': {
    modalTitle: 'Modal Title',
    text: 'This is the modal content. You can add any content here.',
    modalOverlayOpacity: 0.5,
    modalCloseOnOverlay: true,
    modalAnimation: 'fade',
    modalShowClose: true,
    modalSize: 'md',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  'Badge': {
    badgeContent: 'New',
    badgeVariant: 'default',
    fontSize: 12,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    borderRadius: 9999,
  },
  'Progress Bar': {
    progressValue: 60,
    progressShowLabel: true,
    progressVariant: 'default',
    progressSize: 'md',
    backgroundColor: '#E5E7EB',
    borderRadius: 9999,
  },
  'Skeleton': {
    skeletonVariant: 'rectangular',
    skeletonAnimation: 'pulse',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
  },
  
  // DATA DISPLAY
  'Table': {
    tableColumns: ['Name', 'Email', 'Role'],
    tableRows: [
      ['John Doe', 'john@example.com', 'Admin'],
      ['Jane Smith', 'jane@example.com', 'User'],
      ['Bob Johnson', 'bob@example.com', 'Editor'],
    ],
    tableStriped: true,
    tableBordered: true,
    tableHoverable: true,
    backgroundColor: '#FFFFFF',
  },
  'Grid': {
    gridColumns: 3,
    gridGap: 16,
    gridItems: 6,
  },
  'Timeline': {
    timelineItems: [
      { title: 'Project Started', description: 'Initial project setup', date: 'Jan 1, 2024' },
      { title: 'Design Phase', description: 'UI/UX design completed', date: 'Feb 15, 2024' },
      { title: 'Development', description: 'Core features implemented', date: 'Apr 1, 2024' },
    ],
    timelineOrientation: 'vertical',
  },
  'Carousel': {
    carouselItems: ['Slide 1', 'Slide 2', 'Slide 3'],
    carouselAutoplay: true,
    carouselInterval: 3000,
    carouselShowDots: true,
    carouselShowArrows: true,
    borderRadius: 12,
  },
  
  // MEDIA & VISUALS
  'Image': {
    imageSrc: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    imageAlt: 'Mountain landscape',
    imageObjectFit: 'cover',
    borderRadius: 12,
  },
  'Avatar': {
    avatarFallback: 'JD',
    avatarSize: 'md',
    avatarShape: 'circle',
    avatarStatus: 'online',
  },
  'Icon': {
    iconName: 'Star',
    iconSize: 32,
    iconStrokeWidth: 2,
    textColor: '#3B82F6',
  },
  'Chart': {
    text: 'Sample Chart',
  },
  
  // LISTS
  'Simple List': {
    listItems: ['First item', 'Second item', 'Third item', 'Fourth item'],
    listStyleType: 'disc',
    textColor: '#374151',
  },
  'Icon List': {
    listItems: ['Feature one', 'Feature two', 'Feature three'],
    listIconName: 'Check',
    listStyleType: 'none',
    textColor: '#374151',
  },
  'Checkbox List': {
    listItems: ['Task 1', 'Task 2', 'Task 3', 'Task 4'],
    listCheckable: true,
    listCheckedItems: [0, 2],
    textColor: '#374151',
  },
  'Ordered List': {
    listItems: ['Step one', 'Step two', 'Step three', 'Step four'],
    listStyleType: 'decimal',
    textColor: '#374151',
  },
  
  // ADVANCED
  'Drag & Drop': {},
  'Split Pane': {},
  'Code Editor': {
    codeLanguage: 'javascript',
    codeContent: '// Your code here\nfunction hello() {\n  console.log("Hello, World!");\n}',
    fontFamily: 'monospace',
    fontSize: 14,
    backgroundColor: '#1E1E1E',
    textColor: '#D4D4D4',
  },
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
  componentConfig: { ...defaultComponentConfig, ...componentDefaults['Standard Button'] },
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedComponent: (component) => set({ 
    selectedComponent: component,
    componentConfig: { 
      ...defaultComponentConfig, 
      ...(componentDefaults[component] || {}) 
    },
    activeState: 'default',
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
  resetComponentConfig: () => set((state) => ({ 
    componentConfig: { 
      ...defaultComponentConfig, 
      ...(componentDefaults[state.selectedComponent] || {}) 
    } 
  })),
}));
