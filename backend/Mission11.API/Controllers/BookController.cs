using System.Security;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreContext _bookContext;
        public BookController(BookstoreContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, bool sortAscending = true, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();

            // Apply filtering by category
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }

            // Apply sorting by title
            query = sortAscending
                ? query.OrderBy(b => b.Title)
                : query.OrderByDescending(b => b.Title);

            // Count the total number of books after filtering and sorting
            var totalNumBooks = query.Count();

            // Get the books for the current page
            var books = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            });
        }


        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                 .Select(b => b.Category)
                 .Distinct()
                 .ToList();

            return Ok(bookTypes);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Isbn = updatedBook.Isbn;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }

        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }
            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();
            return NoContent();
        }
    }
}
