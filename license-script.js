const documents = [
  { filename: "license1.pdf", url: "assets/sample1.pdf" },
  { filename: "license2.pdf", url: "assets/sample2.pdf" },
  { filename: "license3.pdf", url: "assets/sample3.pdf" },
  { filename: "license4.pdf", url: "assets/sample4.pdf" }
];

const grid = document.getElementById("documentsGrid");

documents.forEach(doc => {
  const link = document.createElement("a");
  link.href = doc.url;
  link.target = "_blank"; // opens in new tab
  link.className = "card";

  let content;
  if (doc.filename.endsWith(".pdf")) {
    content = `<iframe src="${doc.url}#view=FitH&toolbar=0&navpanes=0"></iframe>`;
  } else {
    content = `<img src="${doc.url}" />`;
  }

  link.innerHTML = content + `<div class="overlay">${doc.filename}</div>`;
  grid.appendChild(link);
});


