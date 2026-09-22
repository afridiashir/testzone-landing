"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/data/contact";

export function BookingForm() {
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
        className="w-full bg-green-600 py-6 text-lg text-white hover:bg-green-700"
      >
        Book via WhatsApp
      </Button>
    </form>
  );
}
