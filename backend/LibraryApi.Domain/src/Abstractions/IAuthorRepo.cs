using LibraryApi.Domain.src.Entities;

namespace LibraryApi.Domain.src.Abstractions;

public interface IAuthorRepo : IBaseRepo<Author>
{
  Task<Author?> FindAuthorByName(string firstName, string lastName);
}
