using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetComputerSekho.Migrations
{
    /// <inheritdoc />
    public partial class edit_student : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "enquiry_id",
                table: "Student",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "enquiry_id",
                table: "Student");
        }
    }
}
