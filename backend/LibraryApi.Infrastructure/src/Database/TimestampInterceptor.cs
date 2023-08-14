using LibraryApi.Domain.src.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace LibraryApi.Infrastructure.src.Database;

public class TimestampInterceptor : SaveChangesInterceptor
{
  public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result, CancellationToken cancellationToken = default)
  {
    var addedEntries = eventData.Context!.ChangeTracker.Entries().Where(e => e.State == EntityState.Added);
    foreach (var trackEntry in addedEntries)
    {
      if (trackEntry.Entity is TimeStamp entity)
      {
        entity.CreatedAt = DateTime.Now;
        entity.LastUpdatedAt = DateTime.Now;
      }
    }

    var updatedEntries = eventData.Context.ChangeTracker.Entries().Where(e => e.State == EntityState.Modified);
    foreach (var trackEntry in updatedEntries)
    {
      if (trackEntry.Entity is BaseEntity entity)
      {
        entity.LastUpdatedAt = DateTime.Now;
      }
    }
    return base.SavingChangesAsync(eventData, result, cancellationToken);
  }
}
