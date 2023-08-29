using System.Text.Json.Serialization;

namespace LibraryApi.Domain.src.Entities;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Genre
{
  Novel,
  Romance,
  Crime,
  SciFi,
  Fantasy,
  Horror,
  Poems,
}
