const useCalculateCartTotal = (products) => {
  const total = products?.reduce((acc, element) => {
    // acc += element.price * element.quantity;
    acc += element.price;
    return acc;
  }, 0);

  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
};

export default useCalculateCartTotal;
