// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".popup-content{margin:auto;background:#fff;width:50%;padding:5px;border:1px solid #d7d7d7}[role=tooltip].popup-content{width:200px;box-shadow:0 0 3px rgba(0,0,0,.16);border-radius:5px}.popup-overlay{background:rgba(0,0,0,.5)}[data-popup=tooltip].popup-overlay{background:transparent}.popup-arrow{-webkit-filter:drop-shadow(0 -3px 3px rgba(0,0,0,.16));filter:drop-shadow(0 -3px 3px rgba(0,0,0,.16));color:#fff;stroke-width:2px;stroke:#d7d7d7;stroke-dasharray:30px;stroke-dashoffset:-54px;left:0;right:0;top:0;bottom:0}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}