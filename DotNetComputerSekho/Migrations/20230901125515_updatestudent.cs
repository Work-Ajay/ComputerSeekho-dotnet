using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetComputerSekho.Migrations
{
    /// <inheritdoc />
    public partial class updatestudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "student_dob",
                table: "Student",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "date");

            migrationBuilder.AddColumn<int>(
                name: "batch_id",
                table: "Student",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "course_id",
                table: "Student",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "batch_id",
                table: "Student");

            migrationBuilder.DropColumn(
                name: "course_id",
                table: "Student");

            migrationBuilder.AlterColumn<DateTime>(
                name: "student_dob",
                table: "Student",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldNullable: true);
        }
    }
}
