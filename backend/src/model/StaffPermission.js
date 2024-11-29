import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const StaffPermissionSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    permissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  }, { timestamps: true });
  
const StaffPermission  = model('StaffPermission', StaffPermissionSchema);

export default StaffPermission