import { requiredFormField } from "./FormFields";

export const validateField = (currentField) => {
    for (const field of requiredFormField) {
        const value = currentField[field.key];

        if (field.required) {
            if (typeof value === "string" && !value.trim()) {
                alert(`${field.label} is required`);
                return false;
            }

            // Boolean validation
            if (typeof value === "boolean" && value === false) {
                alert(`${field.label} is required`);
                return false;
            }

            // Null / Undefined
            if (value === null || value === undefined) {
                alert(`${field.label} is required`);
                return false;
            }
        }
    }

    return true;
};

