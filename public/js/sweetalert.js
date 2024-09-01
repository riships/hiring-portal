function confirmDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "custom-delete-btn",
            cancelButton: "custom-cancel-btn"
        },
        buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Proceed with deletion
            fetch(`/jobs/delete/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        swalWithBootstrapButtons.fire(
                            'Deleted!',
                            'Your job has been deleted.',
                            'success'
                        ).then(() => {
                            // Redirect to /jobs after deletion
                            location.href = "/jobs";
                        });
                    } else {
                        swalWithBootstrapButtons.fire(
                            'Error!',
                            'An error occurred while deleting the job.',
                            'error'
                        );
                    }
                });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your job is safe :)',
                'error'
            );
        }
    });
}
