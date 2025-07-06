import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "@/components/TitleHeader";
import ContactExperience from "@/components/models/contact/ContactExperience";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear status when user starts typing
    if (status.type) {
      setStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      // Format current date and time as "12.35pm, 11.06.2025"
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      const displayHours = hours % 12 || 12;

      const day = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();

      const formattedTime = `${displayHours}.${minutes}${ampm}, ${day}.${month}.${year}`;

      // Send email with form data and additional time parameter
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        {
          name: form.name,
          email: form.email,
          message: form.message,
          time: formattedTime,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
      );

      // Reset form and show success message
      setForm({ name: "", email: "", message: "" });
      setStatus({
        type: "success",
        message:
          "Thank you! Your message has been sent successfully. I'll get back to you soon! 🚀",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message:
          "Oops! Something went wrong. Please try again or contact me directly via email. 😔",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="flex-center section-padding relative z-10">
      <div className="size-full px-5 md:px-10">
        <TitleHeader
          title="Get in Touch – Let's Connect"
          sub="💬 Have questions or ideas? Let's talk! 🚀"
        />
        <div className="grid-12-cols mt-16 xl:gap-0">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7">
                {/* Status Message */}
                {status.type && (
                  <div
                    className={`rounded-lg p-4 text-sm ${
                      status.type === "success"
                        ? "border border-green-200 bg-green-100 text-green-800"
                        : "border border-red-200 bg-red-100 text-red-800"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What's your name?"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="What's your email address?"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    rows={5}
                    required
                    disabled={loading}
                  />
                </div>

                <button type="submit" disabled={loading}>
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">{loading ? "Sending..." : "Send Message"}</p>
                    <div className="arrow-wrapper">
                      <img src="/images/icons/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className="relative min-h-96 xl:col-span-7">
            <div className="!size-full rounded-xl hover:cursor-grab xl:rounded-none">
              <ContactExperience />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
