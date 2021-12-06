import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('map');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const MapSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      geojson: {
        type: String,
        required: true,
      },
      preview: [FileSchema],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  MapSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  MapSchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );  

  MapSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  MapSchema.set('toJSON', {
    getters: true,
  });

  MapSchema.set('toObject', {
    getters: true,
  });

  return database.model('map', MapSchema);
};
