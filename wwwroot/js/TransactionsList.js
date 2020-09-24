var dataTable;


//functie de luat tabelul( datatables.net )

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/transactions/getall/",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "beneficiaryName", "width": "20%" },
            { "data": "amount", "width": "20%" },
            { "data": "date", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                            <a href="/Transactions/Upsert?id=${data}" class='btn btn-success text-white' style='cursor:pointer; width:80px;'> 
                           <i class='fas fa-edit'></i> Edit
                        </a>
                        &nbsp;
                        <a class='btn btn-danger text-white' 'style='cursor:pointer; width:70px;'
                            onclick=Delete('/Transactions/Delete?id='+${data})><i class='fa fa-trash'></i>
                            Delete
                        </a>
                        </div>`;
                }, "width": "40%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
}

//functie de delete (sweet alert)
function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}