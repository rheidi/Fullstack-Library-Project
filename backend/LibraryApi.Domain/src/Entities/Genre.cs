using System.Text.Json.Serialization;

namespace LibraryApi.Domain.src.Entities;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Genre
{
  Novel,
  Romance,
  Crime,
  Scifi,
  Fantasy,
  Horror,
  Poems,
}
