const monggo = require("mongoose");
const schema = monggo.Schema;

// file schema
const fileSchema = new schema(
  {
    title: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const FileModel = monggo.model("File", fileSchema);

module.exports = FileModel;
