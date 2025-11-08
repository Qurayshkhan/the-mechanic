import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Dropzone, FileMosaic } from "@files-ui/react";
import React, { useState } from "react";

const Step4 = () => {
    const [cnicFront, setCnicFront] = useState([]);
    const updateFiles = (incommingFiles) => {
        setFiles(incommingFiles);
    };
    const removeFile = (id) => {
        setFiles(files.filter((x) => x.id !== id));
    };
    return (
        <>
            <div className="transition-opacity duration-300 ease-in-out">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                    <div className="mb-6 sm:mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Documents & Verification
                        </h2>
                        <p className="text-gray-600">
                            Upload your identification and required documents to
                            verify your profile and enable shop activation.
                        </p>
                    </div>
                    <div className="mb-8">
                        <form action="">
                            <div className="mb-4">
                                <InputLabel value="License number (optional)" />
                                <TextInput
                                    placeholder="Enter shop license number"
                                    className="w-full"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <InputLabel value={"Cnic front"} />
                                    <Dropzone
                                        onChange={updateFiles}
                                        value={cnicFront}
                                        accept={"image/*"}
                                        maxFileSize={10 * 1024 * 1024}
                                        maxFiles={1}
                                        actionButtons={{
                                            position: "bottom",
                                            uploadButton: {},
                                            abortButton: {},
                                        }}
                                        uploadConfig={{
                                            url: "https://www.myawsomeserver.com/upload",
                                            method: "POST",
                                            headers: {
                                                Authorization:
                                                    "bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/",
                                            },
                                            cleanOnUpload: true,
                                        }}
                                        fakeUpload
                                    >
                                        {files.map((file) => (
                                            <FileMosaic
                                                key={file.id}
                                                {...file}
                                                onDelete={removeFile}
                                                info
                                                preview
                                            />
                                        ))}
                                    </Dropzone>
                                </div>
                                <div>
                                    <InputLabel value={"Cnic back"} />
                                    <Dropzone
                                        onChange={updateFiles}
                                        value={cnicFront}
                                        accept={"image/*"}
                                        maxFileSize={10 * 1024 * 1024}
                                        maxFiles={1}
                                        actionButtons={{
                                            position: "bottom",
                                            uploadButton: {},
                                            abortButton: {},
                                        }}
                                        uploadConfig={{
                                            url: "https://www.myawsomeserver.com/upload",
                                            method: "POST",
                                            headers: {
                                                Authorization:
                                                    "bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/",
                                            },
                                            cleanOnUpload: true,
                                        }}
                                        fakeUpload
                                    >
                                        {files.map((file) => (
                                            <FileMosaic
                                                key={file.id}
                                                {...file}
                                                onDelete={removeFile}
                                                info
                                                preview
                                            />
                                        ))}
                                    </Dropzone>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                <div>
                                    <InputLabel value={"Workshop photo 1"} />
                                    <Dropzone
                                        onChange={updateFiles}
                                        value={cnicFront}
                                        accept={"image/*"}
                                        maxFileSize={10 * 1024 * 1024}
                                        maxFiles={1}
                                        actionButtons={{
                                            position: "bottom",
                                            uploadButton: {},
                                            abortButton: {},
                                        }}
                                        uploadConfig={{
                                            url: "https://www.myawsomeserver.com/upload",
                                            method: "POST",
                                            headers: {
                                                Authorization:
                                                    "bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/",
                                            },
                                            cleanOnUpload: true,
                                        }}
                                        fakeUpload
                                    >
                                        {files.map((file) => (
                                            <FileMosaic
                                                key={file.id}
                                                {...file}
                                                onDelete={removeFile}
                                                info
                                                preview
                                            />
                                        ))}
                                    </Dropzone>
                                </div>
                                <div>
                                    <InputLabel value={"Workshop photo 2"} />
                                    <Dropzone
                                        onChange={updateFiles}
                                        value={cnicFront}
                                        accept={"image/*"}
                                        maxFileSize={10 * 1024 * 1024}
                                        maxFiles={1}
                                        actionButtons={{
                                            position: "bottom",
                                            uploadButton: {},
                                            abortButton: {},
                                        }}
                                        uploadConfig={{
                                            url: "https://www.myawsomeserver.com/upload",
                                            method: "POST",
                                            headers: {
                                                Authorization:
                                                    "bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/",
                                            },
                                            cleanOnUpload: true,
                                        }}
                                        fakeUpload
                                    >
                                        {files.map((file) => (
                                            <FileMosaic
                                                key={file.id}
                                                {...file}
                                                onDelete={removeFile}
                                                info
                                                preview
                                            />
                                        ))}
                                    </Dropzone>
                                </div>
                                <div>
                                    <InputLabel value={"Workshop photo 3"} />
                                    <Dropzone
                                        onChange={updateFiles}
                                        value={cnicFront}
                                        accept={"image/*"}
                                        maxFileSize={10 * 1024 * 1024}
                                        maxFiles={1}
                                        actionButtons={{
                                            position: "bottom",
                                            uploadButton: {},
                                            abortButton: {},
                                        }}
                                        uploadConfig={{
                                            url: "https://www.myawsomeserver.com/upload",
                                            method: "POST",
                                            headers: {
                                                Authorization:
                                                    "bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/",
                                            },
                                            cleanOnUpload: true,
                                        }}
                                        fakeUpload
                                    >
                                        {files.map((file) => (
                                            <FileMosaic
                                                key={file.id}
                                                {...file}
                                                onDelete={removeFile}
                                                info
                                                preview
                                            />
                                        ))}
                                    </Dropzone>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Step4;
