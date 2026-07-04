import { useState } from "react";

export default function FormPreviewPage({ data, onclose }) {
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});

    const handleCreateForm = () => {
        const existingForms =
            JSON.parse(localStorage.getItem("formFields")) || [];

        const existingIndex = existingForms.findIndex(
            (form) => form.id === data?.formId
        );

        if (existingIndex !== -1) {
            existingForms[existingIndex] = {
                ...existingForms[existingIndex],
                fields: data,
                updatedAt: new Date().toISOString(),
            };

            alert("Form updated successfully!");
        } else {
            existingForms.push({
                id: Date.now(),
                name: `Form ${existingForms.length + 1}`,
                createdAt: new Date().toISOString(),
                fields: data,
            });

            alert("Form created successfully!");
        }

        localStorage.setItem(
            "formFields",
            JSON.stringify(existingForms)
        );

        onclose(false);
        window.location.reload();
    };

    const renderField = (field) => {
        switch (field.type.toLowerCase()) {
            case "text":
            case "number":
            case "password":
                return (
                    <>
                        <input
                            type={field.type.toLowerCase()}
                            placeholder={field.defaultValue || `Enter ${field.name}`}
                            value={formValues[field.id] || ""}
                            onChange={(e) => {
                                const value = e.target.value;

                                setFormValues((prev) => ({
                                    ...prev,
                                    [field.id]: value,
                                }));

                                setErrors((prev) => ({
                                    ...prev,
                                    [field.id]: "",
                                }));
                            }}
                            className={`w-full rounded-xl border bg-white px-4 py-3 ${errors[field.id]
                                    ? "border-red-500"
                                    : "border-slate-300"
                                }`}
                        />

                        {errors[field.id] && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors[field.id]}
                            </p>
                        )}
                    </>
                )

            case "email":
                return (
                    <>
                        <input
                            type="email"
                            placeholder={field.defaultValue || `Enter ${field.name}`}
                            value={formValues[field.id] || ""}
                            onChange={(e) => {
                                const value = e.target.value;

                                setFormValues((prev) => ({
                                    ...prev,
                                    [field.id]: value,
                                }));

                                setErrors((prev) => ({
                                    ...prev,
                                    [field.id]:
                                        value === "" || value.includes("@")
                                            ? ""
                                            : "Please enter a valid email address.",
                                }));
                            }}
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-gray-900"
                        />

                        {errors[field.id] && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors[field.id]}
                            </p>
                        )}
                    </>
                );

            case "textarea":
                return (
                    <textarea
                        rows={4}
                        // disabled
                        placeholder={field.defaultValue || `Enter ${field.name}`}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-gray-900"
                    />
                );

            case "dropdown":
                return (
                    <select
                        // disabled
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-gray-900"
                    >
                        <option value="">
                            {field.defaultValue || `Select ${field.name}`}
                        </option>

                        {field.options?.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case "checkbox":
                return (
                    <div className="space-y-2">
                        {field.options?.length ? (
                            field.options.map((option, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="checkbox"

                                        className="h-4 w-4 accent-indigo-600"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))
                        ) : (
                            <label className="flex items-center gap-3">
                                <input
                                    type="checkbox"

                                    className="h-4 w-4 accent-indigo-600"
                                />
                                <span>{field.name}</span>
                            </label>
                        )}
                    </div>
                );

            default:
                return (
                    <input
                        type="text"

                        placeholder={field.defaultValue || `Enter ${field.name}`}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-gray-900"
                    />
                );
        }
    };

    return (
        <div className="min-h-full bg-slate-100 p-8">
            <div className="">

                {/* Header */}
                <div className="border-b bg-gradient-to-r from-indigo-600 to-blue-500 px-8 py-8 text-white">
                    <h1 className="text-3xl font-bold">
                        Form Preview
                    </h1>

                    <p className="mt-2 text-indigo-100">
                        Preview how users will see your form.
                    </p>
                </div>

                <div className="space-y-6 pt-4 mb-4">

                    {data.map((field, index) => (
                        <div
                            key={field.id}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex items-center justify-between">

                                <div>
                                    <label className="text-base font-semibold text-slate-800">
                                        {index + 1}. {field.name}

                                        {field.required && (
                                            <span className="ml-1 text-red-500">*</span>
                                        )}
                                    </label>
                                </div>

                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                                    {field.type}
                                </span>

                            </div>

                            {renderField(field)}
                        </div>
                    ))}

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t bg-slate-50 px-8 py-5">

                    <button
                        className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-100"
                        onClick={() => onclose(false)}
                    >
                        Back
                    </button>

                    <button
                        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                        onClick={handleCreateForm}
                    >
                        Create Form
                    </button>

                </div>

            </div>
        </div>
    );
}
