import React, { useState } from "react";

const fieldsConfig = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    required: true,
    minLength: 3,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    pattern: /^\S+@\S+\.\S+$/,
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: true,
    pattern: /^[0-9]{10,15}$/,
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    required: true,
    min: 18,
    max: 100,
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    minLength: 6,
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
  },
  { name: "address", label: "Address", type: "text", required: true },
  { name: "city", label: "City", type: "text", required: true },
  { name: "country", label: "Country", type: "text", required: true },
  { name: "zip", label: "ZIP Code", type: "text", pattern: /^[0-9]{5,6}$/ },
  {
    name: "username",
    label: "Username",
    type: "text",
    required: true,
    minLength: 4,
  },
  { name: "occupation", label: "Occupation", type: "text" },
  { name: "gender", label: "Gender", type: "text" },
  { name: "bio", label: "Short Bio", type: "text", maxLength: 200 },
  { name: "website", label: "Website", type: "url", pattern: /^https?:\/\/.+/ },
  { name: "linkedin", label: "LinkedIn Profile", type: "url" },
  { name: "twitter", label: "Twitter Handle", type: "text" },
  { name: "skills", label: "Skills", type: "text" },
  {
    name: "experience",
    label: "Years of Experience",
    type: "number",
    min: 0,
    max: 50,
  },
  { name: "portfolio", label: "Portfolio URL", type: "url" },
];

export default function App() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    fieldsConfig.forEach((field) => {
      const value = values[field.name] || "";

      if (field.required && !value.trim()) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (field.pattern && value && !field.pattern.test(value)) {
        newErrors[field.name] = `Invalid ${field.label}`;
        return;
      }

      if (field.minLength && value.length < field.minLength)
        newErrors[
          field.name
        ] = `${field.label} must be at least ${field.minLength} characters`;

      if (field.maxLength && value.length > field.maxLength)
        newErrors[
          field.name
        ] = `${field.label} must be under ${field.maxLength} characters`;

      if (field.min && Number(value) < field.min)
        newErrors[field.name] = `${field.label} must be >= ${field.min}`;

      if (field.max && Number(value) > field.max)
        newErrors[field.name] = `${field.label} must be <= ${field.max}`;
    });

    if (values.password !== values.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("✅ Form submitted successfully!");
      console.log("Form Data:", values);
      setValues({});
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-100 via-blue-50 to-purple-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">
          Dynamic Smart Form 🚀
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {fieldsConfig.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="font-semibold text-gray-700 mb-2">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={values[field.name] || ""}
                onChange={handleChange}
                placeholder={`Enter ${field.label}`}
                className={`border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              Submit Form
            </button>
            <h1>ssssssssssss</h1>
          </div>
        </form>
      </div>
    </div>
  );
}
