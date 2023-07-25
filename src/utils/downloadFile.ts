export const downloadFile = (file: Blob, fileName: string) => {
  const element = document.createElement("a");

  element.href = URL.createObjectURL(file);
  element.download = fileName;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
