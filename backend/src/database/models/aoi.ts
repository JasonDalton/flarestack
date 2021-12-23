import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('aoi');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AoiSchema = new Schema(
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
      estTimeComplete: {
        type: Number,
      },
      orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order',
      }],
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

  AoiSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  AoiSchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );  

  AoiSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AoiSchema.set('toJSON', {
    getters: true,
  });

  AoiSchema.set('toObject', {
    getters: true,
  });

  return database.model('aoi', AoiSchema);
};
