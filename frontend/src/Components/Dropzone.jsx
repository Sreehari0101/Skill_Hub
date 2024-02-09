import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Input } from "@nextui-org/react";

const Dropzone = () => {
    const [entries, setEntries] = useState([
      // Initial entry with empty title and files
      { chapterTitle: "", files: [] },
    ]);
    const [rejected, setRejected] = useState([]);
  
    const onDrop = useCallback((acceptedFiles, rejectedFiles, entryIndex) => {
        console.log("onDrop - entries before update:", entries);
      
        if (acceptedFiles?.length) {
            setEntries((prevEntries) => {
                const updatedEntries = [...prevEntries];
      
            // If the entryIndex exists, add files to the specified entry
            if (updatedEntries[entryIndex]) {
              acceptedFiles.forEach((file) => {
                file.preview = URL.createObjectURL(file);
              });
      
              updatedEntries[entryIndex].files = acceptedFiles;
            } else {
              // If the entryIndex doesn't exist, create a new entry and add files
              const newEntry = {
                chapterTitle: "",
                files: acceptedFiles.map((file) => ({
                  ...file,
                  preview: URL.createObjectURL(file),
                })),
              };
              updatedEntries.push(newEntry);
            }
      
            console.log("onDrop - entries after update:", updatedEntries);
      
            return updatedEntries;
          });
        }
      
        if (rejectedFiles?.length) {
          setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
        }
      }, [entries]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles, rejectedFiles) => onDrop(acceptedFiles, rejectedFiles, entries.length - 1),
      });

  const removeFile = (name, entryIndex) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      const updatedFiles = updatedEntries[entryIndex].files.filter((file) => file.name !== name);
      updatedEntries[entryIndex].files = updatedFiles;
      console.log(`File ${name} removed from entry ${entryIndex}:`, updatedFiles);
      return updatedEntries;
    });
  };

  const removeAll = () => {
    setEntries([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const addEntry = () => {
    setEntries((prevEntries) => [
      ...prevEntries,
      { chapterTitle: "", files: [] },
    ]);
  };

  const updateEntryTitle = (entryIndex, newTitle) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[entryIndex].chapterTitle = newTitle;
      return updatedEntries;
    });
  };

  const removeEntry = (entryIndex) => {
    setEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries.splice(entryIndex, 1);
      return updatedEntries;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Implement your logic for handling the submit here
    console.log("Submitted:", entries);

    // Reset form state or perform any other necessary actions
    setEntries([{ chapterTitle: "", files: [] }]);
    setRejected([]);
  };

  return (
    <div className="Content-form">
      <div className="p-16 mt-10 border border-neutral-200">
        <form onSubmit={handleSubmit}>
          {entries.map((entry, index) => (
            <div key={index}>
              <div className="wid w-full mb-14">
                <Input
                  type="text"
                  label="Chapter Title"
                  value={entry.chapterTitle}
                  onChange={(e) => updateEntryTitle(index, e.target.value)}
                />
              </div>
              <div {...getRootProps({})}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-4">
                  <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drag & drop files here, or click to select files</p>
                  )}
                </div>
              </div>
              {/* Preview Section */}
              <section className="mt-10">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => removeEntry(index)}
                    className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                  >
                    Remove Entry
                  </button>
                </div>
                {/* Accepted files */}
                <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
                  Accepted
                </h3>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
                  {entry.files.map((file) => (
                    <li
                      key={file.name}
                      className="relative h-32 rounded-md shadow-lg"
                    >
                      <button
                        type="button"
                        className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                        onClick={() => removeFile(file.name, index)}
                      >
                        <XMarkIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                      </button>
                      <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                        {file.name}
                      </p>
                    </li>
                  ))}
                </ul>
                {/* Rejected Files */}
                <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
                  Rejected
                </h3>
                <ul className="mt-6 flex flex-col">
                  {rejected.map(({ file, errors }) => (
                    <li
                      key={file.name}
                      className="flex items-start justify-between"
                    >
                      <div>
                        <p className="mt-2 text-neutral-500 text-sm font-medium">
                          {file.name}
                        </p>
                        <ul className="text-[12px] text-red-400">
                          {errors.map((error) => (
                            <li key={error.code}>{error.message}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        type="button"
                        className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                        onClick={() => removeRejected(file.name)}
                      >
                        remove
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
              <hr className="my-6" />
            </div>
          ))}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={addEntry}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-primary-400 rounded-md px-3 hover:bg-primary-400 hover:text-white transition-colors"
            >
              Add More
            </button>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
            >
              Remove all files
            </button>
            <button
              type="submit"
              className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
            >
              Upload to Cloudinary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dropzone;