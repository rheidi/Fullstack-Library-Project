using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreateOnceAgain5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_loans_book_id",
                table: "loans");

            migrationBuilder.DropIndex(
                name: "ix_loans_user_id",
                table: "loans");

            migrationBuilder.CreateIndex(
                name: "ix_loans_book_id",
                table: "loans",
                column: "book_id");

            migrationBuilder.CreateIndex(
                name: "ix_loans_user_id",
                table: "loans",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_loans_book_id",
                table: "loans");

            migrationBuilder.DropIndex(
                name: "ix_loans_user_id",
                table: "loans");

            migrationBuilder.CreateIndex(
                name: "ix_loans_book_id",
                table: "loans",
                column: "book_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_loans_user_id",
                table: "loans",
                column: "user_id",
                unique: true);
        }
    }
}
