using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using TransactionHistoryMVC.Models;

namespace TransactionHistoryMVC.Controllers
{
    public class TransactionsController : Controller
    {
        

        private readonly ApplicationDbContext _db;

        [BindProperty]
        public Transaction Transaction { get; set; }
        public TransactionsController(ApplicationDbContext db)
        { 
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

     

        public IActionResult Upsert(int? id)
        {
            Transaction = new Transaction();
           
            if (id == null)
            {
                //create request
                return View(Transaction);
            }

            //update

            Transaction = _db.Transactions.FirstOrDefault(u => u.Id == id);

            if(Transaction == null)
            {
                return NotFound();
            }

            return View(Transaction);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Upsert()

        {


            if (ModelState.IsValid)
            {
                if (Transaction.Id == 0)
                {
                    //create
                    _db.Transactions.Add(Transaction);

                }
                else
                {
                    _db.Transactions.Update(Transaction);

                }
                _db.SaveChanges();
                return RedirectToAction("Index");
            }

                return View(Transaction);
            
        }
        #region Api Calls
        [HttpGet]

        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = await _db.Transactions.ToListAsync() });
        }

        [HttpDelete]

        public async Task<IActionResult> Delete(int id)
        {
            var bookFromDb = await _db.Transactions.FirstOrDefaultAsync(u => u.Id == id);
            if (bookFromDb == null)
            {
                return Json(new { success = false, message = "Error while Deleting" });
            }
            _db.Transactions.Remove(bookFromDb);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "Delete successful" });


        }

        #endregion

    }
}
