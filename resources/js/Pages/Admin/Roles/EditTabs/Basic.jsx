import React, { useEffect, useState } from "react";
import EditLayout from "../Edit";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import Spinner from "@/Components/Spinner";
import InputError from "@/Components/InputError";
import useLang from "@/hooks/useLang";

const Basic = ({ role }) => {
    const { t } = useLang();
    const { data, setData, put, processing, errors } = useForm({
        name: role.name || "",
        guard_name: role.guard_name || "web",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.roles.update", role.id), {
            preserveScroll: true,
        });
    };

    return (
        <EditLayout role={role}>
            <Head title="Edit Role" />
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <InputLabel value="Name" />
                        <TextInput
                            name="name"
                            type="text"
                            placeholder="Enter role name"
                            className="w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div>
                        <InputLabel value="Guard" />
                        <select
                            name="guard_name"
                            className="w-full rounded-md border-gray-300"
                            value={data.guard_name}
                            onChange={(e) =>
                                setData("guard_name", e.target.value)
                            }
                        >
                            <option value="web">web</option>
                            <option value="api">api</option>
                        </select>

                        <InputError message={errors.guard_name} />
                    </div>
                </div>

                <div className="flex items-center justify-end py-2">
                    <PrimaryButton type="submit" disabled={processing}>
                        {processing && <Spinner />}
                        {t("Update")}
                    </PrimaryButton>
                </div>
            </form>
        </EditLayout>
    );
};

export default Basic;
