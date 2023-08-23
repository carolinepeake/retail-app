import { format, parseISO } from 'date-fns';

export const capitalizeFirstLetter = (string) => {
  const formattedString = string.charAt(0).toUpperCase() + string.slice(1);
  return formattedString;
};

export const formatDate = (date) => (
  format(parseISO(date), 'MMMM dd, yyyy')
);

export const removeFileExtension = (fileName) => {
  const fileParts = fileName.split('.');
  const fileNameOnly = fileParts[0];
  return fileNameOnly;
};
