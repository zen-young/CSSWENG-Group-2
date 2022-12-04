
const OrderSummary = ({itemcount, totalprice, quotecount}) => {
    return (
      <>
        <div className="w-full order p-3 px-6 border-solid border-2 border-gray-600 rounded-md bg-gray-100">
          <span className="font-bold text-2xl">Order Summary</span>
          <div className="mt-[20px] text-xl flex justify-between">
            <span>Total ({itemcount} items)</span>
            <span>₱{totalprice}</span>
          </div>

          {/* TODO: If quotecount=0, do not display this */}
          <div className="mt-[10px] text-xl flex justify-between">
            <span className="pl-[20px]">Quotations ({quotecount} items)</span>
            <span className="italic">PENDING</span>
          </div>

        </div>
      </>
    );
}

export default OrderSummary;