import mongoose from 'mongoose';
import { IGenericErrorMessages } from '../interfaces/error';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessages[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];
  return {
    statusCode: 400,
    message: 'Cast error',
    errorMessages: errors,
  };
};

export default handleCastError;
