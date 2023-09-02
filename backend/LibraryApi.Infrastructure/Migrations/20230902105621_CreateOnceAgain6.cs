using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateOnceAgain6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "author_name",
                table: "books");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "author_name",
                table: "books",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
