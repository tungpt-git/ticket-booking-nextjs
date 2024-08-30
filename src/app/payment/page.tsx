import { PaymentComplete } from "./sections/PaymentComplete";

export default async function Payment() {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
        <PaymentComplete selectedSeat={[]} />
    </div>
  );
}
