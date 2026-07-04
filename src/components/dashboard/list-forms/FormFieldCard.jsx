import FormFieldInput from "./FormFieldInput";

export default function FormFieldCard({ field, value, onValueChange }) {

    
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-3">
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

                    <FormFieldInput
                        field={field}
                        value={value}
                        onChange={onValueChange}
                    />
                </div>

                {field.required && (
                    <span className="shrink-0 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-600">
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
    );
}
