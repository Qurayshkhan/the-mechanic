import React from "react";
import EditLayout from "../Edit";
import BackButton from "@/Components/BackButton";
import { Head, useForm } from "@inertiajs/react";
import Card from "@/Components/Card";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import useLang from "@/hooks/useLang";
import PrimaryButton from "@/Components/PrimaryButton";
import Spinner from "@/Components/Spinner";
const Basic = ({ user, roles }) => {
    const { t } = useLang();
    const { data, setData, put, processing, errors } = useForm({
        name: user?.name || "",
        email: user?.email || "",
        phone_no: user?.phone_no || "",
        password: user?.password || "",
        role: user?.roles?.[0]?.name || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.user.update", user.id));
    };

    return (
        <>
            <EditLayout user={user}>
                <Head title={"Edit User"} />

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div className="w-full">
                            <InputLabel value={"Name"} />
                            <TextInput
                                className="w-full"
                                name="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                placeholder={"Enter your name"}
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <InputLabel value={t("Email")} />
                            <TextInput
                                type="email"
                                name="email"
                                className="w-full"
                                placeholder={"Enter your email"}
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div>
                            <InputLabel value={"Password"} />
                            <TextInput
                                type="password"
                                name="password"
                                className="w-full"
                                placeholder={"Enter new password (optional)"}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div>
                            <InputLabel value={"Phone no"} />
                            <TextInput
                                className="w-full"
                                name="phone_no"
                                value={data.phone_no}
                                onChange={(e) =>
                                    setData("phone_no", e.target.value)
                                }
                                placeholder={t("Enter your phone no")}
                            />
                            <InputError message={errors.phone_no} />
                        </div>
                        <div>
                            <InputLabel value={"Roles"} />
                            <select
                                className="rounded w-full border-gray-300"
                                name="role"
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                            >
                                <option value="">{t("Select a role")}</option>
                                {roles &&
                                    roles.map((role) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                            </select>
                            <InputError message={errors.role} />
                        </div>
                    </div>

                    <div className="flex justify-end items-center my-2">
                        <PrimaryButton
                            type="submit"
                            processing={processing}
                            disabled={processing}
                        >
                            {t("Update")}
                        </PrimaryButton>
                    </div>
                </form>
            </EditLayout>
        </>
    );
};

export default Basic;
