import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/data/contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    testName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, address, testName } = formData;

    // WhatsApp message format
    const message = `*New Home Sampling Booking*%0A%0A*Patient Name:* ${name}%0A*Phone:* ${phone}%0A*Address:* ${address}%0A*Test Required:* ${testName}`;

    window.open(`https://wa.me/${contact.whatsapp.number}?text=${message}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">Contact & Home Sampling</h1>
        <p className="text-lg text-slate-600">
          Book home sampling, request a report, or reach our patient care desk 24/7.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Left Side: Contact Information */}
        <div className="space-y-8 rounded-xl bg-slate-50 p-8 shadow-sm border border-slate-100">
          <h2 className="text-2xl font-semibold text-slate-900">Get in Touch</h2>

          <div className="flex items-start space-x-4">
            <Phone className="mt-1 h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-slate-900">Phone</h3>
              <a href={contact.phone.href} className="text-slate-600 hover:text-green-600">
                {contact.phone.display}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Mail className="mt-1 h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-slate-900">Email</h3>
              <a href={contact.email.href} className="text-slate-600 hover:text-green-600">
                {contact.email.display}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MessageCircle className="mt-1 h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-slate-900">WhatsApp</h3>
              <a
                href={contact.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="text-slate-600 hover:text-green-600"
              >
                {contact.whatsapp.display}
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <MapPin className="mt-1 h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-slate-900">{contact.headOffice.label}</h3>
              <p className="text-slate-600">{contact.headOffice.address}</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <Clock className="mt-1 h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-medium text-slate-900">Hours</h3>
              <p className="text-slate-600">Collection centres open 24/7</p>
            </div>
          </div>
        </div>

        {/* Right Side: Booking Form */}
        <div className="rounded-xl bg-white p-8 shadow-lg border border-slate-200">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Book Home Sampling</h2>
          <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="03XX XXXXXXX"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="testName">Test / Package Required</Label>
              <Input
                id="testName"
                name="testName"
                placeholder="e.g. Complete Blood Count (CBC)"
                value={formData.testName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Home Address for Sampling</Label>
              <Textarea
                id="address"
                name="address"
                placeholder="Enter complete house address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
            >
              Book via WhatsApp
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
