import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Websites from './components/Websites';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ServiceDetailModal from './components/ServiceDetailModal';
import './App.css';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [activeContactService, setActiveContactService] = useState('Basic Website');

  const handleOpenContact = (packageName) => {
    if (packageName) {
      setActiveContactService(packageName);
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (packageName) {
      // Pre-select package in inquiry form if dropdown exists
      const selectElem = document.getElementById('project-type');
      if (selectElem) {
        const option = Array.from(selectElem.options).find(
          (opt) =>
            opt.value.toLowerCase().includes(packageName.toLowerCase()) ||
            opt.text.toLowerCase().includes(packageName.toLowerCase())
        );
        if (option) {
          selectElem.value = option.value;
          // Dispatch change event to sync React state
          selectElem.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  };

  return (
    <div className="app-wrapper">
      {/* Fixed/Sticky Navigation */}
      <Navbar onOpenContact={() => handleOpenContact()} />

      {/* Main Content Sections:
          1. Home
          2. Our Work
          3. Services (7 Website & Web Solutions Offerings)
          4. Reviews (Client Experiences)
          5. Contact / CTA
          6. FAQ
      */}
      <main id="main-content">
        {/* 1. Home / Hero Section */}
        <Hero onOpenContact={() => handleOpenContact()} />

        {/* 2. Our Work (Portfolio Showcase) */}
        <Websites onSelectProject={(project) => setSelectedProject(project)} />

        {/* 3. Services (7 Service Cards with View Details & CTAs) */}
        <Services
          onOpenContact={handleOpenContact}
          onOpenServiceDetails={(service) => setSelectedServiceModal(service)}
        />

        {/* 4. Reviews (Genuine Client Reviews) */}
        <Testimonials />

        {/* 5. Contact / CTA Form */}
        <Contact selectedService={activeContactService} />

        {/* 6. FAQ (Frequently Asked Questions) */}
        <FAQ onOpenContact={() => handleOpenContact()} />
      </main>

      {/* Footer */}
      <Footer onSelectService={handleOpenContact} />

      {/* Interactive Project Preview Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartProject={() => handleOpenContact()}
        />
      )}

      {/* Interactive Service Detail Modal */}
      {selectedServiceModal && (
        <ServiceDetailModal
          service={selectedServiceModal}
          onClose={() => setSelectedServiceModal(null)}
          onSelectService={handleOpenContact}
        />
      )}
    </div>
  );
}

export default App;
