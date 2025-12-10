import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ----------------------
// STEP SCHEMAS (Example)
// ----------------------
const Step1Schema = z.object({
  fullName: z.string().min(2, "Full Name required"),
});
const Step2Schema = z.object({
  phone: z.string().min(10, "Phone required"),
});
const Step3Schema = z.object({
  email: z.string().email("Invalid email"),
});
const Step4Schema = z.object({
  companyName: z.string().min(1, "Company required"),
});
const Step5Schema = z.object({
  address: z.string().min(3, "Address required"),
});
const Step6Schema = z.object({
  notes: z.string().optional(),
});

// ---------------------------------
// MAIN COMPONENT
// ---------------------------------
const Home: React.FC = () => {
  const [step, setStep] = useState(1);

  // -------- Step 1 --------
  const {
    register: r1,
    handleSubmit: h1,
    formState: { errors: e1 },
    getValues: g1,
  } = useForm({
    resolver: zodResolver(Step1Schema),
    defaultValues: { fullName: "" },
  });

  // -------- Step 2 --------
  const {
    register: r2,
    handleSubmit: h2,
    formState: { errors: e2 },
    getValues: g2,
  } = useForm({
    resolver: zodResolver(Step2Schema),
    defaultValues: { phone: "" },
  });

  // -------- Step 3 --------
  const {
    register: r3,
    handleSubmit: h3,
    formState: { errors: e3 },
    getValues: g3,
  } = useForm({
    resolver: zodResolver(Step3Schema),
    defaultValues: { email: "" },
  });

  // -------- Step 4 --------
  const {
    register: r4,
    handleSubmit: h4,
    formState: { errors: e4 },
    getValues: g4,
  } = useForm({
    resolver: zodResolver(Step4Schema),
    defaultValues: { companyName: "" },
  });

  // -------- Step 5 --------
  const {
    register: r5,
    handleSubmit: h5,
    formState: { errors: e5 },
    getValues: g5,
  } = useForm({
    resolver: zodResolver(Step5Schema),
    defaultValues: { address: "" },
  });

  // -------- Step 6 (Final) --------
  const {
    register: r6,
    handleSubmit: h6,
    formState: { errors: e6 },
  } = useForm({
    resolver: zodResolver(Step6Schema),
    defaultValues: { notes: "" },
  });

  // -------------------------
  // FINAL SUBMIT HANDLER
  // -------------------------
  const handleFinalSubmit = (data6) => {
    const finalPayload = {
      ...g1(),
      ...g2(),
      ...g3(),
      ...g4(),
      ...g5(),
      ...data6,
    };

    console.log("FINAL RESULT:", finalPayload);
    alert("Check console for full payload!");
  };

  return (
    <div className="container p-4">
      {/* ---------------- STEP 1 ---------------- */}
      {step === 1 && (
        <form onSubmit={h1(() => setStep(2))}>
          <h3>Step 1</h3>

          <input
            className="form-control mb-2"
            placeholder="Full Name"
            {...r1("fullName")}
          />
          {e1.fullName && <p className="text-danger">{e1.fullName.message}</p>}

          <button className="btn btn-primary w-100">Next</button>
        </form>
      )}

      {/* ---------------- STEP 2 ---------------- */}
      {step === 2 && (
        <form onSubmit={h2(() => setStep(3))}>
          <h3>Step 2</h3>

          <input
            className="form-control mb-2"
            placeholder="Phone"
            {...r2("phone")}
          />
          {e2.phone && <p className="text-danger">{e2.phone.message}</p>}

          <button className="btn btn-primary w-100">Next</button>

          <p className="text-center mt-3" onClick={() => setStep(1)}>
            Go Back
          </p>
        </form>
      )}

      {/* ---------------- STEP 3 ---------------- */}
      {step === 3 && (
        <form onSubmit={h3(() => setStep(4))}>
          <h3>Step 3</h3>

          <input
            className="form-control mb-2"
            placeholder="Email"
            {...r3("email")}
          />
          {e3.email && <p className="text-danger">{e3.email.message}</p>}

          <button className="btn btn-primary w-100">Next</button>

          <p className="text-center mt-3" onClick={() => setStep(2)}>
            Go Back
          </p>
        </form>
      )}

      {/* ---------------- STEP 4 ---------------- */}
      {step === 4 && (
        <form onSubmit={h4(() => setStep(5))}>
          <h3>Step 4</h3>

          <input
            className="form-control mb-2"
            placeholder="Company Name"
            {...r4("companyName")}
          />
          {e4.companyName && (
            <p className="text-danger">{e4.companyName.message}</p>
          )}

          <button className="btn btn-primary w-100">Next</button>

          <p className="text-center mt-3" onClick={() => setStep(3)}>
            Go Back
          </p>
        </form>
      )}

      {/* ---------------- STEP 5 ---------------- */}
      {step === 5 && (
        <form onSubmit={h5(() => setStep(6))}>
          <h3>Step 5</h3>

          <input
            className="form-control mb-2"
            placeholder="Address"
            {...r5("address")}
          />
          {e5.address && <p className="text-danger">{e5.address.message}</p>}

          <button className="btn btn-primary w-100">Next</button>

          <p className="text-center mt-3" onClick={() => setStep(4)}>
            Go Back
          </p>
        </form>
      )}

      {/* ---------------- STEP 6 (Final) ---------------- */}
      {step === 6 && (
        <form onSubmit={h6(handleFinalSubmit)}>
          <h3>Step 6 (Final)</h3>

          <textarea
            className="form-control mb-2"
            placeholder="Notes (optional)"
            {...r6("notes")}
          />

          <button className="btn btn-success w-100">Submit All</button>

          <p className="text-center mt-3" onClick={() => setStep(5)}>
            Go Back
          </p>
        </form>
      )}
    </div>
  );
};

export default Home;
