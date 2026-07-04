export const getFieldOptions = (options) => {
    if (Array.isArray(options)) {
        return options.map((option) => String(option).trim()).filter(Boolean);
    }

    if (typeof options === "string") {
        return options.split(",").map((option) => option.trim()).filter(Boolean);
    }

    return [];
};

export const filterFormsBySearch = (forms, search) => {
    const searchText = search.toLowerCase().trim();

    if (!searchText) return forms;

    return forms.filter((form) => {
        const fields = Array.isArray(form.fields) ? form.fields : [];

        return (
            form.name?.toLowerCase().includes(searchText) ||
            fields.some((field) =>
                field.name?.toLowerCase().includes(searchText) ||
                field.type?.toLowerCase().includes(searchText) ||
                (field.defaultValue || "").toLowerCase().includes(searchText)
            )
        );
    });
};

export const sortForms = (forms, sortBy) => {
    return [...forms].sort((a, b) => {
        switch (sortBy) {
            case "newest":
                return new Date(b.createdAt) - new Date(a.createdAt);

            case "oldest":
                return new Date(a.createdAt) - new Date(b.createdAt);

            case "az":
                return (a.name || "").localeCompare(b.name || "");

            case "za":
                return (b.name || "").localeCompare(a.name || "");

            default:
                return 0;
        }
    });
};

export const getStoredForms = () => {
    return JSON.parse(localStorage.getItem("formFields")) || [];
};

export const deleteFormFromStorage = (id) => {
    const updatedForms = getStoredForms().filter((form) => form.id !== id);

    localStorage.setItem("formFields", JSON.stringify(updatedForms));

    return updatedForms;
};


export const SORT_OPTIONS = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "az", label: "Name (A-Z)" },
    { value: "za", label: "Name (Z-A)" },
];