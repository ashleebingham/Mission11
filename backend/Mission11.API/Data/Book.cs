using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mission11.API.Data;

public partial class Book
{
    [Key]
    public int BookId { get; set; }
    [Required]
    public required string Title { get; set; }
    [Required]
    public required string Author { get; set; }
    [Required]
    public required string Publisher { get; set; }
    [Required]
    public required string Isbn { get; set; }
    [Required]
    public required string Classification { get; set; }
    [Required]
    public required string Category { get; set; }
    [Required]
    public required int PageCount { get; set; }
    [Required]
    public required double Price { get; set; }
}
