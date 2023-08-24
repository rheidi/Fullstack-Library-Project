using System.Security.Claims;
using LibraryApi.Domain.src.Entities;
using Microsoft.AspNetCore.Authorization;

namespace LibraryApi.Infrastructure.src.AuthorizationRequirements;

public class OwnerOnlyRequirement : IAuthorizationRequirement
{
  
}

public class OwnerOnlyRequirementHandler : AuthorizationHandler<OwnerOnlyRequirement, Loan>
{
  protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OwnerOnlyRequirement requirement, Loan resource)
  {
    var authenticatedUser = context.User;
    var userId = authenticatedUser.FindFirst(ClaimTypes.NameIdentifier)!.Value;
    if (resource.User.Id.ToString() == userId)
    {
      context.Succeed(requirement);
    }
    return Task.CompletedTask;
  }
}
