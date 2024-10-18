export const getRealPrice = (price: number) => {
  return typeof price !== 'number' ? null : Number((price / 100).toFixed(2)) // 分转元
}
