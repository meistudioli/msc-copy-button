import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

const defaults = {
  copycontent: ''
};

const booleanAttrs = []; // booleanAttrs default should be false
const objectAttrs = ['collages'];
const custumEvents = {
  success: 'msc-copy-button-success',
  fail: 'msc-copy-button-fail'
};
const durations = {
  transition: 250,
  freeze: 2000
};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host{position:relative;inline-size:fit-content;display:block}

.main {
  --transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  --icon-copy-content: path('M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z');
  --icon-done: path('M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z');

  --size: var(--msc-copy-button-size, 40px);
  --icon-copy-content-color: var(--msc-copy-button-icon-copy-content-color, rgba(110 119 128));
  --icon-done-color: var(--msc-copy-button-icon-done-color, rgba(0 135 81));
  --icon-scale: var(--msc-copy-button-icon-scale, 1);
  --button-background-color: var(--msc-copy-button-button-background-color, rgba(0 0 0/.04));
  --button-overlay-color: var(--msc-copy-button-button-overlay-color, rgba(29 34 40/.2));
  --button-active-scale: var(--msc-copy-button-button-active-scale, .85);

  --copy-scale-normal: 1;
  --copy-scale-active: 0;
  --copy-scale: var(--copy-scale-normal);

  --done-scale-normal: 0;
  --done-scale-active: 1;
  --done-scale: var(--done-scale-normal);

  --button-overlay-opacity-normal: 0;
  --button-overlay-opacity-active: 1;
  --button-overlay-opacity: var(--button-overlay-opacity-normal);

  position: relative;
  font-size: 0;
  inline-size: var(--size);
  aspect-ratio: 1/1;
  appearance: none;
  box-shadow: unset;
  border: unset;
  background: transparent;
  user-select: none;
  margin: 0;
  padding: 0;
  outline: 0 none;
  background-color: var(--button-background-color);
  border-radius: var(--size);
  display: grid;
  place-content: center;

  &:active {
    scale: var(--button-active-scale);
  }

  &.main--active {
    --copy-scale: var(--copy-scale-active);
    --done-scale: var(--done-scale-active);

    pointer-events: none;
  }

  &:after {
    position: absolute;
    inset-inline-start: 0;
    inset-block-start: 0;
    inline-size: 100%;
    block-size: 100%;
    content: '';
    background-color: var(--button-overlay-color);
    opacity: var(--button-overlay-opacity);
    transition: opacity 200ms var(--transition-timing-function);
    pointer-events: none;
    border-radius: var(--size);
  }

  &:focus-visible {
    --button-overlay-opacity: var(--button-overlay-opacity-active);
  }

  @media (hover: hover) {
    &:hover {
      --button-overlay-opacity: var(--button-overlay-opacity-active);
    }
  }

  .main__icons {
    position: relative;
    font-size: 0;
    inline-size: 24px;
    aspect-ratio: 1/1;
    display: block;
    scale: var(--icon-scale);
    z-index: 1;

    &::before,&::after {
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: 0;
      content: '';
      inline-size: 100%;
      block-size: 100%;
      transition: scale ${durations.transition}ms var(--transition-timing-function) 100ms;
      will-change: scale;
    }

    &::before {
      clip-path: var(--icon-copy-content);
      background-color: var(--icon-copy-content-color);
      scale: var(--copy-scale);
    }

    &::after {
      clip-path: var(--icon-done);
      background-color: var(--icon-done-color);
      scale: var(--done-scale);
    }
  }
}
</style>

<button type="button" class="main" ontouchstart="">
  <span class="main__icons">copy</span>
</button
`;

// Houdini Props and Vals, https://web.dev/at-property/
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-copy-button-size',
      syntax: '<length>',
      inherits: true,
      initialValue: '40px'
    });

    CSS.registerProperty({
      name: '--msc-copy-button-icon-copy-content-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(110 119 128)'
    });

    CSS.registerProperty({
      name: '--msc-copy-button-icon-done-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(0 135 81)'
    });

    CSS.registerProperty({
      name: '--msc-copy-button-icon-scale',
      syntax: '<number>',
      inherits: true,
      initialValue: '1'
    });

    CSS.registerProperty({
      name: '--msc-copy-button-button-background-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(0 0 0/.04)'
    });

    CSS.registerProperty({
      name: '--msc-copy-button-button-overlay-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(29 34 40/.2)'
    });

    CSS.registerProperty({
      name: '--msc-copy-button-button-active-scale',
      syntax: '<number>',
      inherits: true,
      initialValue: '.85'
    });
  } catch(err) {
    console.warn(`msc-copy-button: ${err.message}`);
  }
}

export class MscCopyButton extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: false });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      tid: '',
      duration: durations.transition + durations.freeze
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      button: this.shadowRoot.querySelector('.main')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscCopyButton(config)
    };

    // evts
    this._onClick = this._onClick.bind(this);
  }

  async connectedCallback() {
   const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    this.#nodes.button.addEventListener('click', this._onClick, { signal });
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'copycontent': {
          this.#config[attrName] = String(newValue).trim() || defaults.copycontent;
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscCopyButton.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'copycontent':
        this.#clearButtonStatus();
        break;
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscCopyButton.observedAttributes
  }

  static get supportedEvents() {
    return Object.keys(custumEvents).map(
      (key) => {
        return custumEvents[key];
      }
    );
  }

  #upgradeProperty(prop) {
    let value;

    if (MscCopyButton.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set copycontent(value) {
    if (value) {
      this.setAttribute('copycontent', value);
    } else {
      this.removeAttribute('copycontent');
    }
  }

  get copycontent() {
    return this.#config.copycontent;
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  #clearButtonStatus() {
    clearTimeout(this.#data.tid);
    this.#nodes.button.classList.remove('main--active');
  }

  async _onClick() {
    const { button } = this.#nodes;
    let error = '';

    this.#clearButtonStatus();

    if (!this.copycontent.length) {
      error = 'no content exist.';
    } else {
      try {
        await navigator.clipboard.writeText(this.copycontent);
      } catch (err) {
        error = err?.message || 'unknow error occured.';
      }
    }

    if (error.length) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.#fireEvent(custumEvents.fail, { message:error });
    } else {
      button.classList.toggle('main--active');
      this.#data.tid = setTimeout(
        () => {
          button.classList.remove('main--active');
        }
      , this.#data.duration);

      this.#fireEvent(custumEvents.success, { content:this.copycontent });
    }
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscCopyButton');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscCopyButton'), MscCopyButton);
}