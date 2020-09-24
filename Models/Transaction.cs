using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TransactionHistoryMVC.Models
{
    public class Transaction
    {
        [Key]   
        public int Id { get; set; }

        [Required]
        public string BeneficiaryName { get; set; }

        public int Amount { get; set; }

        public DateTime Date { get; set; }

    }
}
