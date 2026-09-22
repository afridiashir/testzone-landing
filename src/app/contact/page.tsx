import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/data/contact";
import { BookingForm } from "./booking-form";

const title = "Contact & Home Sampling — Test Zone Diagnostic Centre";
const description =
  "Book free home sampling, request a report, or reach the Test Zone Diagnostic Centre patient care desk in Lahore.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description },
};

export default function ContactPage() {
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
        <div className="space-y-8 rounded-xl border border-slate-100 bg-slate-50 p-8 shadow-sm">
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
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Book Home Sampling</h2>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
