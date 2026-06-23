import About from "@/components/About";
import Customers from "@/components/Customers";
import Header from "@/components/Header";
import Solutions from "@/components/Solutions";
import TrustedClients from "@/components/Trusted-Clients";

export default function HomePage() {
  return (
    <main className="">
      <Header />
      <TrustedClients />
      <Solutions />
      <Customers />
      <About />
    </main>
  )
}