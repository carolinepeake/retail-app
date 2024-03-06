import { format, parseISO } from 'date-fns';

export const capitalizeFirstLetter = (string) => {
  const formattedString = string.charAt(0).toUpperCase() + string.slice(1);
  return formattedString;
};

export const formatDate = (date) => (
  format(parseISO(date), 'MMM dd, yyyy')
);

export const removeFileExtension = (fileName) => {
  if (typeof fileName !== 'string') {
    return null;
  }

  const fileParts = fileName.split('.');
  const fileNameOnly = fileParts[0];
  return fileNameOnly;
};
