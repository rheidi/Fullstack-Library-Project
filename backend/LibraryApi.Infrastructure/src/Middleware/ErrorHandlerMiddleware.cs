namespace LibraryApi.Infrastructure.src.Middleware;

public class ErrorHandlerMiddleware : IMiddleware
{
  public async Task InvokeAsync(HttpContext context, RequestDelegate next)
  {
    try
    {
      await next(context);
    }
    catch (Exception e)
    {
      context.Response.StatusCode = 400;
      await context.Response.WriteAsJsonAsync("");
    }
  }
}
