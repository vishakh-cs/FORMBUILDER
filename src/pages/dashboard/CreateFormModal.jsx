import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/buttons/Button";
import FormPreviewPage from "./FormPreviewPage";
import CreateFormFieldHeader from "../../components/dashboard/CreateFormFieldHeader";
import RenderForms from "./RenderForms";
import { getFieldValidationErrors } from "../../utils/validate";

export default function CreateFormModal({ isOpen, onClose, editingForm, }) {
    const [currentField, setCurrentField] = useState({
        name: "",
        type: "",
        displayStatus: true,
        defaultValue: "",
        required: false,
        options: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formFields, setFormFields] = useState(() => editingForm?.fields || []);
    const [formPreview, setFormPreview] = useState(false)
    const [validationErrors, setValidationErrors] = useState({});

    if (!isOpen) return null;

    const handleAddNewField = () => {
        const errors = getFieldValidationErrors(currentField);
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        if (isEditing) {
            setFormFields((prev) =>
                prev.map((field) =>
                    field.id === editingId
                        ? { ...currentField, id: editingId }
                        : field
                )
            );

            toast.success("Field updated successfully");
        } else {
            setFormFields((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    ...currentField,
                },
            ]);

            toast.success("Field added successfully");
        }

        setCurrentField({
            name: "",
            type: "",
            displayStatus: true,
            defaultValue: "",
            required: false,
            options: "",
        });

        setIsEditing(false);
        setEditingId(null);
        setValidationErrors({});
    };

    // const updateField = (id, key, value) => {
    //     setCurrentField((prev) =>
    //         prev.map((item) =>
    //             item.id === id
    //                 ? { ...item, [key]: value }
    //                 : item
    //         )
    //     );
    // };

    const handlePreview = () => {
        setFormPreview(true)
    }


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <div className="flex max-h-[95vh] min-h-[25vh] w-full max-w-5xl flex-col overflow-y-scroll rounded-3xl bg-gray-50 shadow-2xl ">

                {formPreview ? (
                    <FormPreviewPage data={formFields} onclose={setFormPreview} />
                ) : (
                    <>
                        <CreateFormFieldHeader
                            onClose={onClose}
                            formFields={formFields}
                            setFormFields={setFormFields}
                            setCurrentField={setCurrentField}
                            setIsEditing={setIsEditing}
                            setEditingId={setEditingId}
                        />

                        <RenderForms
                            currentField={currentField}
                            setCurrentField={setCurrentField}
                            validationErrors={validationErrors}
                            setValidationErrors={setValidationErrors}
                        />

                        {/* Footer */}
                        <div className="flex flex-col-reverse gap-3 border-t bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                            <Button
                                variant="secondary"
                                className="w-full sm:w-auto"
                                onClick={() => onClose(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="primary"
                                className="w-full sm:w-auto"
                                onClick={handleAddNewField}
                            >
                                {isEditing ? "Update Field" : "Add Field"}
                            </Button>
                            <Button
                                disabled={formFields.length === 0}
                                variant="primary"
                                className="w-full sm:w-auto"
                                onClick={handlePreview}
                            >
                                Preview & Submit
                            </Button>

                        </div>
                    </>
                )}



            </div>
        </div>
    );
}
