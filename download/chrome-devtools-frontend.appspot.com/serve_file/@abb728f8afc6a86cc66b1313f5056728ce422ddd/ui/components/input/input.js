const e=new CSSStyleSheet;e.replaceSync('input[type="checkbox"]{width:12px;height:12px;accent-color:var(--sys-color-primary-bright);color:var(--sys-color-on-primary);position:relative;outline:none;display:flex;align-items:center;justify-content:center;&:hover::after,\n  &:active::before{content:"";height:24px;width:24px;border-radius:var(--sys-shape-corner-full);position:absolute}&:not(:disabled):hover::after{background-color:var(--sys-color-state-hover-on-subtle)}&:not(:disabled):active::before{background-color:var(--sys-color-state-ripple-neutral-on-subtle)}&:not(:disabled):focus-visible::before{content:"";height:15px;width:15px;border-radius:5px;position:absolute;border:2px solid var(--sys-color-state-focus-ring)}&.small:hover::after,\n  &.small:active::before{height:12px;width:12px;border-radius:2px}}\n/*# sourceURL=checkbox.css */\n');const o=new CSSStyleSheet;o.replaceSync(".devtools-text-input{height:32px;width:100%;padding:8px 11px;line-height:1.16;letter-spacing:0.015em;border:1px solid var(--sys-color-neutral-outline);color:var(--sys-color-on-surface);border-radius:3px;background-color:var(--sys-color-cdt-base-container);font-family:inherit;font-size:inherit}.devtools-text-input:focus-visible{outline:none;border-color:var(--sys-color-state-focus-ring)}.devtools-text-input::placeholder{color:var(--sys-color-state-disabled)}\n/*# sourceURL=textInput.css */\n");export{e as checkboxStyles,o as textInputStyles};