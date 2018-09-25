function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('src', ev.target.id);
}

function drop(ev) {
  ev.preventDefault ();
  const src = document.getElementById (ev.dataTransfer.getData ('src'));
  const srcParent = src.parentNode;
  const tgt = ev.currentTarget.firstElementChild;

  ev.currentTarget.replaceChild (src, tgt);
  srcParent.appendChild (tgt);
}
