export function formatCurrency(amount: number){
    return new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'PEN'}).format(amount)

}