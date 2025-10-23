import React from "react";
import EditLayout from "../Edit";
import BackButton from "@/Components/BackButton";
import { Head } from "@inertiajs/react";
const Basic = () => {
    return (
        <>
            <EditLayout>
                <Head title={t("Edit User")} />

                <BackButton />
                <Card>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="w-full">
                                <InputLabel value="Name" />
                                <TextInput
                                    className="w-full"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    placeholder={t("Enter your name")}
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <InputLabel value="Email" />
                                <TextInput
                                    type="email"
                                    name="email"
                                    className="w-full"
                                    placeholder={t("Enter your email")}
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError message={errors.email} />
                            </div>
                            <div>
                                <InputLabel value="Password" />
                                <TextInput
                                    type="password"
                                    name="password"
                                    className="w-full"
                                    placeholder={t("Enter your password")}
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError message={errors.password} />
                            </div>
                            <div>
                                <InputLabel value="Phone no" />
                                <TextInput
                                    className="w-full"
                                    name="phone_no"
                                    value={data.phone_no}
                                    onChange={(e) =>
                                        setData("phone_no", e.target.value)
                                    }
                                    placeholder={t("Enter your phone no")}
                                />

                                <InputError message={errors.password} />
                            </div>
                            <div>
                                <InputLabel value="Roles" />
                                <select
                                    className="rounded w-full border-gray-300 "
                                    name="role"
                                    value={data.role}
                                    onChange={(e) =>
                                        setData("role", e.target.value)
                                    }
                                >
                                    <option value="">
                                        {t("Select a role")}
                                    </option>
                                    {roles &&
                                        roles.map((role) => (
                                            <option
                                                key={role.id}
                                                value={role.name}
                                            >
                                                {role.name}
                                            </option>
                                        ))}
                                </select>
                                <InputError message={errors.role} />
                            </div>
                        </div>

                        <div className="flex justify-end items-center my-2">
                            <PrimaryButton type="submit" disabled={processing}>
                                {processing && <Spinner className="mr-2" />}
                                {t("Update")}
                            </PrimaryButton>
                        </div>
                    </form>
                </Card>
            </EditLayout>
        </>
    );
};

export default Basic;
