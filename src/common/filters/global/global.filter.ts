import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class CustomValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Extract the raw exception response
    const exceptionResponse: any = exception.getResponse();

    // Log the raw exception response for debugging
    console.log('Raw Exception Response:', exceptionResponse);

    // Ensure the response structure is as expected
    const validationErrors = Array.isArray(exceptionResponse.message)
      ? exceptionResponse.message
      : [];

    const formattedErrors = validationErrors.map((error: any) => {
      console.log('Validation Error:', error);

      // Handle cases where property or constraints might not be defined
      return {
        field: error.property || 'unknown',
        errors: error.constraints
          ? Object.values(error.constraints) // Extract validation messages
          : [], // Return empty array if constraints are not present
      };
    });

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      timestamp: new Date().toISOString(),
      path: request.url,
      validationErrors: formattedErrors,
    });
  }
}
