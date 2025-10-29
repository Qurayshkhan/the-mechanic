import useAuth from "@/hooks/useAuth";
import { Avatar } from "@files-ui/react";
import React, { useState } from "react";

const UploadAvatarForm = () => {
    const user = useAuth();
    console.log("🚀 ~ UploadAvatarForm ~ user:", user);
    const [imageSource, setImageSource] = useState(user.avatar);
    const handleChangeSource = (selectedFile) => {
        console.log("🚀 ~ handleChangeSource ~ selectedFile:", selectedFile);
        setImageSource(selectedFile);
    };
    return (
        <section>
            <Avatar
                src={imageSource}
                alt="Avatar"
                onChange={handleChangeSource}
                accept=".png, .jpg, .jpeg, .webp"
                smartImgFit={"center"}
                isLoading={false}
                variant="circle"
                emptyLabel={"You can choose an image..."}
                changeLabel={"Do you want to change this amazing picture?"}
            />
        </section>
    );
};

export default UploadAvatarForm;
