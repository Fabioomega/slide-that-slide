export const formatFrame = (content, zoomOut = false) => {
    const html = content.html;
    const js = content.js;
    const css = content.css;

    let zoom = `<style>body {
      transform: scale(0.25);
      transform-origin: top left;
      width: 400%;
      height: 400%;
    }</style>`;

    return `<!DOCTYPE html>
<html>
<head>
    ${(zoomOut ? zoom : "")}
    <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}${"<\/script>"}
</body>
</html>`
}