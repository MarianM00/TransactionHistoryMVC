using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TransactionHistoryMVC.Controllers
{
    public class Youtube : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
