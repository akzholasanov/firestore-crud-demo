export const validateDigitInput = (
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  const allowedKeys = ['Delete', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'];

  if (
    /^\d$/.test(event.key) ||
    allowedKeys.includes(event.key) ||
    ((event.ctrlKey || event.metaKey) &&
      ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase()))
  ) {
    return;
  }

  event.preventDefault();
};
