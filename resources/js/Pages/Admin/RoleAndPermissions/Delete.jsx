import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { router } from "@inertiajs/react";
import { Trash } from "lucide-react";
import React, { useState } from "react";

const Delete = ({ id }) => {
    const [confirmRecordDeletion, setConfirmRecordDeletion] = useState(false);

    const handleCloseModal = () => {
        setConfirmRecordDeletion(false);
    };
    const handleDelete = (e) => {
        e.target.disabled = true;
        router.delete(route("admin.roles.destroy", id), {
            onFinish: () => {
                e.target.disabled = false;
            },
        });
    };
    return (
        <div>
            <Trash
                className="w-5 h-5 text-red-500"
                onClick={() => setConfirmRecordDeletion(!confirmRecordDeletion)}
            />
            <Modal show={confirmRecordDeletion} onClose={handleCloseModal}>
                <div className="p-2">
                    <h2 class="text-lg font-medium text-gray-900">
                        Are you sure you want to delete the record?
                    </h2>
                    <div class="flex mt-6 gap-4 justify-end">
                        <SecondaryButton onClick={handleCloseModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton onClick={handleDelete}>
                            Delete
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Delete;
