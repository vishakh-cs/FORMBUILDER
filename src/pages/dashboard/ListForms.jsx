import React, { useState } from 'react'
import Button from '../../components/buttons/Button';

export default function ListForms({ forms, onEdit }) {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [editingForm, setEditingForm] = useState(null);
    const [sortBy, setSortBy] = useState("newest");
    const [search, setSearch] = useState("");

    const filteredForms = forms.filter((form) => {
        const searchText = search.toLowerCase().trim();

        if (!searchText) return true;

        return (
            form.name.toLowerCase().includes(searchText) ||
            form.fields.some((field) =>
                field.name.toLowerCase().includes(searchText) ||
                field.type.toLowerCase().includes(searchText) ||
                (field.defaultValue || "").toLowerCase().includes(searchText)
            )
        );
    });
    const sortedForms = [...filteredForms].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.createdAt) - new Date(a.createdAt);

            case "oldest":
                return new Date(a.createdAt) - new Date(b.createdAt);

            case "az":
                return a.name.localeCompare(b.name);

            case "za":
                return b.name.localeCompare(a.name);

            default:
                return 0;
        }
    });

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this form?"
        );

        if (!confirmed) return;

        const existingForms =
            JSON.parse(localStorage.getItem("formFields")) || [];

        const updatedForms = existingForms.filter(
            (form) => form.id !== id
        );

        localStorage.setItem(
            "formFields",
            JSON.stringify(updatedForms)
        );

        window.location.reload(); // or update parent state if you're using useState
    };

    const renderField = (field) => {
        switch (field.type.toLowerCase()) {
            case "text":
            case "email":
            case "number":
            case "password":
                return (
                    <input
                        type={field.type.toLowerCase()}
                        placeholder={field.defaultValue || `Enter ${field.name}`}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                );

            case "textarea":
                return (
                    <textarea
                        rows={4}
                        placeholder={field.defaultValue || `Enter ${field.name}`}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                );

            case "checkbox":
                return (
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            className="h-5 w-5 accent-indigo-600"
                        />
                        {field.name}
                    </label>
                );

            case "select":
                return (
                    <select className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none">
                        <option value="">Select</option>

                        {field.options
                            ?.split(",")
                            .map((option) => (
                                <option key={option.trim()}>
                                    {option.trim()}
                                </option>
                            ))}
                    </select>
                );

            case "date":
                return (
                    <input
                        type="date"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none"
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        placeholder={`Enter ${field.name}`}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2"
                    />
                );
        }
    };

    return (
        <div className="mt-8 space-y-4">
            <div className="mb-6 flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                        My Forms
                    </h3>

                    <p className="text-sm text-slate-500">
                        {forms.length} Form{forms.length !== 1 ? "s" : ""}
                    </p>
                </div>

                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="relative">
                        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>

                        <input
                            type="text"
                            placeholder="Search forms..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-72 rounded-lg border border-slate-300 bg-white text-black py-2 pl-10 pr-3 text-sm focus:border-indigo-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-slate-600">
                            Sort By
                        </span>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-lg border border-slate-300 bg-white px-3  text-black py-2 text-sm focus:border-indigo-500 focus:outline-none"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="az">Name (A-Z)</option>
                            <option value="za">Name (Z-A)</option>
                        </select>
                    </div>
                </div>
            </div>
            {sortedForms.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
                    <div className="text-5xl">📋</div>
                    <h2 className="mt-4 text-xl font-semibold text-slate-700">
                        No Forms Created
                    </h2>
                    <p className="mt-2 text-slate-500">
                        Click "Create Form" to create your first form.
                    </p>
                </div>
            ) : (
                sortedForms.map((form, index) => (
                    <div
                        key={form.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                        {/* Accordion Header */}
                        <button
                            onClick={() =>
                                setOpenAccordion(openAccordion === form.id ? null : form.id)
                            }
                            className="flex w-full items-center justify-between px-6 py-5 hover:bg-slate-50"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                                    <i className="ri-file-list-3-line text-2xl text-indigo-600"></i>
                                </div>

                                <div className="text-left">
                                    <h3 className="text-lg font-semibold text-slate-800">
                                        {form.name}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        {form.fields.length} Fields •{" "}
                                        {new Date(form.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <i
                                className={`ri-arrow-down-s-line text-2xl transition-transform ${openAccordion === form.id ? "rotate-180" : ""
                                    }`}
                            ></i>
                        </button>



                        {openAccordion === form.id && (
                            <div className="border-t bg-slate-50 p-6">

                                <div className="grid gap-4 md:grid-cols-2">

                                    {form.fields.map((field) => (
                                        <div
                                            key={field.id}
                                            className="rounded-xl border border-slate-200 bg-white p-4"
                                        >
                                            <div className="flex items-center justify-between">

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <label className="font-semibold text-slate-700">
                                                            {field.name}

                                                            {field.required && (
                                                                <span className="ml-1 text-red-500">*</span>
                                                            )}
                                                        </label>

                                                        <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs">
                                                            {field.type}
                                                        </span>
                                                    </div>

                                                    {renderField(field)}
                                                </div>

                                                {field.required && (
                                                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
                                                        Required
                                                    </span>
                                                )}

                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-2">

                                                <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs text-indigo-600">
                                                    {field.type}
                                                </span>

                                                <span
                                                    className={`rounded-lg px-3 py-1 text-xs ${field.displayStatus
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                        }`}
                                                >
                                                    {field.displayStatus ? "Visible" : "Hidden"}
                                                </span>

                                            </div>
                                        </div>
                                    ))}

                                </div>

                                <div className="mt-6 flex justify-end gap-3">

                                    {/* <Button variant="outline">
                                        Preview
                                    </Button> */}

                                    <Button
                                        variant="outline"
                                        onClick={() => onEdit(form)}
                                    >
                                        <i className="ri-edit-line mr-2"></i>
                                        Edit
                                    </Button>

                                    <Button
                                        className="bg-red-600 hover:bg-red-700 text-white"
                                        onClick={() => handleDelete(form.id)}
                                    >
                                        <i className="ri-delete-bin-6-line mr-2"></i>
                                        Delete
                                    </Button>

                                </div>

                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}
