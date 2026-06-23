"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  ArrowUpRight,
  Check,
  Calendar,
  Clock,
  ChevronDown,
} from "lucide-react";

/* ── Constants  */
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const WDAYS  = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const SIZES  = [
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "201–500 employees",
  "500+ employees",
];
const SLOTS  = [
  "9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM",
  "1:00 PM","1:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM",
  "4:00 PM","4:30 PM","5:00 PM",
];
const TEAM = [
  {
    name: "Niklas Rickmann",
    role: "Co-Founder & CEO",
    phone: "+49 17632 548460",
    email: "niklas@mvst.co",
    abbr: "NR",
  },
  {
    name: "Philipp Klaus",
    role: "Co-Founder & COO",
    phone: "+49 15158 801584",
    email: "philipp@mvst.co",
    abbr: "PK",
  },
];

/* ── Calendar helpers ────────────────────────────────────────────────────── */
function buildGrid(y: number, m: number) {
  const start = new Date(y, m, 1).getDay();
  const count = new Date(y, m + 1, 0).getDate();
  return [
    ...Array(start).fill(null),
    ...Array.from({ length: count }, (_, i) => i + 1),
  ];
}

function isSelectable(y: number, m: number, d: number) {
  const cell  = new Date(y, m, d);
  const floor = new Date();
  floor.setHours(0, 0, 0, 0);
  return cell >= floor && cell.getDay() !== 0 && cell.getDay() !== 6;
}

/* ── CSS keyframes (replace with framer-motion variants for production) ──── */
const ANIM_CSS = `
  @keyframes stepIn {
    from { opacity: 0; transform: translateX(22px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slotsIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pillIn {
    from { opacity: 0; transform: scale(0.82); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes checkPop {
    0%   { transform: scale(0) rotate(-25deg); opacity: 0; }
    65%  { transform: scale(1.18) rotate(6deg); opacity: 1; }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
  @keyframes successIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .step-in    { animation: stepIn   0.32s cubic-bezier(0.16,1,0.3,1) both; }
  .slots-in   { animation: slotsIn  0.24s ease-out both; }
  .slot-pill  { animation: pillIn   0.18s ease-out both; }
  .check-pop  { animation: checkPop 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.15s both; }
  .success-in { animation: successIn 0.5s ease-out both; }
`;

type InputFieldProps = {
  label: string;
  required?: boolean;
  error?: boolean;
  errMsg?: string;
  children: React.ReactNode;
};

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  size: string;
  email: string;
  message: string;
};

type LabelProps = {
  text: string;
  required?: boolean;
};

type FormErrors = Partial<Record<keyof FormState, boolean>>;

/* ── Sub-components ──────────────────────────────────────────────────────── */
function Label({ text, required }: LabelProps) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400 mb-1.5">
      {text}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

function InputField({ label, required, error, errMsg, children }: InputFieldProps) {
  return (
    <div>
      <Label text={label} required={required} />
      {children}
      {error && (
        <p className="text-red-400 text-[10px] mt-1 font-medium">
          {errMsg || "Required"}
        </p>
      )}
    </div>
  );
}

const inputCls = (err?: boolean): string =>
  `w-full bg-gray-50 px-3 py-3 text-sm outline-none transition-colors duration-150 placeholder:text-gray-300 caret-black ${
    err ? "ring-1 ring-red-300" : "focus:bg-gray-100"
  }`;

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function ContactPage() {
  const now = new Date();

  /* form state */
  const [step, setStep]         = useState(1);
const [form, setForm] = useState<FormState>({
  firstName: "",
  lastName: "",
  company: "",
  size: "",
  email: "",
  message: "",
});

const [errs, setErrs] = useState<FormErrors>({});
  const [sizeOpen, setSizeOpen] = useState(false);

  /* calendar state */
  const [calY, setCalY] = useState(now.getFullYear());
  const [calM, setCalM] = useState(now.getMonth());
  const [selD, setSelD] = useState(null);
const [selT, setSelT] = useState<string | null>(null);
  /* helpers */
const setF = <K extends keyof FormState>(k: K, v: FormState[K]) => {
  setForm((f) => ({ ...f, [k]: v }));
  setErrs((e) => ({ ...e, [k]: false }));
};

function validate(): boolean {
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const e: FormErrors = {
    firstName: !form.firstName.trim(),
    lastName: !form.lastName.trim(),
    company: !form.company.trim(),
    size: !form.size,
    email: !form.email.trim() || !emailRx.test(form.email),
  };

  setErrs(e);
  return !Object.values(e).some(Boolean);
}

  function prevMonth() {
    setSelD(null); setSelT(null);
    if (calM === 0) { setCalY((y) => y - 1); setCalM(11); }
    else setCalM((m) => m - 1);
  }
  function nextMonth() {
    setSelD(null); setSelT(null);
    if (calM === 11) { setCalY((y) => y + 1); setCalM(0); }
    else setCalM((m) => m + 1);
  }

  const grid = buildGrid(calY, calM);

  /* ─ Step 3: Success ──────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <style>{ANIM_CSS}</style>
        <div className="text-center max-w-sm success-in">
          <div className="w-20 h-20 bg-black flex items-center justify-center mx-auto mb-8 check-pop">
            <Check size={30} className="text-white" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black mb-2 tracking-tight">
            You&apos;re booked, {form.firstName}!
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            A confirmation is heading to your inbox. Our team will be in touch within 24 hours.
          </p>
          <div className="bg-gray-50 p-5 text-left space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={13} className="text-gray-400 flex-shrink-0" />
              <span className="font-semibold">
                {MONTHS[calM]} {selD}, {calY}
              </span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={13} className="text-gray-400 flex-shrink-0" />
              <span className="font-semibold">{selT}</span>
            </div>
            <div className="flex items-center gap-3 text-sm border-t border-gray-100 pt-3">
              <Mail size={13} className="text-gray-400 flex-shrink-0" />
              <span className="text-gray-500 truncate">{form.email}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setStep(1);
              setForm({ firstName:"",lastName:"",company:"",size:"",email:"",message:"" });
              setSelD(null); setSelT(null);
            }}
            className="text-xs font-bold text-gray-400 hover:text-black transition-colors underline underline-offset-4"
          >
            Book another meeting
          </button>
        </div>
      </div>
    );
  }

  /* ─ Main layout ──────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-white">
      <style>{ANIM_CSS}</style>

      {/* ── Body grid ── */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div>

          <h1 className="text-[2.4rem] font-black leading-[1.06] tracking-tight mb-4">
            Contruir nunca se ha vuelto tan fácil.
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xs">
            Solicite una demo con nuestro equipo profesional y descubre nuestras opciones.
          </p>
        </div>

        {/* ─────────── RIGHT ─────────── */}
        <div>
          {/* Stepper — square style matching "■ Let's Connect" motif */}
          <div className="flex items-center mb-9">
            {[
              { n: 1, l: "Contact" },
              { n: 2, l: "Schedule" },
              { n: 3, l: "Confirm" },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 flex items-center justify-center text-[10px] font-black transition-all duration-300 border-2
                      ${step >= s.n
                        ? "bg-black border-black text-white"
                        : "bg-white border-gray-200 text-gray-300"
                      }`}
                  >
                    {step > s.n ? (
                      <Check size={9} strokeWidth={3.5} />
                    ) : (
                      s.n
                    )}
                  </div>
                  <span
                    className={`text-xs font-bold transition-colors ${
                      step >= s.n ? "text-black" : "text-gray-300"
                    }`}
                  >
                    {s.l}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`h-px w-8 mx-3 transition-all duration-500 ${
                      step > s.n ? "bg-black" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ────── STEP 1 : Contact form ────── */}
          {step === 1 && (
            <div key="step-contact" className="step-in">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField label="First name" required error={errs.firstName}>
                  <input
                    value={form.firstName}
                    onChange={(e) => setF("firstName", e.target.value)}
                    placeholder="John"
                    className={inputCls(errs.firstName)}
                  />
                </InputField>
                <InputField label="Last name" required error={errs.lastName}>
                  <input
                    value={form.lastName}
                    onChange={(e) => setF("lastName", e.target.value)}
                    placeholder="Doe"
                    className={inputCls(errs.lastName)}
                  />
                </InputField>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField label="Company" required error={errs.company}>
                  <input
                    value={form.company}
                    onChange={(e) => setF("company", e.target.value)}
                    placeholder="Company GmbH"
                    className={inputCls(errs.company)}
                  />
                </InputField>

                {/* Company size dropdown */}
                <InputField label="Company size" required error={errs.size}>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setSizeOpen((o) => !o)}
                      className={`w-full bg-gray-50 px-3 py-3 text-sm text-left flex items-center justify-between hover:bg-gray-100 transition-colors ${
                        errs.size ? "ring-1 ring-red-300" : ""
                      }`}
                    >
                      <span className={form.size ? "text-black" : "text-gray-300"}>
                        {form.size || "Select size"}
                      </span>
                      <ChevronDown
                        size={13}
                        className={`text-gray-400 transition-transform duration-200 ${
                          sizeOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {sizeOpen && (
                      <>
                        {/* backdrop — click-outside to close */}
                        <div
                          className="fixed inset-0 z-20"
                          onClick={() => setSizeOpen(false)}
                        />
                        <div className="absolute z-30 top-full left-0 right-0 bg-white shadow-2xl border border-gray-100 py-1">
                          {SIZES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => {
                                setF("size", s);
                                setSizeOpen(false);
                              }}
                              className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                                form.size === s ? "font-bold text-black" : "text-gray-600"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </InputField>
              </div>

              <div className="mb-3">
                <InputField
                  label="Business Email"
                  required
                  error={errs.email}
                  errMsg="Valid email required"
                >
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setF("email", e.target.value)}
                    placeholder="john.doe@company.de"
                    className={inputCls(errs.email)}
                  />
                </InputField>
              </div>

              <div className="mb-7">
                <Label text="Your Message" />
                <textarea
                  value={form.message}
                  onChange={(e) => setF("message", e.target.value)}
                  placeholder="Tell us about your project…"
                  rows={4}
                  className="w-full bg-gray-50 px-3 py-3 text-sm outline-none focus:bg-gray-100 transition-colors resize-none placeholder:text-gray-300"
                />
              </div>

              <button
                type="button"
                onClick={() => validate() && setStep(2)}
                className="w-full bg-black text-white py-4 text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors group"
              >
                Continue — Pick a Date
                <Calendar
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            </div>
          )}

          {/* ────── STEP 2 : Calendar ────── */}
          {step === 2 && (
            <div key="step-calendar" className="step-in">
              {/* Calendar card */}
              <div className="border border-gray-100 p-5 mb-4 shadow-sm">
                {/* Month navigation */}
                <div className="flex items-center justify-between mb-5">
                  <button
                    type="button"
                    onClick={prevMonth}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <span className="text-sm font-black tracking-tight">
                    {MONTHS[calM]} {calY}
                  </span>
                  <button
                    type="button"
                    onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 mb-2">
                  {WDAYS.map((d) => (
                    <div
                      key={d}
                      className="text-center text-[9px] font-black text-gray-300 uppercase tracking-wider py-1"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-y-1.5">
                  {grid.map((day, i) => {
                    if (!day) return <div key={`_${i}`} />;
                    const avail  = isSelectable(calY, calM, day);
                    const isSel  = selD === day;
                    const isToday =
                      day === now.getDate() &&
                      calM === now.getMonth() &&
                      calY === now.getFullYear();

                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={!avail}
                        onClick={() => { setSelD(day); setSelT(null); }}
                        className={`mx-auto w-9 h-9 flex items-center justify-center text-xs font-semibold transition-all duration-100
                          ${isSel
                            ? "bg-black text-white scale-105"
                            : avail
                            ? "hover:bg-gray-100 text-black"
                            : "text-gray-200 cursor-default"
                          }
                          ${isToday && !isSel ? "font-black underline underline-offset-2" : ""}
                        `}
                        aria-label={`${MONTHS[calM]} ${day}`}
                        aria-pressed={isSel}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selD ? (
                <div className="mb-5 slots-in">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={11} className="text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {MONTHS[calM].slice(0, 3)} {selD} — choose a time
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {SLOTS.map((t, i) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelT(t)}
                        style={{ animationDelay: `${i * 22}ms` }}
                        className={`slot-pill py-2 text-xs font-semibold border transition-all duration-100
                          ${selT === t
                            ? "bg-black text-white border-black"
                            : "border-gray-200 text-gray-500 hover:border-gray-800 hover:text-black"
                          }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 mb-5 text-gray-300">
                  <Calendar size={13} />
                  <span className="text-xs">Select a date to see available times</span>
                </div>
              )}

              {/* Step 2 navigation */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-4 border border-gray-200 text-sm font-bold hover:bg-gray-50 flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft size={13} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!selD || !selT}
                  className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200
                    ${selD && selT
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  Get In Touch <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
        {/* ── end RIGHT ── */}
      </div>
    </div>
  );
}