import documentSchema from "../document/document.schema";

export const getAllDocuments = async () => {
  try {
    const result = await documentSchema.find().populate("userId folderId");
    return result;
  } catch (error) {
    console.error("Error retrieving documents with aggregation:", error);
    throw new Error("Failed to retrieve documents");
  }
};
export const deleteDocument = async ({ id }: { id: string }) => {
  try {
    const result = await documentSchema.deleteOne({_id: id});
    return result;
  } catch (error) {
    console.error("Error while deleting documents:", error);
    throw new Error("Failed to delete documents");
  }
};
