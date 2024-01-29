# msc-copy-button

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-copy-button) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/26380/branches/838396/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=26380&bid=838396)

Copy content is a very common feature to help user copy content easier. &lt;msc-copy-button /> provides the whole feature including UI & interaction. With &lt;msc-copy-button />, developers could adopt copy feature to web page easier.

![msc-copy-button](https://github.com/meistudioli/msc-copy-button/assets/10822546/05c730b2-7742-409d-adf9-e42168bd0a39)

## Basic Usage

&lt;msc-copy-button /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;msc-copy-button />'s html structure and everything will be all set.

- Required Script

```html
<script
  type="module"
  src="https://your-domain/wc-msc-copy-button.js">        
</script>
```

- Structure

Put &lt;msc-copy-button /> into HTML document. It will have different functions and looks with attribute mutation.

```html
<msc-copy-button>
  <script type="application/json">
    {
      "copycontent": "Show me the money."
    }
  </script>
</msc-copy-button>
```

Otherwise, developers could also choose remoteconfig to fetch config for &lt;msc-copy-button />.

```html
<msc-copy-button
  remoteconfig="https://your-domain/api-path"
>
</msc-copy-button>
```

## JavaScript Instantiation

&lt;msc-copy-content /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscCopyButton } from 'https://your-domain/wc-msc-copy-button.js';

// use DOM api
const nodeA = document.createElement('msc-copy-button');
document.body.appendChild(nodeA);
nodeA.copycontent = 'Show me the money';

// new instance with Class
const nodeB = new MscCopyButton();
document.body.appendChild(nodeB);
nodeB.copycontent = 'Show me the money';

// new instance with Class & default config
const config = {
  copycontent: 'Show me the money';
};
const nodeC = new MscCopyButton(config);
document.body.appendChild(nodeC);
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;msc-copy-button />'s looking.

```html
<style>
msc-copy-button {
  --msc-copy-button-size: 40px;

  --msc-copy-button-icon-copy-content-color: rgba(110 119 128);
  --msc-copy-button-icon-done-color: rgba(0 135 81);
  --msc-copy-button-icon-scale: 1;

  --msc-copy-button-button-background-color: rgba(0 0 0/.04);
  --msc-copy-button-button-overlay-color: rgba(29 34 40/.2);
  --msc-copy-button-button-active-scale: .85;
}
</style>
```

## Attributes

&lt;msc-copy-button /> supports some attributes to let it become more convenience & useful.

- **copycontent**

Set content for copy. Default is `""`（not set）. &lt;<msc-copy-button /> will throw error when empty content.

```html
<msc-copy-button
  copycontent="Show me the money"
>
  ...
</msc-copy-button>
```

## Property

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| copycontent | String | Getter / Setter content for copy. Default is empty string. |

## Events

| Event Signature | Description |
| ----------- | ----------- |
| msc-copy-button-success | Fired when copy success. Developers can gather information through `event.detail.content`. |
| msc-copy-button-fail | Fired when copy fail. Developers can gather information through `event.detail.message`. |


## Reference
- [&lt;msc-copy-button /> demo](https://blog.lalacube.com/mei/webComponent_msc-copy-button.html)
- [WEBCOMPONENTS.ORG](https://www.webcomponents.org/element/msc-copy-button)
- [YouTube](https://youtu.be/N9pSjB1INxU)


