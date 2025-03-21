using System.Security;
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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, bool sortAscending = true)
        {

            string? favBookType = Request.Cookies["FavoriteBookType"];
            Console.WriteLine("~~~~~~COOKIE~~~~~~\n" + favBookType);

            HttpContext.Response.Cookies.Append("FavoriteBookType", "Les Mis", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1),
            });

            var booksQuery = sortAscending
                ? _bookContext.Books.OrderBy(b => b.Title)
                : _bookContext.Books.OrderByDescending(b => b.Title);

            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _bookContext.Books.Count();

            return Ok(new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            });
        }

    }
}
