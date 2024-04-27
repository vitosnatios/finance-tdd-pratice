export const numberToDolar = (n: number) =>
  Number(n).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
