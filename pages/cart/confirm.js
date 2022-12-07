import { useRouter } from "next/router";
import React from "react";
import Confirm_Page from "../../components/order_pages/order_confirm";

function Confirm() {
  const router = useRouter();

  return <Confirm_Page query={router.query} />;
}

export default Confirm;
