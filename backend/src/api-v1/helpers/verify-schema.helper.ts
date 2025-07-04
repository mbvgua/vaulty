import { Request, Response } from "express";

export async function validationHelper(
  request: Request,
  response: Response,
  schema: any,
) {
  const { error } = schema.validate(request.body);

  if (error) {
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
