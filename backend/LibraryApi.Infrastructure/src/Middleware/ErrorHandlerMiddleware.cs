using LibraryApi.Service.src.Shared;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Infrastructure.src.Middleware;

public class ErrorHandlerMiddleware : IMiddleware
{
  public async Task InvokeAsync(HttpContext context, RequestDelegate next)
  {
    try
    {
      await next(context);
    }
    catch (CustomException e)
    {
      context.Response.StatusCode = e.StatusCode;
      await context.Response.WriteAsJsonAsync(e.ErrorMessage);
    }
    catch (DbUpdateException e)
    {
      context.Response.StatusCode = 500;
      await context.Response.WriteAsJsonAsync(e.InnerException!.Message);
    }
    catch (Exception e)
    {
      context.Response.StatusCode = 500;
      await context.Response.WriteAsJsonAsync("Internal server error");
    }
  }
}
