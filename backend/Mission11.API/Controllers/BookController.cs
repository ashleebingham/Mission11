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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1)
        {

            string? favBookType = Request.Cookies["FavoriteBookType"];
            Console.WriteLine("~~~~~~COOKIE~~~~~~\n" + favBookType);

            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1),
            });

            var books = _bookContext.Books
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
