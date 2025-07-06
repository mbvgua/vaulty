import { Request, Response } from "express";
import { logger } from "../../config/winston.config";

export async function validationHelper(
  request: Request,
  response: Response,
  schema: any,
) {
  const { error } = schema.validate(request.body);

  if (error) {
    logger.error({
      message: "User validation error",
      data: error.details[0].message,
    });

    return response.status(422).json({
      code: 422,
      status: "error",
      message: "Validation error occurred: ",
      data: error.details[0].message,
      metadata: {},
    });
  }

  // else return true
  return true;
}
