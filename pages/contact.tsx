import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { sendContact } from "@/utils/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      };
      await sendContact(payload);
      setStatus("✅ Message sent successfully!");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("❌ Failed to send message.");
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded" required />
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="border p-2 rounded" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="border p-2 rounded" required />
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="border p-2 rounded" required />
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="border p-2 rounded" rows={5} required />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Send Message</button>
        </form>
        {status && <p className="mt-4">{status}</p>}
      </main>
      <Footer />
    </>
  );
}
