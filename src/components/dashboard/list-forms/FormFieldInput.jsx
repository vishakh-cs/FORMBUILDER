import { getFieldOptions } from "../../../utils/helper.js";

const inputClassName =
    "w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none";

export default function FormFieldInput({ field, value, onChange }) {
    const fieldType = field.type?.toLowerCase();

    switch (fieldType) {
        case "text":
        case "email":
        case "number":
        case "password":

            return (
                <input
                    type={fieldType}
                    placeholder={field.defaultValue || `Enter ${field.name}`}
                    className={inputClassName}
                />
            );

        case "textarea":
            
            return (
                <textarea
                    rows={4}
                    placeholder={field.defaultValue || `Enter ${field.name}`}
                    className={inputClassName}
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
        case "dropdown": {
            const options = getFieldOptions(field.options);

            return (
                <select
                    value={value || ""}
                    onChange={(e) => onChange(field.id, e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 focus:border-indigo-500 focus:outline-none"
                >
                    <option value="">
                        {field.defaultValue || `Select ${field.name}`}
                    </option>

                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            );
        }

        case "date":
            return (
                <input
                    type="date"
                    className={inputClassName}
                />
            );

        default:
            return (
                <input
                    type="text"
                    placeholder={`Enter ${field.name}`}
                    className={inputClassName}
                />
            );
    }
}
