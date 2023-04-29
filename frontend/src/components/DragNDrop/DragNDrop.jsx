import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { XIcon } from "../../resources/icons";
import "./drag-n-drop.scss";

function nameLengthValidator(file) {
  if (file.name.length > 30) {
    return {
      code: "name-too-large",
      message: `Name is larger than 30 characters`,
    };
  }

  return null;
}

const DragNDrop = ({ field, form }) => {
  const [files, setFiles] = useState(
    (form.values.photos &&
      form.values.photos?.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )) ||
      []
  );

  function handleFieldValue(files) {
    form.setFieldValue(field.name, files);
  }

  useEffect(() => {
    handleFieldValue(files);
  }, [files]);

  const deletePhoto = (photoName) => {
    setFiles((current) => current.filter((file) => file.name !== photoName));
  };

  const { getRootProps, getInputProps } = useDropzone({
    validator: nameLengthValidator,
    maxFiles: 10,
    maxSize: 300000 * 1024,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      let mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      mappedFiles = mappedFiles.filter(
        (file) => !files.find((f) => f.name === file.name)
      );
      setFiles((current) => [...current, ...mappedFiles]);
    },
  });

  return (
    <section className="drag-n-drop">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="text">
          <div className="heading heading-purple">Upload Photos</div>
          <div className="heading">or just drag and drop</div>
          <p>(At least 3 photos)</p>
        </div>
      </div>
      <aside className="photos-container">
        {files.map((file) => (
          <div key={file.name}>
            <div className="photo-container" key={file.name}>
              <XIcon
                className="icon"
                onClick={() => {
                  deletePhoto(file.name);
                }}
              />
              <div className="photo">
                <img
                  src={file.preview}
                  alt="file"
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </aside>
    </section>
  );
};

export default DragNDrop;
