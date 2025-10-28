import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import MasterLayout from "@/Layouts/MasterLayout";
import PageHeading from "@/Components/PageHeading";
import UploadAvatarForm from "./Partials/UploadAvatarForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <MasterLayout pageTitle="Profile">
            <PageHeading
                title="Profile"
                description="Manage your personal information and account settings"
            />

            <div className="">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UploadAvatarForm />
                    </div>
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
}
