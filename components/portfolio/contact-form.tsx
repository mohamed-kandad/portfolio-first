"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { makeContactSchema, type ContactInput } from "@/lib/contact-schema";
import type { Dictionary, Locale } from "@/content/locales";
export function ContactForm({
  configured,
  contact,
  locale,
  validation,
}: {
  configured: boolean;
  contact: Dictionary["contact"];
  locale: Locale;
  validation: Dictionary["ui"]["validation"];
}) {
  const [status, setStatus] = useState(""),
    [sent, setSent] = useState(false);
  const copy = contact.form;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(makeContactSchema(validation)),
  });
  const submit = async (values: ContactInput) => {
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": locale,
        },
        body: JSON.stringify(values),
      });
      const result: unknown = await response.json();
      if (!response.ok)
        throw new Error(
          typeof result === "object" &&
            result !== null &&
            "error" in result &&
            typeof result.error === "string"
            ? locale === "en"
              ? result.error
              : copy.error
            : copy.error,
        );
      setSent(true);
      setStatus(copy.success);
      reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : copy.error);
    }
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} noValidate>
      <div className="form-heading">
        {copy.heading}
        <ArrowUpRight size={18} />
      </div>
      <div className="form-row">
        <label>
          {copy.name}
          <input
            {...register("name")}
            autoComplete="name"
            placeholder={copy.namePlaceholder}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <small id="name-error" className="field-error">
              {errors.name.message}
            </small>
          )}
        </label>
        <label>
          {copy.email}
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder={copy.emailPlaceholder}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <small id="email-error" className="field-error">
              {errors.email.message}
            </small>
          )}
        </label>
      </div>
      <label>
        {copy.message}
        <textarea
          {...register("message")}
          rows={4}
          placeholder={copy.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <small id="message-error" className="field-error">
            {errors.message.message}
          </small>
        )}
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input {...register("website")} tabIndex={-1} autoComplete="off" />
      </label>
      <div className="form-bottom">
        <small className={configured ? "" : "delivery-pending"}>
          {configured ? copy.configured : copy.unconfigured}
        </small>
        <button
          type="submit"
          className="button button-primary"
          disabled={isSubmitting || !configured}
        >
          {isSubmitting ? copy.sending : sent ? copy.again : copy.send}
          {isSubmitting ? (
            <LoaderCircle size={17} className="spin" />
          ) : (
            <ArrowUpRight size={17} />
          )}
        </button>
      </div>
      <p role="status" className="form-status">
        {status}
      </p>
    </form>
  );
}
