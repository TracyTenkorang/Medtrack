export const capitalizeAll = (value) => {
    return value.toUpperCase();
  };

export const capitalizeFL = (value) => value.charAt(0).toUpperCase() + value.slice(1);

export const capitalizeAllFL = ( value ) => {
  return value.replace(/\b\w/g, (match) => match.toUpperCase());
};
