import Button from "../../buttons/Button";
import FormFieldCard from "./FormFieldCard";

export default function FormCard({
    form,
    isOpen,
    fieldValues,
    onToggle,
    onEdit,
    onDelete,
    onFieldValueChange,
}) {
    const fields = Array.isArray(form.fields) ? form.fields : [];

    const hiddenFieldsCount = fields.filter(
        (field) => field.displayStatus === false
    ).length;
console.log(hiddenFieldsCount, "hiddenFieldsCount")
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200
         bg-white shadow-sm">
            <button
                onClick={() => onToggle(form.id)}
                className="flex w-full items-center justify-between px-6 py-5 transition
                 hover:bg-slate-50"
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                        <i className="ri-file-list-3-line text-2xl text-indigo-600"></i>
                    </div>

                    <div className="text-left">
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-slate-800">
                                {form.name}
                            </h3>

                            {hiddenFieldsCount > 0 && (
                                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs 
                                font-medium text-gray-600">
                                    {hiddenFieldsCount} Hidden
                                </span>
                            )}
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            {fields.length} Fields •{" "}
                            {new Date(form.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <i
                    className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                ></i>
            </button>

            {isOpen && (
                <div className="border-t bg-slate-50 p-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        {fields.map((field) => (
                            <FormFieldCard
                                key={field.id}
                                field={field}
                                value={fieldValues[field.id]}
                                onValueChange={onFieldValueChange}
                            />
                        ))}
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => onEdit(form)}
                        >
                            <i className="ri-edit-line mr-2"></i>
                            Edit
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() => onDelete(form.id)}
                        >
                            <i className="ri-delete-bin-6-line mr-2"></i>
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}