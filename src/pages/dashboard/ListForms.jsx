import { useMemo, useState } from "react";
import EmptyFormsState from "../../components/dashboard/list-forms/EmptyFormsState";
import FormCard from "../../components/dashboard/list-forms/FormCard";
import ListFormsToolbar from "../../components/dashboard/list-forms/ListFormsToolbar";
import { filterFormsBySearch, sortForms } from "../../utils/helper.js";

export default function ListForms({ forms = [], onEdit, onDelete }) {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [sortBy, setSortBy] = useState("newest");
    const [search, setSearch] = useState("");
    const [fieldValues, setFieldValues] = useState({});

    const normalizedForms = useMemo(() => {
        return Array.isArray(forms) ? forms : [];
    }, [forms]);

    const visibleForms = useMemo(() => {
        return sortForms(filterFormsBySearch(normalizedForms, search), sortBy);
    }, [normalizedForms, search, sortBy]);

    const handleToggleAccordion = (formId) => {
        setOpenAccordion((currentFormId) =>
            currentFormId === formId ? null : formId
        );
    };

    const handleFieldValueChange = (fieldId, value) => {
        setFieldValues((prev) => ({
            ...prev,
            [fieldId]: value,
        }));
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this form?"
        );

        if (!confirmed) return;

        onDelete(id);
    };

    return (
        <div className="mt-8 space-y-4">
            <ListFormsToolbar
                formCount={normalizedForms.length}
                search={search}
                sortBy={sortBy}
                onSearchChange={setSearch}
                onSortChange={setSortBy}
            />

            {visibleForms.length === 0 ? (
                <EmptyFormsState />
            ) : (
                visibleForms.map((form) => (
                    <FormCard
                        key={form.id}
                        form={form}
                        isOpen={openAccordion === form.id}
                        fieldValues={fieldValues}
                        onToggle={handleToggleAccordion}
                        onEdit={onEdit}
                        onDelete={handleDelete}
                        onFieldValueChange={handleFieldValueChange}
                    />
                ))
            )}
        </div>
    );
}
