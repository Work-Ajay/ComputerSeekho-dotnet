using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DotNetComputerSekho.Migrations
{
    /// <inheritdoc />
    public partial class add_payment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payment",
                columns: table => new
                {
                    payment_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    payment_transaction_id = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    payment_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    payment_done = table.Column<bool>(type: "bit", nullable: false),
                    batch_fees = table.Column<double>(type: "float", nullable: false),
                    fees_paid = table.Column<double>(type: "float", nullable: false),
                    payment_mode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    student_id = table.Column<int>(type: "int", nullable: false),
                    remaining_fees = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment", x => x.payment_id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payment");
        }
    }
}
