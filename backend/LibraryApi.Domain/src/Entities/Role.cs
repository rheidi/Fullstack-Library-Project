using System.Text.Json.Serialization;

namespace LibraryApi.Domain.src.Entities;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Role
{
  Admin,
  Customer,
  Librarian
}
