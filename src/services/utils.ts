export const getRatingWidth = (rate: number): string => `${(rate / 5) * 100}%`;
export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
};
