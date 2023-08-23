export default function removeFileExtension(fileName) {
  const fileParts = fileName.split('.');
  const fileNameOnly = fileParts[0];
  return fileNameOnly;
}
