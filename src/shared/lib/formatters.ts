
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)
}

export const formatDate = (
  dateString: string,
  format: 'short' | 'long' = 'long'
): string => {
  const options: Intl.DateTimeFormatOptions =
    format === 'short'
      ? {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      : {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }

  return new Date(dateString).toLocaleString('es-MX', options)
}


export const useFormatters = () => {
  return {
    formatCurrency,
    formatDate,
  }
}
