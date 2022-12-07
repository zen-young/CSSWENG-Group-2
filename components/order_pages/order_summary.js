const OrderSummary = ({ cart }) => {
  const itemcount = cart.length;
  const totalprice = cart.reduce(
    (accumulator, cartItem) =>
      cartItem.price === "PENDING"
        ? accumulator
        : accumulator + Number(cartItem.price),
    0
  );
  const quotecount = cart.reduce(
    (accumulator, cartItem) =>
      cartItem.price === "PENDING" ? (accumulator += 1) : accumulator,
    0
  );

  return (
    <>
      <div className="w-full order p-3 px-6 border-solid border-2 border-gray-600 rounded-md bg-gray-100">
        <span className="font-bold text-2xl">Order Summary</span>
        <div className="mt-[20px] text-xl flex justify-between">
          <span>Total ({itemcount} items)</span>
          <span>₱{totalprice}</span>
        </div>

        {quotecount > 0 && (
          <div className="mt-[10px] text-xl flex justify-between">
            <span className="pl-[20px]">Quotations ({quotecount} items)</span>
            <span className="italic">PENDING</span>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderSummary;
