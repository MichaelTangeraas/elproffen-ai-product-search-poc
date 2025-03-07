import Chatbot from "~/components/features/chatbot/chatbot-interface";
import { CartButton } from "~/components/features/cart/cart-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CartButton />
      <Chatbot />
    </main>
  );
}
