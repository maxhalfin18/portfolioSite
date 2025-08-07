// Advanced Accessibility System
class AccessibilitySystem {
    constructor() {
        this.isOpen = false;
        this.settings = {
            fontSize: 16,
            contrast: 'normal',
            grayscale: false,
            highContrast: false,
            underlineLinks: false,
            focusIndicator: true,
            reducedMotion: false,
            spacing: 'normal',
            cursor: 'normal'
        };
        this.init();
    }

    init() {
        this.createButton();
        this.createPanel();
        this.loadSettings();
        this.applySettings();
        this.bindEvents();
    }

    createButton() {
        this.button = document.createElement('div');
        this.button.id = 'accessibility-button';
        this.button.className = 'accessibility-btn';
        this.button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
                <path d="M19 7H17V6C17 5.45 16.55 5 16 5H8C7.45 5 7 5.45 7 6V7H5C4.45 7 4 7.45 4 8V19C4 19.55 4.45 20 5 20H19C19.55 20 20 19.55 20 19V8C20 7.45 19.55 7 19 7ZM18 18H6V9H8V10C8 10.55 8.45 11 9 11H15C15.55 11 16 10.55 16 10V9H18V18Z" fill="currentColor"/>
                <path d="M12 12C10.9 12 10 12.9 10 14C10 15.1 10.9 16 12 16C13.1 16 14 15.1 14 14C14 12.9 13.1 12 12 12Z" fill="currentColor"/>
            </svg>
        `;
        this.button.setAttribute('aria-label', 'פתח תפריט נגישות');
        this.button.setAttribute('role', 'button');
        this.button.setAttribute('tabindex', '0');
        
        document.body.appendChild(this.button);
    }

    createPanel() {
        this.panel = document.createElement('div');
        this.panel.id = 'accessibility-panel';
        this.panel.className = 'accessibility-panel';
        this.panel.innerHTML = `
            <div class="accessibility-header">
                <h3>הגדרות נגישות</h3>
                <button class="close-btn" aria-label="סגור תפריט נגישות">×</button>
            </div>
            <div class="accessibility-content">
                <div class="accessibility-section">
                    <h4>גודל טקסט</h4>
                    <div class="font-size-controls">
                        <button class="font-btn" data-action="decrease" aria-label="הקטן טקסט">A-</button>
                        <span class="font-size-display">${this.settings.fontSize}px</span>
                        <button class="font-btn" data-action="increase" aria-label="הגדל טקסט">A+</button>
                        <button class="font-btn" data-action="reset" aria-label="איפוס גודל טקסט">איפוס</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h4>ניגודיות</h4>
                    <div class="contrast-controls">
                        <button class="contrast-btn" data-contrast="normal" aria-label="ניגודיות רגילה">רגיל</button>
                        <button class="contrast-btn" data-contrast="high" aria-label="ניגודיות גבוהה">גבוה</button>
                        <button class="contrast-btn" data-contrast="inverted" aria-label="ניגודיות הפוכה">הפוך</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h4>צבעים</h4>
                    <div class="color-controls">
                        <button class="color-btn" data-color="normal" aria-label="צבעים רגילים">רגיל</button>
                        <button class="color-btn" data-color="grayscale" aria-label="גווני אפור">גווני אפור</button>
                        <button class="color-btn" data-color="highContrast" aria-label="ניגודיות גבוהה">ניגודיות גבוהה</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h4>מרווחים</h4>
                    <div class="spacing-controls">
                        <button class="spacing-btn" data-spacing="normal" aria-label="מרווחים רגילים">רגיל</button>
                        <button class="spacing-btn" data-spacing="increased" aria-label="מרווחים מוגדלים">מוגדל</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h4>קישורים</h4>
                    <div class="link-controls">
                        <button class="link-btn" data-action="underline" aria-label="הוסף קו תחתון לקישורים">קו תחתון לקישורים</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h4>תנועה</h4>
                    <div class="motion-controls">
                        <button class="motion-btn" data-action="reducedMotion" aria-label="הפחת תנועה">הפחת תנועה</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h4>מיקוד</h4>
                    <div class="focus-controls">
                        <button class="focus-btn" data-action="focusIndicator" aria-label="הצג אינדיקטור מיקוד">הצג אינדיקטור מיקוד</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <h4>עכבר</h4>
                    <div class="cursor-controls">
                        <button class="cursor-btn" data-cursor="normal" aria-label="עכבר רגיל">רגיל</button>
                        <button class="cursor-btn" data-cursor="large" aria-label="עכבר גדול">גדול</button>
                    </div>
                </div>
                
                <div class="accessibility-section">
                    <button class="reset-all-btn" data-action="resetAll" aria-label="איפוס כל ההגדרות">איפוס כל ההגדרות</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.panel);
    }

    bindEvents() {
        // Button click events
        this.button.addEventListener('click', () => this.togglePanel());
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.togglePanel();
            }
        });

        // Panel close button
        const closeBtn = this.panel.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => this.closePanel());

        // Font size controls
        const fontBtns = this.panel.querySelectorAll('.font-btn');
        fontBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleFontSize(action);
            });
        });

        // Contrast controls
        const contrastBtns = this.panel.querySelectorAll('.contrast-btn');
        contrastBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const contrast = e.target.dataset.contrast;
                this.handleContrast(contrast);
            });
        });

        // Color controls
        const colorBtns = this.panel.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.handleColor(color);
            });
        });

        // Spacing controls
        const spacingBtns = this.panel.querySelectorAll('.spacing-btn');
        spacingBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const spacing = e.target.dataset.spacing;
                this.handleSpacing(spacing);
            });
        });

        // Link controls
        const linkBtns = this.panel.querySelectorAll('.link-btn');
        linkBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleLinks(action);
            });
        });

        // Motion controls
        const motionBtns = this.panel.querySelectorAll('.motion-btn');
        motionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleMotion(action);
            });
        });

        // Focus controls
        const focusBtns = this.panel.querySelectorAll('.focus-btn');
        focusBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleFocus(action);
            });
        });

        // Cursor controls
        const cursorBtns = this.panel.querySelectorAll('.cursor-btn');
        cursorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cursor = e.target.dataset.cursor;
                this.handleCursor(cursor);
            });
        });

        // Reset all button
        const resetAllBtn = this.panel.querySelector('.reset-all-btn');
        resetAllBtn.addEventListener('click', () => this.resetAll());

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.button.contains(e.target) && !this.panel.contains(e.target)) {
                this.closePanel();
            }
        });

        // Close panel on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closePanel();
            }
        });
    }

    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    openPanel() {
        this.panel.classList.add('open');
        this.button.classList.add('active');
        this.isOpen = true;
        this.button.setAttribute('aria-expanded', 'true');
    }

    closePanel() {
        this.panel.classList.remove('open');
        this.button.classList.remove('active');
        this.isOpen = false;
        this.button.setAttribute('aria-expanded', 'false');
    }

    handleFontSize(action) {
        switch (action) {
            case 'increase':
                this.settings.fontSize = Math.min(this.settings.fontSize + 2, 24);
                break;
            case 'decrease':
                this.settings.fontSize = Math.max(this.settings.fontSize - 2, 12);
                break;
            case 'reset':
                this.settings.fontSize = 16;
                break;
        }
        this.updateFontSizeDisplay();
        this.applySettings();
        this.saveSettings();
    }

    handleContrast(contrast) {
        this.settings.contrast = contrast;
        this.updateButtonStates('.contrast-btn', 'data-contrast', contrast);
        this.applySettings();
        this.saveSettings();
    }

    handleColor(color) {
        if (color === 'grayscale') {
            this.settings.grayscale = !this.settings.grayscale;
            this.settings.highContrast = false;
        } else if (color === 'highContrast') {
            this.settings.highContrast = !this.settings.highContrast;
            this.settings.grayscale = false;
        } else {
            this.settings.grayscale = false;
            this.settings.highContrast = false;
        }
        this.updateButtonStates('.color-btn', 'data-color', color);
        this.applySettings();
        this.saveSettings();
    }

    handleSpacing(spacing) {
        this.settings.spacing = spacing;
        this.updateButtonStates('.spacing-btn', 'data-spacing', spacing);
        this.applySettings();
        this.saveSettings();
    }

    handleLinks(action) {
        this.settings.underlineLinks = !this.settings.underlineLinks;
        this.updateButtonStates('.link-btn', 'data-action', action);
        this.applySettings();
        this.saveSettings();
    }

    handleMotion(action) {
        this.settings.reducedMotion = !this.settings.reducedMotion;
        this.updateButtonStates('.motion-btn', 'data-action', action);
        this.applySettings();
        this.saveSettings();
    }

    handleFocus(action) {
        this.settings.focusIndicator = !this.settings.focusIndicator;
        this.updateButtonStates('.focus-btn', 'data-action', action);
        this.applySettings();
        this.saveSettings();
    }

    handleCursor(cursor) {
        this.settings.cursor = cursor;
        this.updateButtonStates('.cursor-btn', 'data-cursor', cursor);
        this.applySettings();
        this.saveSettings();
    }

    resetAll() {
        this.settings = {
            fontSize: 16,
            contrast: 'normal',
            grayscale: false,
            highContrast: false,
            underlineLinks: false,
            focusIndicator: true,
            reducedMotion: false,
            spacing: 'normal',
            cursor: 'normal'
        };
        this.updateFontSizeDisplay();
        this.updateAllButtonStates();
        this.applySettings();
        this.saveSettings();
    }

    updateFontSizeDisplay() {
        const display = this.panel.querySelector('.font-size-display');
        if (display) {
            display.textContent = `${this.settings.fontSize}px`;
        }
    }

    updateButtonStates(selector, attribute, value) {
        const buttons = this.panel.querySelectorAll(selector);
        buttons.forEach(btn => {
            if (btn.dataset[attribute.replace('data-', '')] === value) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    updateAllButtonStates() {
        // Update contrast buttons
        this.updateButtonStates('.contrast-btn', 'data-contrast', this.settings.contrast);
        
        // Update color buttons
        let activeColor = 'normal';
        if (this.settings.grayscale) activeColor = 'grayscale';
        if (this.settings.highContrast) activeColor = 'highContrast';
        this.updateButtonStates('.color-btn', 'data-color', activeColor);
        
        // Update spacing buttons
        this.updateButtonStates('.spacing-btn', 'data-spacing', this.settings.spacing);
        
        // Update cursor buttons
        this.updateButtonStates('.cursor-btn', 'data-cursor', this.settings.cursor);
        
        // Update other buttons
        this.updateButtonStates('.link-btn', 'data-action', 'underline');
        this.updateButtonStates('.motion-btn', 'data-action', 'reducedMotion');
        this.updateButtonStates('.focus-btn', 'data-action', 'focusIndicator');
    }

    applySettings() {
        const root = document.documentElement;
        
        // Apply font size
        root.style.setProperty('--accessibility-font-size', `${this.settings.fontSize}px`);
        
        // Apply contrast
        root.classList.remove('accessibility-contrast-normal', 'accessibility-contrast-high', 'accessibility-contrast-inverted');
        root.classList.add(`accessibility-contrast-${this.settings.contrast}`);
        
        // Apply color settings
        root.classList.toggle('accessibility-grayscale', this.settings.grayscale);
        root.classList.toggle('accessibility-high-contrast', this.settings.highContrast);
        
        // Apply spacing
        root.classList.remove('accessibility-spacing-normal', 'accessibility-spacing-increased');
        root.classList.add(`accessibility-spacing-${this.settings.spacing}`);
        
        // Apply link underlines
        root.classList.toggle('accessibility-underline-links', this.settings.underlineLinks);
        
        // Apply reduced motion
        root.classList.toggle('accessibility-reduced-motion', this.settings.reducedMotion);
        
        // Apply focus indicator
        root.classList.toggle('accessibility-focus-indicator', this.settings.focusIndicator);
        
        // Apply cursor
        root.classList.remove('accessibility-cursor-normal', 'accessibility-cursor-large');
        root.classList.add(`accessibility-cursor-${this.settings.cursor}`);
    }

    loadSettings() {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
            try {
                this.settings = { ...this.settings, ...JSON.parse(saved) };
            } catch (e) {
                console.warn('Failed to load accessibility settings:', e);
            }
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
        } catch (e) {
            console.warn('Failed to save accessibility settings:', e);
        }
    }
}

// Initialize accessibility system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AccessibilitySystem();
});
