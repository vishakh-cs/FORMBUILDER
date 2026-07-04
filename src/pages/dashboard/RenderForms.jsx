import React from "react";
import { requiredFormField } from "../../utils/FormFields";

export default function RenderForms({ currentField, setCurrentField }) {
    return (
        <div className="p-6">
            <div className="space-y-6">
                {requiredFormField.map((field) => (
                    <div key={field.id}>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            {field.label}
                            {field.required && (
                                <span className="ml-1 text-red-500">*</span>
                            )}
                        </label>

                        {/* Text */}
                        {field.type === "text" && (
                            <input
                                type="text"
                                placeholder={field.placeholder}
                                value={currentField[field.key] ?? ""}
                                onChange={(e) =>
                                    setCurrentField((prev) => ({
                                        ...prev,
                                        [field.key]: e.target.value,
                                    }))
                                }
                                className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                            />
                        )}

                        {/* Select */}
                        {field.type === "select" && (
                            <select
                                value={currentField[field.key] ?? ""}
                                onChange={(e) =>
                                    setCurrentField((prev) => ({
                                        ...prev,
                                        [field.key]: e.target.value,
                                    }))
                                }
                                className="w-full rounded-xl border border-gray-300 p-3"
                            >
                                <option value="">Select</option>

                                {field.options?.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* Textarea */}
                        {field.type === "textarea" && (
                            <textarea
                                rows={4}
                                placeholder={field.placeholder}
                                value={currentField[field.key] ?? ""}
                                onChange={(e) =>
                                    setCurrentField((prev) => ({
                                        ...prev,
                                        [field.key]: e.target.value,
                                    }))
                                }
                                className="w-full rounded-xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
                            />
                        )}

                        {/* Checkbox */}
                        {field.type === "checkbox" && (
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={currentField[field.key] ?? false}
                                    onChange={(e) =>
                                        setCurrentField((prev) => ({
                                            ...prev,
                                            [field.key]: e.target.checked,
                                        }))
                                    }
                                    className="h-5 w-5 accent-blue-600"
                                />
                                <span>Required</span>
                            </label>
                        )}

                        {/* Switch */}
                        {field.type === "switch" && (
                            <div className="flex items-center justify-between rounded-xl border border-gray-300 p-3">
                                <span className="font-medium text-gray-700">
                                    {currentField.displayStatus ? "Active" : "Inactive"}
                                </span>

                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={currentField.displayStatus}
                                        onChange={(e) =>
                                            setCurrentField((prev) => ({
                                                ...prev,
                                                displayStatus: e.target.checked,
                                            }))
                                        }
                                        className="peer sr-only"
                                    />

                                    <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-green-500 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-5"></div>
                                </label>
                            </div>
                        )}
                    </div>
                ))}

                {/* Options for Dropdown & Checkbox */}
                {["dropdown", "checkbox"].includes(
                    currentField.type?.toLowerCase()
                ) && (
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Options
                        </label>

                        {(currentField.options || []).map((option, index) => (
                            <div key={index} className="mb-2 flex gap-2">
                                <input
                                    type="text"
                                    value={option}
                                    placeholder={`Option ${index + 1}`}
                                    onChange={(e) => {
                                        const updatedOptions = [
                                            ...(currentField.options || []),
                                        ];
                                        updatedOptions[index] = e.target.value;

                                        setCurrentField((prev) => ({
                                            ...prev,
                                            options: updatedOptions,
                                        }));
                                    }}
                                    className="flex-1 rounded-xl border border-gray-300 p-3"
                                />

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrentField((prev) => ({
                                            ...prev,
                                            options: prev.options.filter(
                                                (_, i) => i !== index
                                            ),
                                        }));
                                    }}
                                    className="rounded-lg bg-red-500 px-4 text-white"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() =>
                                setCurrentField((prev) => ({
                                    ...prev,
                                    options: [...(prev.options || []), ""],
                                }))
                            }
                            className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                            + Add Option
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}