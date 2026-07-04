import { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import Header from "./Header";
import CreateFormModal from "./CreateFormModal";
import ListForms from "./ListForms";
import { deleteFormFromStorage, getStoredForms } from "../../utils/helper.js";

export default function FormBuilder() {
    const [isLoading] = useState(false)
    const [forms, setForms] = useState(() => getStoredForms());
    const [openCreateFormModal, setOpenCreateFormModal] = useState(false)
    const [editingForm, setEditingForm] = useState(null);
    const [theme, setTheme] = useState("light")


    const handleCreateNewForm = () => {
        setEditingForm(null);

        setOpenCreateFormModal(true);
    };
    const handleEditForm = (form) => {
        setEditingForm(form);
        setOpenCreateFormModal(true);
    };
    const handleDeleteForm = (id) => {
        const updatedForms = deleteFormFromStorage(id);

        //
        setForms(updatedForms);
    };

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );
    }, [theme]);

    return (
        <div className="min-h-screen bg-primary text-black p-8">
            <div className="mx-auto max-w-7xl">

                <div className="flex items-center justify-between rounded-2xl bg-primary p-8 shadow-md">

                    <Header theme={theme} toggleTheme={toggleTheme} />

                    <div className="flex items-center gap-4">
                        {/* <Button variant="outline">Preview</Button> */}
                        <Button variant="outline" onClick={toggleTheme}>
                            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                        </Button>
                        <Button onClick={handleCreateNewForm} variant="primary" className="cursor-pointer" loading={isLoading}>
                            + Create Form
                        </Button>
                    </div>
                </div>

                {/* listing the form Fields */}

                <ListForms
                    forms={forms}
                    onEdit={handleEditForm}
                    onDelete={handleDeleteForm}
                />
            </div>

            {openCreateFormModal && (
                <CreateFormModal
                    isOpen={openCreateFormModal}
                    onClose={setOpenCreateFormModal}
                    editingForm={editingForm}
                />
            )}
        </div>
    );
}
