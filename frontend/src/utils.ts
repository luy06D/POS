export function formatCurrency(amount: number){
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'PEN'}).format(amount)

}


export function isValidPage(value: number) {
    if (value == null) {
      return false;
    }
    
    if (typeof value !== 'number' && isNaN(value)) {
      return false;
    }
    if (value <= 0) {
      return false;
    }
  
    if (!Number.isInteger(value)) {
      return false;
    }

    return true;
}