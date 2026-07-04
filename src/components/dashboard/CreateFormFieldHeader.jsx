export default function CreateFormFieldHeader({
    onClose,
    formFields,
    setFormFields,
    setCurrentField,
    setIsEditing,
    setEditingId,
}) {

    const handleEdit = (field) => {
        setCurrentField(field);
        setEditingId(field.id);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        setFormFields((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };
    return (
        <>
            <div className="flex items-center justify-between border-b bg-blue-400 px-6 py-5 text-black">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Create New Form
                    </h2>
                    <p className="mt-1 text-sm text-blue-100">
                        Fill in the details to create your form.
                    </p>
                </div>

                <button
                    onClick={() => onClose(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/20"
                >
                    ✕
                </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">
                            Added Fields
                        </h3>
                        <p className="text-sm text-slate-500">
                            Manage the fields you've added to the form.
                        </p>
                    </div>

                    <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
                        {formFields.length} Fields
                    </span>
                </div>

                {formFields.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 py-10">
                        <div className="mb-3 text-5xl">📋</div>

                        <h4 className="font-semibold text-slate-700">
                            No Fields Added
                        </h4>

                        <p className="mt-1 text-sm text-slate-500">
                            Click "Add Field" to start building your form.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {formFields.map((field) => (
                            <div
                                key={field.id}
                                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-6 py-5 transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
                            >
                                {/* Left */}
                                <div className="flex items-center gap-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
                                        <i className="ri-text text-2xl text-indigo-600"></i>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-base font-semibold text-slate-800">
                                                {field.name}
                                            </h3>

                                            {field.required && (
                                                <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600">
                                                    Required
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-2 flex items-center gap-2">
                                            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                {field.type}
                                            </span>

                                            <span
                                                className={`rounded-lg px-3 py-1 text-xs font-medium ${field.displayStatus
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {field.displayStatus ? "Visible" : "Hidden"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() => handleEdit(field)}
                                        className="rounded-xl p-3 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                        title="Edit"
                                    >
                                        <i className="ri-pencil-line text-lg"></i>
                                    </button>

                                    <button
                                        onClick={() => handleDelete(field.id)}
                                        className="rounded-xl p-3 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                        title="Delete"
                                    >
                                        <i className="ri-delete-bin-6-line text-lg"></i>
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
