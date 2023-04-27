import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SingleFile from "./SingleFile";

const DragNDrop = () => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    const mappedFiles = acceptedFiles.map((file) => ({ file, errors: [] }));
    setFiles((current) => [...current, ...mappedFiles, ...rejectedFiles]);
    /*     const file = acceptedFiles[0];
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        `http://localhost:8080/api/auth/39a10f36-6518-4cb1-a11d-abc063788792/image/upload`,
        formData,
        {
          headers: {
            Content: "multipart/form-data",
          },
        }
      )
      .then(() => {
        console.log("radi");
      })
      .catch((err) => {
        console.log(err);
      });
 */
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <React.Fragment>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {files.map((fileWrapper) => (
          <SingleFile file={fileWrapper.file} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default DragNDrop;
