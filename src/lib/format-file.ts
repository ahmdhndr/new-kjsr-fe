export const formatFile = (files: FileList) => {
  const renamedFiles: File[] = [];

  for (const file of files) {
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const basename = file.name.replace(/\.[^/.]+$/, "");

    const newName = `${timestamp}-${basename}.${extension}`;
    const renamedFile = new File([file], newName, { type: file.type });

    renamedFiles.push(renamedFile);
  }

  const dt = new DataTransfer();

  for (const file of renamedFiles) {
    dt.items.add(file);
  }

  const fileList: FileList = dt.files;
  return fileList;
};
