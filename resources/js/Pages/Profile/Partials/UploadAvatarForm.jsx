import useAuth from "@/hooks/useAuth";
import { Avatar } from "@files-ui/react";
import React from "react";

const UploadAvatarForm = () => {
    const user = useAuth();
    console.log("🚀 ~ UploadAvatarForm ~ user:", user);
    return (
        <section>
            {/* <Avatar src={avatar} alt="Avatar" onChange={handleChangeSource} /> */}
        </section>
    );
};

export default UploadAvatarForm;
