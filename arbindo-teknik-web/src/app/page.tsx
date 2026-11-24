import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TicketTrackerSection from '@/components/TicketTrackerSection';
import WorkflowSection from '@/components/WorkflowSection';
import ContactLocationSection from '@/components/ContactLocationSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <TicketTrackerSection />
        <WorkflowSection />
        <ContactLocationSection />
      </main>
      <Footer />
    </div>
  );
}